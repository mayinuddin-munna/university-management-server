import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  // Check if the semester reg. is is exists!
  const {
    semesterRegistration,
    academicSemester,
    academicFaculty,
    academicDepartment,
    faculty,
    course,
  } = payload;

  const isSemesterRegistrationExists =
    await SemesterRegistration.findById(semesterRegistration);
  if (!isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester Registration  Not found!',
    );
  }

  const academicSemesters = isSemesterRegistrationExists.academicSemester;

  const isAcademicFacultyExists =
    await SemesterRegistration.findById(academicFaculty);
  if (!isAcademicFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Semester not found!');
  }

  const isAcademicDepartmentExists =
    await AcademicDepartment.findById(academicDepartment);
  if (!isAcademicDepartmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Department not found!');
  }

  const isCourseExists = await AcademicDepartment.findById(course);
  if (!isCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found!');
  }

  const isFacultyExists = await AcademicDepartment.findById(faculty);
  if (!isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found!');
  }

  const result = await OfferedCourse.create({ ...payload, academicSemesters });

  return result;
};

const getAllOfferedCoursesFromDB = async (query: Record<string, unknown>) => {};

const getSingleOfferedCoursesFromDB = async (id: string) => {};

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {};

const deleteOfferedCourseFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id);

  return result;
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCoursesFromDB,
  getSingleOfferedCoursesFromDB,
  updateOfferedCourseIntoDB,
  deleteOfferedCourseFromDB,
};