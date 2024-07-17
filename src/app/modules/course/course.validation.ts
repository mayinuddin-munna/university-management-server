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

const updatePreRequisiteValidationCourseSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});  

const updateCourseValidationSchema = z.object({
  title: z.string().optional(),
  prefix: z.string().optional(),
  code: z.number().optional(),
  credits: z.number().optional(),
  preRequisiteCurse: z.array(updatePreRequisiteValidationCourseSchema).optional(),
  isDeleted: z.boolean().optional(),
});

export const CourseValidation = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
};
