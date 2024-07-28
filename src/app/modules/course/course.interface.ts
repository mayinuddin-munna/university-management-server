import { Types } from 'mongoose';

export type TPreRequisiteCourse = {
  course: Types.ObjectId;
  isDeleted: boolean;
};

export type TCourse = {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  isDeleted?: boolean;
  preRequisiteCurse: [TPreRequisiteCourse];
};

export type CourseFaculty = {
  course: Types.ObjectId;
  faculty: [Types.ObjectId];
};
