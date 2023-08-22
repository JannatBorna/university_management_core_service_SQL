import { Room } from '@prisma/client';
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
};
