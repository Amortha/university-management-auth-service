import mongoose from 'mongoose';
import config from '../../../config/index';
import { AcademicSemester } from '../academicSemester/academicSemesterModel';
import { IStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import httpStatus from 'http-status';
import apiError from '../../../errors/apiError';
// import { generateFacultyId } from './user.utils';

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // default password

  if (!user.password) {
    user.password = config.default_student_pass as string;
  }

  //set role
  user.role = 'student';
  const academicsemester = await AcademicSemester.findById(
    student.academicSemester
  );
  // generate student id

  let newUserAllData = null;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateStudentId(academicsemester);
    user.id = id;
    student.id = id;

    const newStudent = await Student.create([student], { session });
    if (!newStudent.length) {
      throw new apiError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }
    //set student -->_id into user.student

    user.student = newStudent[0]._id;
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new apiError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  //user --> student --> academicSemester, academicDepartment,acadmicFaculty
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }
  return newUserAllData;
};

export const UserService = {
  createStudent,
};