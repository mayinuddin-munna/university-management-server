import { z } from 'zod';

const createAcademicValidationSchema = z.object({
  name: z.string({
    invalid_type_error: 'Academic faculty must be string',
  }),
});

const updateAcademicValidationSchema = z.object({
  name: z.string({
    invalid_type_error: 'Academic faculty must be string',
  }),
});

export const AcademicFacultyValidation = {
  createAcademicValidationSchema,
  updateAcademicValidationSchema,
};
