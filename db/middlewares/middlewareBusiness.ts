import { BusinessModelType } from "../schemas/business.ts";
import { TaskModel } from "../schemas/task.ts";
import { WorkerModel } from "../schemas/worker.ts";
import { validatorsBusiness } from "../validators/validatorBusiness.ts";

export const BusinessPreSave = async function (doc: BusinessModelType) {
  // Validar todos los trabajadores existen
  if (!await validatorsBusiness.workersExists(doc.workersIDs)) {
    throw new Error("One or more workers do not exist");
  }

  // Validar no más de 10 trabajadores
  if (!await validatorsBusiness.workersMax(doc.workersIDs)) {
    throw new Error("Exceeds the limit of 10 workers");
  }

  // Validar todas las tareas existen
  if (!await validatorsBusiness.tasksExists(doc.tasksIDs)) {
    throw new Error("One or more tasks do not exist");
  }
};

export const BusinessPostSave = async function (doc: BusinessModelType) {
  if (doc.tasksIDs.length) {
    try {
      await TaskModel.updateMany(
        { _id: { $in: doc.tasksIDs } },
        { BusinesssID: doc._id },
      );
    } catch (_e) {
      console.log(_e);
    }
  }
  if (doc.workersIDs.length) {
    try {
      await WorkerModel.updateMany(
        { _id: { $in: doc.workersIDs } },
        { BusinesssID: doc._id },
      );
    } catch (_e) {
      console.log(_e);
    }
  }
};

export const BusinessPostDelete = async function (doc: BusinessModelType) {
  if (doc.tasksIDs.length) {
    try {
      await TaskModel.updateMany(
        { _id: { $in: doc.tasksIDs } },
        { BusinesssID: null },
      );
    } catch (_e) {
      console.log(_e);
    }
  }
  if (doc.workersIDs.length) {
    try {
      await WorkerModel.updateMany(
        { _id: { $in: doc.workersIDs } },
        { BusinesssID: null },
      );
    } catch (_e) {
      console.log(_e);
    }
  }
};
