// deno-lint-ignore-file
// @ts-ignore

import { Request, Response } from "npm:express@4.18.2";
import { Business } from "../types.ts";
import { BusinessModel, BusinessModelType } from "../db/schemas/business.ts";

export const addBusiness = async (
  req: Request<{}, {}, BusinessModelType>,
  res: Response<Business | { error: unknown }>
) => {
  try {
    const { name, workersIDs, tasksIDs } = req.body;
    const Business = new BusinessModel({
      name,
      workersIDs,
      tasksIDs,
    });
    await Business.save();
    
    res.status(200).json(Business).send();
  } catch (error) {
    res.status(500).send(error);
  }
};

export default addBusiness;
