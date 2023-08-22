import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { buildingFilterableFields } from './building.constants';
import { BuildingService } from './building.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await BuildingService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building Created sucessfully',
    data: result,
  });
});
// Building Data Filtering
const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  // filter and option er kaj 1st controller a korbo tarpor service a korbo
  console.log(req.query);
  const filters = pick(req.query, buildingFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await BuildingService.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building data fatch sucessfully',
    meta: result.meta,
    data: result.data,
  });
});

//delete
const deleteByIdFrom = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BuildingService.deleteByIdFrom(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Building delete successfully',
    data: result,
  });
});

export const BuildingController = {
  insertIntoDB,
  getAllFromDB,
  deleteByIdFrom,
};
