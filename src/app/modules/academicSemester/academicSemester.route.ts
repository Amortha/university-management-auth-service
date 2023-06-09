import express from 'express';
// import { UsersController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemestervalidation } from './academicSemester.validation';
import { AcademicSemesterController } from './academicSemester.controller';
const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(AcademicSemestervalidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester
);

export const AcademicSemesterRouters = router;