// deno-lint-ignore-file
// @ts-ignore

import { Request, Response } from "npm:express@4.18.2";
import { BusinessModel } from "../db/schemas/business.ts";

export const deleteBusiness = async (
  req: Request<{ id: string }, {}>,
  res: Response<string | { error: unknown }>,
) => {
  try {
    const id = req.params.id;
    const Business = await BusinessModel.findByIdAndDelete(id).exec();
    if (!Business) {
      res.status(404).send({ error: "Business not found" });
      return;
    }
    res.status(200).send("Business deleted");
  } catch (error) {
    res.status(500).send(error);
  }
};

export default deleteBusiness;
