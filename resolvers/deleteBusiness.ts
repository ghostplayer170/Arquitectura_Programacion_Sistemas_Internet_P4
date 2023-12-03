// deno-lint-ignore-file
// @ts-ignore

import { Request, Response } from "npm:express@4.18.2";
// Esta función maneja una solicitud para agregar un nuevo Business.
import { BusinessModel } from "../db/schemas/business.ts";

export const deleteBusiness = async (
  req: Request<{ id: string }, {}>,
  res: Response<string | { error: unknown }>,
) => {
  const id = req.params.id;
  const Business = await BusinessModel.findByIdAndDelete(id).exec();
  if (!Business) {
    res.status(404).send({ error: "Business not found" });
    return;
  }
  res.status(200).send("Business deleted");
}

export default deleteBusiness;