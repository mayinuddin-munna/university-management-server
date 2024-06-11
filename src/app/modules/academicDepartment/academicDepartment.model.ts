import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
  },
);

academicDepartmentSchema.pre('save', async function (next) {
  // const isDepartment = await this.model.findOne({ name: this.name });
  const isDepartment = await AcademicDepartment.findOne({ name: this.name });

  if (isDepartment) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This department is already exits!',
    );
  }

  next();
});

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();

  const isDepartment = await AcademicDepartment.findOne(query);
  if (!isDepartment) {
    throw new AppError(httpStatus.NOT_FOUND, "This department does't exist!");
  }

  next();
});

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
