import { TStudent } from '../student/student.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // if (await Student.isUserExists(studentData.id)) {
  //   throw new Error('User already exist!')
  // }
  const result = await User.create(studentData);
  return result;
};

export const UserServices = {
  createStudentIntoDB,
};
