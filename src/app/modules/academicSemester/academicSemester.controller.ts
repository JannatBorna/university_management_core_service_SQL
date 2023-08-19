import { AcademicSemester } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemesterSearchFilterAbleFields } from './academicSemester.contants';
import { AcademicSemesterService } from './academicSemester.service';

// create

// try and catch এর পরিবর্তে catchAsync করা হলো
const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicSemesterService.insertIntoDB(req.body);
  sendResponse<AcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Acedemic Semster Created !!',
    data: result,
  });
});

// get data fetched
const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  //   console.log(req.query);
  const filters = pick(req.query, [
    'searchTerm',
    'code',
    'startMonth',
    'endMonth',
  ]);
  const options = pick(req.query, AcademicSemesterSearchFilterAbleFields);
  //   console.log('filters', filters);
  //   console.log('options', options);
  const result = await AcademicSemesterService.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Acedemic Semster data fetched !!',
    meta: result.meta,
    data: result.data,
  });
});

// id dara single data get
const getDataById = catchAsync(async (req: Request, res: Response) => {
  const result = await AcademicSemesterService.getDataById(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Acedemic Semster data fetched !!',
    data: result,
  });
});

export const AcademicSemesterController = {
  insertIntoDB,
  getAllFromDB,
  getDataById,
};
