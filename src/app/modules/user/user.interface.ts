// export type TUser = {
//   id: string;
//   password: string;
//   needPasswordChange: boolean;
//   role: 'student' | 'faculty' | 'admin';
//   status: 'in-progress' | 'blocked';
//   isDeleted: boolean;
// };

export type NewUser = {
  password: string;
  role: string;
  id: string;
};

export type TUser = {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};
