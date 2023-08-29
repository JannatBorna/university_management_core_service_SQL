import { WeekDays } from '@prisma/client';

// for loop
export const asyncForEach = async (array: any[], callback: any) => {
  if (!Array.isArray(array)) {
    throw new Error('Expected an array');
  }
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

export const hasTimeConflict = (
  existingSchedules: {
    startTime: string;
    endTime: string;
    dayOfWeek: WeekDays;
  }[],
  newSchedule: {
    startTime: string;
    endTime: string;
    dayOfWeek: WeekDays;
  }
) => {
  for (const schedule of existingSchedules) {
    const existingStart = new Date(`1970-01-01T${schedule.startTime}:00`);
    const existingEnd = new Date(`1970-01-01T${schedule.endTime}:00`);
    const newStart = new Date(`1970-01-01T${newSchedule.startTime}:00`);
    const newEnd = new Date(`1970-01-01T${newSchedule.startTime}:00`);
    if (newStart < existingEnd && newEnd > existingStart) {
      return true;
    }
  }
  return false;
};
