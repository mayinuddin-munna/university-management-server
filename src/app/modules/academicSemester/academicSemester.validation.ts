import { z } from 'zod';
import {
  Months,
  AcademicSemesterCode,
  AcademicSemesterName,
} from './academicSemester.constant';

const createAcademicValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesterName] as [string, ...string[]]),
  }),
  year: z.date(),
  code: z.enum([...AcademicSemesterCode] as [string, ...string[]]),
  startMonth: z.enum([...Months] as [string, ...string[]]),
  endMonth: z.enum([...Months] as [string, ...string[]]),
});

export const AcademicSemesterValidations = {
  createAcademicValidationSchema,
};
