// import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import config from '../../config';

const loginUser = async (payload: TLoginUser) => {
  // checking if the is exists

  const user = await User.isUserExistsByCustomId(payload.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  // // checking if the is already delete
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted');
  }

  // // checking if the is blocked
  const userStatus = user?.status;
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked');
  }

  // console.log(await User.isPasswordMatched(payload?.password, user?.password));

  // checking if the password is correct.
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    // Access granted: Send AccessToke and Granted Token.
    throw new AppError(httpStatus.FORBIDDEN, "Don't matched the password!");
  }

  const jwtPayload = {
    userId: user,
    role: user.role,
  };

  const AccessToke = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });

  return {
    AccessToke,
    needsPasswordChange: user.needsPasswordChange,
  };
};

export const AuthServices = {
  loginUser,
};
