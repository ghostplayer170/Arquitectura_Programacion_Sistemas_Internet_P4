export type Worker = {
  dni: string;
  name: string;
  email: string;
  business: Omit<Business, "workers" | "tasks"> | null;
  tasks: Array<Omit<Task, "worker" | "business">>;
};

export type Task = {
  id: string;
  name: string;
  state: State;
  worker: Omit<Worker, "business" | "tasks"> | null;
  business: Omit<Task, "workers" | "tasks"> | null;
};

export type Business = {
  id: string;
  name: string;
  workers: Array<Omit<Worker, "business" | "tasks">>;
  tasks: Array<Omit<Task, "business" | "worker">>;
};

export enum State {
  ToDo,
  InProgress,
  InTest,
  Closed,
}
