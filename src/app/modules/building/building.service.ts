import { Building, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { buildingSearchAbleFields } from './building.constants';
import { IBuildingFilterRequest } from './building.interface';

// Building Data create
const insertIntoDB = async (data: Building): Promise<Building> => {
  const result = await prisma.building.create({
    data,
  });
  return result;
};

// Building Data Filtering
const getAllFromDB = async (
  // filters and option er kaj korar agae akta interface file create horte hobe
  filters: IBuildingFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Building[]>> => {
  // common.ts thake meta and data pabo tai <IGenericResponse> nibo
  const { page, limit, skip } = paginationHelpers.calculatePagination(options); // pagination
  const { searchTerm } = filters;
  //searchTerm
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: buildingSearchAbleFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  const whereConditions: Prisma.BuildingWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  console.log(options);
  const result = await prisma.building.findMany({
    skip,
    take: limit,
    where: whereConditions,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createAt: 'desc',
          },
  });
  const total = await prisma.building.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const BuildingService = {
  insertIntoDB,
  getAllFromDB,
};
