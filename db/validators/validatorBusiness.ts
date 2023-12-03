import mongoose from "npm:mongoose@7.6.3";
import { TaskModel } from "../schemas/task.ts";
import { WorkerModel } from "../schemas/worker.ts";

// Validar que todas las tareas con los IDs dados existen
const tasksExists = async (
  tasksIDs: mongoose.Types.ObjectId[],
): Promise<boolean> => {
  try {
    const tasksCount = await TaskModel.countDocuments({
      _id: { $in: tasksIDs },
    });
    return tasksCount === tasksIDs.length;
  } catch (_e) {
    return false;
  }
};

// Validar que todas las tareas con los IDs dados existen
const workersExists = async (
  WorkersIDs: mongoose.Types.ObjectId[],
): Promise<boolean> => {
  try {
    const WorkersCount = await WorkerModel.countDocuments({
      _id: { $in: WorkersIDs },
    });
    return WorkersCount === WorkersIDs.length;
  } catch (_e) {
    return false;
  }
};

// Validar que el número total no excede 10
const workersMax = async (
  workersIDs: mongoose.Types.ObjectId[],
): Promise<boolean> => {
  try {
    const workersCount = await WorkerModel.countDocuments({
      _id: { $in: workersIDs },
    });
    return workersCount <= 10;
  } catch (_e) {
    return false;
  }
};

export const validatorsBusiness = {
  workersExists,
  tasksExists,
  workersMax,
};
