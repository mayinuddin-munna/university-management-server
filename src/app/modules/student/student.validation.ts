import { z } from 'zod';

const userNameSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, { message: 'First name cannot be more than 20 characters' })
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      { message: '{VALUE} is not in capitalized format' }
    ),
  middleName: z.string().optional(),
  lastName: z.string().min(1, { message: 'Last name is required' }),
});

const guardianSchema = z.object({
  fatherName: z.string().min(1, { message: 'Father name is required' }),
  fatherOccupation: z.string().min(1, { message: 'Father occupation is required' }),
  fatherContactNo: z.string().min(1, { message: 'Father contact number is required' }),
  motherName: z.string().min(1, { message: 'Mother name is required' }),
  motherOccupation: z.string().min(1, { message: 'Mother occupation is required' }),
  motherContactNo: z.string().min(1, { message: 'Mother contact number is required' }),
});

const localGuardianSchema = z.object({
  name: z.string().trim().min(1, { message: 'Local guardian name is required' }),
  occupation: z.string().min(1, { message: 'Local guardian occupation is required' }),
  contactNo: z.string().min(1, { message: 'Local guardian contact number is required' }),
  address: z.string().min(1, { message: 'Local guardian address is required' }),
});

const studentSchema = z.object({
  id: z.string().min(1, { message: 'ID is required' }).regex(/^[a-zA-Z0-9]+$/, { message: 'ID must be alphanumeric' }),
  name: userNameSchema,
  gender: z.enum(['male', 'female'], { message: '{VALUE} is not valid' }),
  dateOfBirth: z.string().optional(),
  email: z.string().email({ message: 'Invalid email format' }),
  contactNo: z.string().min(1, { message: 'Contact number is required' }),
  emergencyContactNo: z.string().min(1, { message: 'Emergency contact number is required' }),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
  presentAddress: z.string().min(1, { message: 'Present address is required' }),
  permanentAddress: z.string().min(1, { message: 'Permanent address is required' }),
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(['active', 'blocked']).default('active'),
});

export default studentSchema;
