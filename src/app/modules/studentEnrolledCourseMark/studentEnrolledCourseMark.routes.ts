import express from 'express';
import { StudentEnrolledCourseMarkConroller } from './studentEnrolledCourseMark.controller';

const router = express.Router();

router.patch(
  '/update-marks',
  StudentEnrolledCourseMarkConroller.updateStudentMarks
);

// router.patch(
// '/update-average-marks',
// StudentEnrolledCourseMarkConroller.updateFinalMarksAverage
// );
router.patch(
  '/update-average-marks',
  StudentEnrolledCourseMarkConroller.updateFinalMarksAverage
);
export const studentEnrolledCourseMarkRoutes = router;
