export enum CompletionStatus {
  TODO = "TODO",
  PROCESS = "PROCESS",
  DONE = "DONE",
}

type Todo = {
  id: number;
  text: string;
  completed: CompletionStatus;
  deadline?: Date;
};

export default Todo;

