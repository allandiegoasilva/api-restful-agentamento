import { Response } from "express";
import { CreateInviteAction } from "../actions/invites/create-invite.action";
import { IUserDto } from "../../domain/dto/user-dto.interface";
import { AcceptInviteAction } from "../actions/invites/accept-invite.action";
import { HttpStatusCode } from "../../enum/HttpStatusCode.enum";
import { UnsubscribeInviteAction } from "../actions/invites/unsubscribe-invite.action";
import RemoveInviteAction from "../actions/invites/remove-invite.action";
import ReadInviteAction from "../actions/invites/read-invite.action";


export async function create(req : any & { user: Partial<IUserDto>}, res : Response)  {
  const scheduling_id = req.body.scheduling_id;
  const user_ids = req.body.users; 

  const action = new CreateInviteAction();
  
  const result = await action.execute(req.user.id, scheduling_id, user_ids); 

  res.status(200).json(result);
}

export async function accept(req : any, res : Response)  {
  
  const token = req.query?.token;

  if(!token) 
    return res.status(HttpStatusCode.NOT_FOUND).json({ message: "Informe um token para validação."});

  const action = new AcceptInviteAction();
  const result = await action.execute(req.query.token);

  return res.status(result.success ? HttpStatusCode.OK : HttpStatusCode.NOT_FOUND).json(result);
}

export async function unaccept(req : any & { user: Partial<IUserDto>}, res : Response)  {

  const user_id = req.user.id;

  const id = req.params.id;
  const action = new UnsubscribeInviteAction();
  const result = await action.execute(id, user_id);

  res.status(200).json(result);
}

export async function remove(req : any & { user: Partial<IUserDto>}, res : Response)  {
  const action = new RemoveInviteAction();
  
  const user_id = req.user.id;
  const id = req.params.id;

  const result = await action.execute(id, user_id);

  res.status(200).json(result);
}

export async function read(req : any & { user: Partial<IUserDto>}, res : Response){
 const user_id = req.user.id;

 const action = new ReadInviteAction();
 const result = await action.execute(user_id);

 res.status(HttpStatusCode.OK).json(result);
} 