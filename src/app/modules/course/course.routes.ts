import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseController } from './course.controller';
import { CourseValidation } from './course.validation';

const router = express.Router();

//all data
router.get('/', CourseController.getAllFromDB);

//single data
router.get('/:id', CourseController.getByIdFromDB);

// create
router.post(
  '/',
  //   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), // jwt token
  validateRequest(CourseValidation.create),
  CourseController.insertIntoDB
);

/// updated
router.patch(
  '/:id',
  validateRequest(CourseValidation.update),
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  CourseController.updateOneInDB
);

//delete
router.delete('/:id', CourseController.deleteFromDB);

// Assign-Faculties
router.post('/:id/assign-faculties', CourseController.assignFaculties);

// remove-Faculties
router.delete('/:id/remove-faculties', CourseController.removeFaculties);

export const courseRoutes = router;
