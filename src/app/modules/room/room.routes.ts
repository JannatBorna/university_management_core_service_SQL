import express from 'express';
import { RoomController } from './room.controller';

const router = express.Router();

// router.post('/', BuildingController.insertIntoDB);
router.post(
  '/',
  //   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), // jwt token
  RoomController.insertIntoDB
);

export const roomRoutes = router;
