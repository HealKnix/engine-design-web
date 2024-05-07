import { type Student } from './Student';

export interface StudyGroup {
  id: number;
  name: string;
  students: Student[];
}
