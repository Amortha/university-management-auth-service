import express from 'express';
import { UserValidation } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
const router = express.Router();

router.post(
  '/create-student',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createStudent
);

export const UserRouter = router;
