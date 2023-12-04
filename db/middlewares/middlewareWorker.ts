import { BusinessModel } from "../schemas/business.ts";
import { TaskModel } from "../schemas/task.ts";
import { WorkerModelType } from "../schemas/worker.ts";
import { validatorsWorker } from "../validators/validatorWorker.ts";

export const WorkerPreSave = async function (doc: WorkerModelType) {
  // Validar todos los trabajadores existen
  if (!await validatorsWorker.businessExists(doc.businessID)) {
    throw new Error("One or more workers do not exist");
  }

  // Validar no más de 10 trabajadores
  if (!await validatorsWorker.tasksMax(doc.tasksIDs)) {
    throw new Error("Exceeds the limit of 10 workers");
  }

  // Validar formato correo electronico
  if (!validatorsWorker.validEmail(doc.email)) {
    throw new Error("Email has to be like this: \"name@domain.es\" or \"name123@business.com\"");
  }

  // Validar todas las tareas existen
  if (!await validatorsWorker.tasksExists(doc.tasksIDs)) {
    throw new Error("One or more tasks do not exist");
  }
};

export const WorkerPostSave = async function (doc: WorkerModelType) {
  if (doc.tasksIDs.length) {
    try {
      await TaskModel.updateMany(
        { _id: { $in: doc.tasksIDs } },
        { workerID: doc._id },
      );
    } catch (_e) {
      console.log(_e);
    }
  }
  if (doc.businessID) {
    try {
      await BusinessModel.updateOne(
        { _id: doc.businessID },
        { $push: { workersIDs: doc._id } },
      );
    } catch (_e) {
      console.log(_e);
    }
  }
};

export const WorkerPostDelete = async function (doc: WorkerModelType) {
  if (doc.tasksIDs.length) {
    try {
      await TaskModel.updateMany(
        { _id: { $in: doc.tasksIDs } },
        { workerID: null },
      );
    } catch (_e) {
      console.log(_e);
    }
  }
  if (doc.businessID) {
    try {
      await BusinessModel.updateOne(
        { _id: doc.businessID },
        { $pull: { workersIDs: doc._id } },
      );
    } catch (_e) {
      console.log(_e);
    }
  }
};
