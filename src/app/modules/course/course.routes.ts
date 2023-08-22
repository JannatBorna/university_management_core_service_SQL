import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseController } from './course.controller';
import { CourseValidation } from './course.validation';

const router = express.Router();

router.post(
  '/',
  //   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), // jwt token
  validateRequest(CourseValidation.create),
  CourseController.insertIntoDB
);

//delete
router.delete('/:id', CourseController.deleteFromDB);

export const courseRoutes = router;
