import React, { createContext } from "react";
import { Task } from "../api/models";

export const TaskContext = createContext<{
  setTaskInfo: (
    taskInfo: (Task & { initialTime: number }) | null
  ) => Promise<void>;
  taskInfo: any;
}>({
  setTaskInfo: async () => {},
  taskInfo: null,
});
