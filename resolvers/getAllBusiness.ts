// deno-lint-ignore-file
// @ts-ignore

import { Request, Response } from "npm:express@4.18.2";
import { BusinessModel } from "../db/schemas/business.ts";
import { Business } from "../types.ts";

// Esta función maneja una solicitud para agregar un nuevo Business.
export const getAllBusiness = async (
  req: Request,
  res: Response<Business[] | { error: unknown }>,
) => {
  try {
    const Business = await BusinessModel.find({}).populate('workersIDs','tasksIDs').exec();
    if (!Business) {
      res.status(404).send({ error: "Business not found" });
      return;
    }
    res.status(200).json(Business).send();
  } catch (error) {
    res.status(500).send(error);
  }
};

export default getAllBusiness;
