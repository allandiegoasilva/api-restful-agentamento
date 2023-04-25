import { Request, Response } from "express";
import { AuthAction } from "../actions/auth/AuthAction";
import { HttpStatusCode } from "../../enum/HttpStatusCode.enum";

export async function auth(req : Request, res : Response) {
  
  const action = new AuthAction();
  const result = await action.execute(req.body.email, req.body.password);

  res.status(result.success ? HttpStatusCode.OK : HttpStatusCode.NOT_AUTORIZED).json(result);
}