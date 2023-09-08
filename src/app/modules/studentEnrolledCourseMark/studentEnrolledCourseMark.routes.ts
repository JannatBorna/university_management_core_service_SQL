import express from 'express';
import { StudentEnrolledCourseMarkConroller } from './studentEnrolledCourseMark.controller';

const router = express.Router();

router.patch(
  '/update-marks',
  StudentEnrolledCourseMarkConroller.updateStudentMarks
);

router.patch(
  '/update-final-marks-average',
  StudentEnrolledCourseMarkConroller.updateFinalMarksAverage
);

export const studentEnrolledCourseMarkRoutes = router;
