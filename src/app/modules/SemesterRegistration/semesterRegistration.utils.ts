/* eslint-disable @typescript-eslint/no-explicit-any */
const getAvailableCourses = (
  offeredCourses: any,
  studentCompletedCourses: any,
  StudentCurrentSemesterTakenCourse: any
) => {
  const completedCoursesId = studentCompletedCourses.map(
    (course: any) => course.courseId
  );
  const AvailableCoursesList = offeredCourses
    .filter(
      (offeredCourse: any) =>
        !completedCoursesId.includes(offeredCourse.courseId)
    )
    .filter((course: any) => {
      const preRequisites = course.course.preRequisite;
      if (preRequisites.length === 0) {
        return true;
      } else {
        const preRequisiteIds = preRequisites.map(
          (preRequisite: any) => preRequisite.preRequisiteId
        );
        console.log('pre', preRequisiteIds);

        // return preRequisiteIds.every((id: string) =>
        //   completedCoursesId.includes(id)
        // );
      }
    });
  //   console.log(AvailableCoursesList);
  return null;
};

export const SemesterRegistrationUtils = {
  getAvailableCourses,
};
