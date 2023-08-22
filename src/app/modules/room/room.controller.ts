import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { RoomService } from './room.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room Created sucessfully',
    data: result,
  });
});

// get all data
const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await RoomService.getAllFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room data fetch sucessfully',
    meta: result.meta,
    data: result.data,
  });
});

//delete
const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await RoomService.deleteByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Room delete successfully',
    data: result,
  });
});

export const RoomController = {
  insertIntoDB,
  deleteByIdFromDB,
  getAllFromDB,
};
