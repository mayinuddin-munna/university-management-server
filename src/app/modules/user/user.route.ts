export type User = {
  id: string;
  password: string;
  needPasswordChange: string;
  role: 'student' | 'faculty' | 'admin';
  status: 'in-progress' | 'blocked';
  isDeleted: string;
};
