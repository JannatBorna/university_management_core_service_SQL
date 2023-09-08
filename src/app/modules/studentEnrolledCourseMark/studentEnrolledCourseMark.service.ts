/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExamType, PrismaClient } from '@prisma/client';
import {
  DefaultArgs,
  PrismaClientOptions,
} from '@prisma/client/runtime/library';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { StudentEnrolledCourseMarkUtils } from './studentEnrolledCourseMarkUpdate.utils';

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
  console.log(payload);
};

export const StudentEnrolledCourseMarkService = {
  createStudentEnrolledCourseDefaultMark,
  updateStudentMarks,
  updateFinalMarksAverage,
};
