import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Offered Course Section title is required',
    }),
    maxCapacity: z.number({
      required_error: 'Offered Course Section maxCapacity is required',
    }),

    currentlyEnrolledStudent: z.number({
      required_error:
        'Offered Course Section currentlyEnrolledStudent is required',
    }),
    offeredCourseId: z.string({
      required_error: 'Offered Course Section offeredCourseId is required',
    }),
    semesterRegistrationId: z.string({
      required_error:
        'Offered Course Section semesterRegistrationId is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    title: z.string().optional(),
    maxCapacity: z.number().optional(),
    currentlyEnrolledStudent: z.number().optional(),
    offeredCourseId: z.string().optional(),
    semesterRegistrationId: z.string().optional(),
  }),
});

export const OfferedCourseSectionValidation = {
  create,
  update,
};
