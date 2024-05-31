import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponds';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { AcademicSemesterServices } from './academicSemester.service';

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

const createSemesterSemester = catchAsync(async (req, res) => {
    
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is created successfully',
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createSemesterSemester,
};
