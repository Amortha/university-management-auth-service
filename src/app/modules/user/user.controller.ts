import { NextFunction, Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UsersService } from './user.service';

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    const result = await UsersService.createUser(user);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user created Successfully',
      data: result,
    });
    next();
  }
);

export const UsersController = {
  createUser,
};
