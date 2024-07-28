import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidation } from './course.validation';
import { CourseControllers } from './course.controller';

const router = express.Router();

router.post(
  '/create-course',
  // validateRequest(CourseValidation.createCourseValidationSchema),
  CourseControllers.createCourse,
);

router.patch(
  '/:id',
  validateRequest(CourseValidation.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);
router.delete('/:id', CourseControllers.deleteCourse);

router.get('/:id', CourseControllers.getSingleCourse);

router.put('/:courseId/assign-faculties', CourseControllers.assignFaculties);

router.get('/', CourseControllers.getAllCourses);

export const CourseRoutes = router;
