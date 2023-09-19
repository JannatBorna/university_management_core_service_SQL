import { RedisClient } from '../../../shared/redis';
import { EVENT_STUDENT_CREATED } from './student.constants';
import { StudentService } from './student.service';

const initStudentEvents = () => {
  RedisClient.subscribe(EVENT_STUDENT_CREATED, async (e: string) => {
    const data = JSON.parse(e);
    // console.log(data);
    await StudentService.createStudentFromEvent(data);
  });

  //   RedisClient.subscribe(EVENT_STUDENT_UPDATED, async (e: string) => {
  // const data = JSON.parse(e);

  // await StudentService.updateStudentFromEvent(data);
  //   });
};

export default initStudentEvents;
