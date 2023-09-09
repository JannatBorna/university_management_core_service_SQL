/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ExamType,
  PrismaClient,
  StudentEnrollCourseStatus,
} from '@prisma/client';
import {
  DefaultArgs,
  PrismaClientOptions,
} from '@prisma/client/runtime/library';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { StudentEnrolledCourseMarkUtils } from './studentEnrolledCourseMark.utils';

const createStudentEnrolledCourseDefaultMark = async (
  prismaClient: Omit<
    PrismaClient<PrismaClientOptions, never, DefaultArgs>,
    '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
  >,
  payload: {
    studentId: string;
    studentEnrollCourseId: string;
    academicSemesterId: string;
  }
) => {
  const isExitMidtermData =
    await prismaClient.studentEnrolledCourseMark.findFirst({
      where: {
        examType: ExamType.MIDTERM,
        student: {
          id: payload.studentId,
        },
        studentEnrollCourse: {
          id: payload.studentEnrollCourseId,
        },
        academicSemester: {
          id: payload.academicSemesterId,
        },
      },
    });
  if (!isExitMidtermData) {
    await prismaClient.studentEnrolledCourseMark.create({
      data: {
        student: {
          connect: {
            id: payload.studentId,
          },
        },
        studentEnrollCourse: {
          connect: {
            id: payload.studentEnrollCourseId,
          },
        },
        academicSemester: {
          connect: {
            id: payload.academicSemesterId,
          },
        },
        examType: ExamType.MIDTERM,
      },
    });
  }

  const isExitFinalData =
    await prismaClient.studentEnrolledCourseMark.findFirst({
      where: {
        examType: ExamType.MIDTERM,
        student: {
          id: payload.studentId,
        },
        studentEnrollCourse: {
          id: payload.studentEnrollCourseId,
        },
        academicSemester: {
          id: payload.academicSemesterId,
        },
      },
    });

  if (!isExitFinalData) {
    await prismaClient.studentEnrolledCourseMark.create({
      data: {
        student: {
          connect: {
            id: payload.studentId,
          },
        },
        studentEnrollCourse: {
          connect: {
            id: payload.studentEnrollCourseId,
          },
        },
        academicSemester: {
          connect: {
            id: payload.academicSemesterId,
          },
        },
        examType: ExamType.FINAL,
      },
    });
  }
};

//update
const updateStudentMarks = async (payload: any) => {
  // console.log(payload);
  const { studentId, academicSemesterId, courseId, examType, marks } = payload;

  const studentEnrolledCourseMarks =
    await prisma.studentEnrolledCourseMark.findFirst({
      where: {
        student: {
          id: studentId,
        },
        academicSemester: {
          id: academicSemesterId,
        },
        studentEnrollCourse: {
          course: {
            id: courseId,
          },
        },
        examType,
      },
    });

  if (!studentEnrolledCourseMarks) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Student enrolled course mark not found !!'
    );
  }
  const result = StudentEnrolledCourseMarkUtils.getGradeFromMarks(marks);

  const updateStudentMarks = await prisma.studentEnrolledCourseMark.update({
    where: {
      id: studentEnrolledCourseMarks.id,
    },
    data: {
      marks,
      grade: result.grade,
    },
  });
  return updateStudentMarks;
};

// 2ta mark gor kore je final mark ashe (midterm and finaltern mile gor)(student enroll course table thake)
const updateFinalMarksAverage = async (payload: any) => {
  // console.log(payload);
  const { studentId, academicSemesterId, courseId } = payload;
  const studentEnrolledCourseAverage =
    await prisma.studentEnrollCourse.findFirst({
      where: {
        student: {
          id: studentId,
        },
        academicSemester: {
          id: academicSemesterId,
        },
        course: {
          id: courseId,
        },
      },
    });
  if (!studentEnrolledCourseAverage) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Student enrolled course data not found !!'
    );
  }
  // console.log(studentEnrolledCourseAverage);
  const studentEnrolledCourseMarks =
    await prisma.studentEnrolledCourseMark.findMany({
      where: {
        student: {
          id: studentId,
        },
        academicSemester: {
          id: academicSemesterId,
        },
        studentEnrollCourse: {
          course: {
            id: courseId,
          },
        },
      },
    });
  console.log(studentEnrolledCourseMarks);
  if (!studentEnrolledCourseMarks.length) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Student enrolled course mark not found !!'
    );
  }

  const midTremMarks =
    studentEnrolledCourseMarks.find(item => item.examType === ExamType.MIDTERM)
      ?.marks || 0;
  const finalTremMarks =
    studentEnrolledCourseMarks.find(item => item.examType === ExamType.FINAL)
      ?.marks || 0;
  // console.log(midTremMarks, finalTremMarks);

  const totalFinalMarksAverage =
    Math.ceil(midTremMarks * 0.4) + Math.ceil(finalTremMarks * 0.6);
  const result = StudentEnrolledCourseMarkUtils.getGradeFromMarks(
    totalFinalMarksAverage
  );
  // console.log(grade);
  await prisma.studentEnrollCourse.updateMany({
    where: {
      student: {
        id: studentId,
      },
      academicSemester: {
        id: academicSemesterId,
      },
      course: {
        id: courseId,
      },
    },
    data: {
      grade: result.grade,
      point: result.point,
      totalMarks: totalFinalMarksAverage,
      status: StudentEnrollCourseStatus.COMPLETED,
    },
  });

  const grades = await prisma.studentEnrollCourse.findMany({
    where: {
      student: {
        id: studentId,
      },
      status: StudentEnrollCourseStatus.COMPLETED,
    },
    include: {
      course: true,
    },
  });

  const academicResult =
    await StudentEnrolledCourseMarkUtils.calculateCGPAAndGrade(grades);

  const studentAcademicInfo = await prisma.studentAcademicInfo.findFirst({
    where: {
      student: {
        id: studentId,
      },
    },
  });
  if (studentAcademicInfo) {
    await prisma.studentAcademicInfo.update({
      where: {
        id: studentAcademicInfo.id,
      },
      data: {
        totalCompletedCredit: academicResult.totalCompletedCredit,
        cgpa: academicResult.cgpa,
      },
    });
  } else {
    await prisma.studentAcademicInfo.create({
      data: {
        student: {
          connect: {
            id: studentId,
          },
        },
        totalCompletedCredit: academicResult.totalCompletedCredit,
        cgpa: academicResult.cgpa,
      },
    });
  }
  return grades;
};

export const StudentEnrolledCourseMarkService = {
  createStudentEnrolledCourseDefaultMark,
  updateStudentMarks,
  updateFinalMarksAverage,
};
