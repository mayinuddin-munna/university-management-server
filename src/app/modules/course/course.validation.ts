import { z } from 'zod';

const TPreRequisiteValidationCourseSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

const createCourseValidationSchema = z.object({
  title: z.string(),
  prefix: z.string(),
  code: z.number(),
  credits: z.number(),
  preRequisiteCurse: z.array(TPreRequisiteValidationCourseSchema).optional(),
  isDeleted: z.boolean().optional(),
});

const updateCourseValidationSchema = createCourseValidationSchema.optional();

export const CourseValidation = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
};
