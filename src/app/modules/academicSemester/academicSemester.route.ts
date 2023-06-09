import express from 'express';
// import { UsersController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemestervalidation } from './academicSemester.validation';
const router = express.Router();

router.post(
  '/create-user',
  validateRequest(AcademicSemestervalidation.createAcademicSemesterZodSchema)
  //   UsersController.createUser
);

export const usersRouter = router;
