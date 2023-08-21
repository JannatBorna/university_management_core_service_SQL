import express from 'express';
import { CourseController } from './course.controller';

const router = express.Router();

router.post(
  '/',
  //   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), // jwt token
  CourseController.insertIntoDB
);

export const courseRoutes = router;
