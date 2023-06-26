import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
// import httpStatus from 'http-status';
import config from '../../../config';
import { ILoginUserResponse } from './auth interface';
import { AuthService } from './auth.service';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);
  const { refreshToken, ...others } = result;
  // ‍set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  // delete result.refreshToken // xxx

  sendResponse<ILoginUserResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User lohggedin successfully |',
    data: others,
  });
});

export const AuthController = {
  loginUser,
};

//login --> default password -->change password --> needsPasswordChange --> true| false -->true --> false
