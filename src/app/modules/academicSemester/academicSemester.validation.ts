import { z } from 'zod';

const createAcademicValidationSchema = z.object({
  body:z.object({
    
  })
});

export const AcademicSemesterValidation = {
  createAcademicValidationSchema,
};
