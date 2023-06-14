import config from '../../../config/index';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createUser = async (user: IUser): Promise<IUser | null> => {
  //auto generated incremental id

  const academicSemester = {
    code: '01',
    year: '2025',
  };

  const id = await generateStudentId(academicSemester);

  user.id = id;
  // default password

  if (!user.password) {
    user.password = config.default_user_pass as string;
  }

  const createUser = await User.create(user);
  if (!createUser) {
    throw new ApiError(400, 'failed to create user');
  }
  return createUser;
};

export const UsersService = {
  createUser,
};
