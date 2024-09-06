import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationValidations } from './semesterRegistration.validation';
import { SemesterRegistrationControllers } from './semesterRegistration.controller';

const router = express.Router();

router.post(
  '/create-semester-registration',
  validateRequest(SemesterRegistrationValidations.createSemesterRegistrationValidationSchema),
  SemesterRegistrationControllers.createSemesterRegistration,
);

router.get(
  '/:id',
  SemesterRegistrationControllers.getSingleSemesterRegistration,
);

router.patch('/:id', SemesterRegistrationControllers.updateSemesterRegistration);

router.get('/', SemesterRegistrationControllers.getAllSemesterRegistrations);

export const semesterRegistrationRoutes = router;
