import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BuildingController } from './building.controller';
import { BuildingValidations } from './building.validation';

const router = express.Router();

// router.post('/', BuildingController.insertIntoDB);
router.get('/', BuildingController.getAllFromDB);

//validation
router.post(
  '/',
  //   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN), // jwt token
  validateRequest(BuildingValidations.create),
  BuildingController.getAllFromDB
);

//update
router.patch('/:id', BuildingController.updateOneInDB);

//delete
router.delete('/:id', BuildingController.deleteByIdFrom);

export const buildingRoutes = router;
