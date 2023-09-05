import { SemesterRegistrationStatus } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { IEnrollCoursePayload } from '../SemesterRegistration/semesterRegistration.interface';

//enrollIntoCourse table StudentSemesterRegistrationCourse
const enrollIntoCourse = async (
  authUserId: string,
  payload: IEnrollCoursePayload
): Promise<{ message: string }> => {
  const student = await prisma.student.findFirst({
    where: {
      studentId: authUserId,
    },
  });
  //   console.log(student);
  const semesterRegistration = await prisma.semesterRegistration.findFirst({
    where: {
      status: SemesterRegistrationStatus.ONGOING,
    },
  });

  const offeredCourse = await prisma.offeredCourse.findFirst({
    where: {
      id: payload.offeredCourseId,
    },
    include: {
      course: true,
    },
  });
  const offeredCourseSection = await prisma.offeredCourseSection.findFirst({
    where: {
      id: payload.offeredCourseSectionId,
    },
  });

  //   console.log(offeredCourseSection);

  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found !!');
  }

  if (!semesterRegistration) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'semester Registration not found !!'
    );
  }
  if (!offeredCourse) {
    throw new ApiError(httpStatus.NOT_FOUND, 'offered Coursen not found !!');
  }
  if (!offeredCourseSection) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'offered Course section not found !!'
    );
  }

  //maximum capacity bashi hole error dibe
  if (
    offeredCourseSection.maxCapacity &&
    offeredCourseSection.currentlyEnrolledStudent &&
    offeredCourseSection.currentlyEnrolledStudent >=
      offeredCourseSection.maxCapacity
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Student Capacity is full!!');
  }

  await prisma.$transaction(async transactionClint => {
    await transactionClint.studentSemesterRegistrationCourse.create({
      data: {
        studentId: student?.id,
        semesterRegistrationId: semesterRegistration?.id,
        offeredCourseId: payload.offeredCourseId,
        offeredCourseSectionId: payload.offeredCourseSectionId,
      },
    });

    //koto jon enroll korse seter count update
    await transactionClint.offeredCourseSection.update({
      where: {
        id: payload.offeredCourseSectionId,
      },
      data: {
        currentlyEnrolledStudent: {
          increment: 1,
        },
      },
    });
    //StudentSemesterRegistration table er totalCreditsTaken
    await transactionClint.studentSemesterRegistration.updateMany({
      where: {
        student: {
          id: student.id,
        },
        semesterRegistration: {
          id: semesterRegistration.id,
        },
      },
      data: {
        //jete update hobe oita thake akn e
        totalCreditsTaken: {
          increment: offeredCourse.course.credits,
        },
      },
    });
  });

  return {
    message: 'Successfully enrolled into course',
  };
};

//withdraw table StudentSemesterRegistrationCourse withdraw korle 1 kore kombe
const withdrawFromCourse = async (
  authUserId: string,
  payload: IEnrollCoursePayload
): Promise<{ message: string }> => {
  const student = await prisma.student.findFirst({
    where: {
      studentId: authUserId,
    },
  });
  //   console.log(student);
  const semesterRegistration = await prisma.semesterRegistration.findFirst({
    where: {
      status: SemesterRegistrationStatus.ONGOING,
    },
  });

  const offeredCourse = await prisma.offeredCourse.findFirst({
    where: {
      id: payload.offeredCourseId,
    },
    include: {
      course: true,
    },
  });

  if (!student) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found !!');
  }

  if (!semesterRegistration) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'semester Registration not found !!'
    );
  }
  if (!offeredCourse) {
    throw new ApiError(httpStatus.NOT_FOUND, 'offered Coursen not found !!');
  }

  await prisma.$transaction(async transactionClint => {
    await transactionClint.studentSemesterRegistrationCourse.delete({
      where: {
        // StudentSemesterRegistrationCourse table এ কেনো id নাই, @@id([semesterRegistrationId, studentId, offeredCourseId])  এই ভাবে নেয়া হয়েছে তাই, এটা এই ভাবে নিতে হবে
        semesterRegistrationId_studentId_offeredCourseId: {
          semesterRegistrationId: semesterRegistration?.id,
          studentId: student?.id,
          offeredCourseId: payload.offeredCourseId,
        },
      },
    });

    //koto jon enroll korse seter count update(withdrow korle 1 kore kombe)
    await transactionClint.offeredCourseSection.update({
      where: {
        id: payload.offeredCourseSectionId,
      },
      data: {
        currentlyEnrolledStudent: {
          decrement: 1,
        },
      },
    });
    //StudentSemesterRegistration table er totalCreditsTaken
    await transactionClint.studentSemesterRegistration.updateMany({
      where: {
        student: {
          id: student.id,
        },
        semesterRegistration: {
          id: semesterRegistration.id,
        },
      },
      data: {
        //jete update hobe oita thake akn e
        totalCreditsTaken: {
          decrement: offeredCourse.course.credits,
        },
      },
    });
  });

  return {
    message: 'Successfully withdraw from course',
  };
};

export const StudentSemesterRegistrationCourseService = {
  enrollIntoCourse,
  withdrawFromCourse,
};
