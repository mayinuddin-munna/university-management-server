import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { CourseSearchableFields } from './course.constant';
import { TCourse } from './course.interface';
import { Course } from './course.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCurse.course'),
    query,
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate('preRequisiteCurse.course');
  return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCurse: preRequisiteCourses, ...courseRemainingData } =
    payload;

  const session = await mongoose.startSession();
  try {
    const updateBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      courseRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    if (!updateBasicCourseInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update');
    }

    // check if there is any pre requisite course to update
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletePreRequisites = preRequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);

      const deletePreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourse: { course: { $in: deletePreRequisites } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!deletePreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update');
      }

      // filter out the new course fields
      const newPreRequisites = preRequisiteCourses?.filter(
        (el) => el.course && !el.isDeleted,
      );

      const newPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCurse: { $each: newPreRequisites } },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!newPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update');
      }

      const result = await Course.findById(id).populate(
        'preRequisiteCurse.course',
      );

      return result;
    }
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update');
  }
};

const assignFacultiesIntoDB = async (courseId: string, faculties: string) => {
  const result = await Course.findByIdAndUpdate(
    courseId,
    // faculties,
    { isDeleted: true },
    { new: true },
  );

  return result;
};

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  assignFacultiesIntoDB,
  updateCourseIntoDB,
  deleteCourseFromDB,
};
