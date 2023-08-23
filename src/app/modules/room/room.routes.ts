import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { RoomController } from './room.controller';
import { RoomValidation } from './room.validation';

const router = express.Router();

//get all data
router.get('/', RoomController.getAllFromDB);

// single data
router.get('/:id', RoomController.getByIdFromDB);

router.post(
  '/',
  //   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), // jwt token
  validateRequest(RoomValidation.create),
  RoomController.insertIntoDB
);

//update
router.patch('/:id', RoomController.updateOneInDB);

//delete
router.delete('/:id', RoomController.deleteByIdFromDB);

export const roomRoutes = router;
