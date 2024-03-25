export interface Student {
  id: number;
  name: string;
  group: string;
}

export interface StudentWithCompletedTasks extends Student {
  isTaskCompleted: boolean;
}
