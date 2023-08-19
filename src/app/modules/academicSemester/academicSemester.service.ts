import { AcademicSemester, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { AcademicSemesterSearchAbleFields } from './academicSemester.contants';
import { IAcademicSemesterFilterRequest } from './academicSemester.interface';

// academicSemester create
const insertIntoDB = async (
  academicSemesterData: AcademicSemester
): Promise<AcademicSemester> => {
  const result = await prisma.academicSemester.create({
    data: academicSemesterData,
  });
  return result;
};

// get  data fetched
const getAllFromDB = async (
  filters: IAcademicSemesterFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<AcademicSemester[]>> => {
  // common.ts thake meta and data pabo tai <IGenericResponse> nibo
  const { page, limit, skip } = paginationHelpers.calculatePagination(options); // pagination

  const { searchTerm, ...filterData } = filters;

  console.log(options);

  //searchTerm
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: AcademicSemesterSearchAbleFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.AcademicSemesterWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  // console.log(filters);
  const result = await prisma.academicSemester.findMany({
    where:
      // {
      whereConditions,
    // OR: [
    // {
    // title: {
    // contains: searchTerm,
    // mode: 'insensitive',
    // },
    // },
    // {
    // code: {
    // contains: searchTerm,
    // mode: 'insensitive',
    // },
    // },
    // ],
    // },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createAt: 'desc',
          },
  });

  const total = await prisma.academicSemester.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

// id dara single data get
const getDataById = async (id: string): Promise<AcademicSemester | null> => {
  const result = await prisma.academicSemester.findUnique({
    where: {
      id,
    },
  });
  return result;
};

export const AcademicSemesterService = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
};
