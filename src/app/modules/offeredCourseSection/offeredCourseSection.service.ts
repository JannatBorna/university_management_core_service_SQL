import { OfferedCourseSection } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: any): Promise<OfferedCourseSection> => {
  //offeredCourse jodi kno course create kora na thake tahole offeredCourseSection create hobe na
  const isEsistOfferedCourse = await prisma.offeredCourse.findFirst({
    where: {
      id: data.offeredCourseId,
    },
  });
  console.log(isEsistOfferedCourse);
  if (!isEsistOfferedCourse) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Offered course does not exist !'
    );
  }
  // semesterRegistrationId jehutu OfferedCourse ache tai postmen a semesterRegistrationId na diye ay khene data ay vabe niya create hoye jabe
  data.semesterRegistrationId = isEsistOfferedCourse.semesterRegistrationId;

  const result = await prisma.offeredCourseSection.create({
    data,
  });
  return result;
};

export const OfferedCourseSectionService = {
  insertIntoDB,
};
