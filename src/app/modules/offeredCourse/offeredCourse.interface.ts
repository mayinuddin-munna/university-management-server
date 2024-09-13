import { Types } from 'mongoose';

export type Days = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

export type TOfferedCourse = {
  semesterRegistration: Types.ObjectId;
  academicSemester: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  faculty: Types.ObjectId;
  course: Types.ObjectId;
  maxCapacity: number;
  section: number;
  days: [Days];
  startTime: string;
  endTime: string;
};
