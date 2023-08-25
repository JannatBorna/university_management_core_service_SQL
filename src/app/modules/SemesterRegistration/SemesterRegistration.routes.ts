import express from 'express';
import { SemesterRegistrationController } from './SemesterRegistration.controller';

const router = express.Router();

router.post('/', SemesterRegistrationController.insertIntoDB);

export const semesterRegistrationRoutes = router;
