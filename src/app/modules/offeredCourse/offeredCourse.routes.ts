import express from 'express';
import { offeredCourseController } from './OfferedCourse.controller';

const router = express.Router();

router.post(
  '/',
  //   validateRequest(OfferedCourseValidations.create),
  //   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  offeredCourseController.insertIntoDB
);

export const offeredCourseRouters = router;
