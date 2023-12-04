import { BusinessModel } from "../schemas/business.ts";
import { TaskModelType } from "../schemas/task.ts";
import { WorkerModel } from "../schemas/worker.ts";
import { validatorsTask } from "../validators/validatorTask.ts";

export const TaskPreSave = async function (doc: TaskModelType) {
  // Validar que el trabajador existe
  if (!await validatorsTask.workerExists(doc.workerID)) {
    throw new Error("One or more workers do not exist");
  }

  // Validar que la empresa existe
  if (!await validatorsTask.businessExists(doc.businessID)) {
    throw new Error("One or more tasks do not exist");
  }
};

export const TaskPostSave = async function (doc: TaskModelType) {
  if (doc.workerID) {
    try {
      await WorkerModel.updateOne(
        { _id: doc.workerID },
        { $push: { tasksIDs: doc._id } },
      );
    } catch (_e) {
      console.log(_e);
    }
  }
  if (doc.businessID) {
    try {
      await BusinessModel.updateOne(
        { _id: doc.businessID },
        { $push: { tasksIDs: doc._id } },
      );
    } catch (_e) {
      console.log(_e);
    }
  }
};

export const TaskPostDelete = async function (doc: TaskModelType) {
  if (doc.workerID) {
    try {
      await WorkerModel.updateOne(
        { _id: doc.workerID },
        { $pull: { tasksIDs: doc._id } },
      );
    } catch (_e) {
      console.log(_e);
    }
  }
  if (doc.businessID) {
    try {
      await BusinessModel.updateOne(
        { _id: doc.businessID },
        { $pull: { tasksIDs: doc._id } },
      );
    } catch (_e) {
      console.log(_e);
    }
  }
};
