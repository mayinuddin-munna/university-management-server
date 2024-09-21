import { TLoginUser } from './auth.interface';

const loginUser = async (payload: TLoginUser) => {
  //   const result = {};
  console.log(payload);

  //   return result;
};

export const AuthServices = {
  loginUser,
};
