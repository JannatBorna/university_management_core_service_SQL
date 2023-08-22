import { Room } from '@prisma/client';
import { IGenericResponse } from '../../../interfaces/common';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: Room): Promise<Room> => {
  const result = await prisma.room.create({
    data,
    include: {
      building: true,
    },
  });
  return result;
};

// get all data
const getAllFromDB = async (): Promise<IGenericResponse<Room[]>> => {
  const result = await prisma.room.findMany();
  const total = await prisma.room.count();
  return {
    meta: {
      total,
      page: 1,
      limit: 10,
    },
    data: result,
  };
};

// delete
const deleteByIdFromDB = async (id: string): Promise<Room> => {
  const result = await prisma.room.delete({
    where: {
      id,
    },
  });
  return result;
};

export const RoomService = {
  insertIntoDB,
  deleteByIdFromDB,
  getAllFromDB,
};
