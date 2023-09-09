import { WeekDays } from '@prisma/client';

export type IOfferedCourseSectionFilterRequest = {
  searchTerm?: string | undefined;
  offeredCourseId?: string | undefined;
};

export type IOfferedCourseSectionCreate = {
  title: string;
  maxCapacity: number;
  offeredCourseId: string;
  classSchedules: IClassSchedules[];
};

export type IClassSchedules = {
  startTime: string;
  endTime: string;
  dayOfWeek: WeekDays;
  roomId: string;
  facultyId: string;
};

// {
// "title": "A",
// "maxCapacity": 36,
// "offeredCourseId": "20d9549a-716b-4f42-8769-985ef0caa35d",
// "classSchedules": [
// {
// "startTime": "06:00",
// "endTime": "07:00",
// "dayOfWeek": "MONDAY",
// "roomId": "9069eb9e-e35a-4eeb-81f6-bdbf99784c8c",
// "facultyId": "3d560d51-dbaa-4f78-bb9b-e7c0907c8212"
// },
// {
// "startTime": "07:30",
// "endTime": "08:30",
// "dayOfWeek": "SUNDAY",
// "roomId": "9069eb9e-e35a-4eeb-81f6-bdbf99784c8c",
// "facultyId": "3d560d51-dbaa-4f78-bb9b-e7c0907c8212"
// }
// ]
// }
