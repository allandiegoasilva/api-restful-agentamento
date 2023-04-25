import { Response } from "express";
import { IUserDto } from "../../domain/dto/user-dto.interface";
import { ISchedulingDto } from "../../domain/dto/scheduling-dto.interface";
import { HttpStatusCode } from "../../enum/HttpStatusCode.enum";
import UpdateSchedulerAction from "../actions/scheduling/update-scheduling.action";
import CreateSchedulerAction from "../actions/scheduling/create-scheduling.action";
import ReadSchedulerAction from "../actions/scheduling/read-scheduling.action";
import DeleteSchedulerAction from "../actions/scheduling/delete-scheduling.action";

export  const create = async (req : any & { user: Partial<IUserDto>}, res : Response) => {
  const user_id = req.user.id;

  const event : Omit<ISchedulingDto, 'id'|'createdAt'> = {
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    duration: req.body.duration,
    location: req.body.location
  }

  const action = new CreateSchedulerAction();

  const result = await action.execute(user_id, event);

  res.status(HttpStatusCode.CREATED).json(result);
}

export const read = async (req : any & { user: Partial<IUserDto>}, res : Response) => {

  const id = req.params.id || undefined;
  const user_id = req.user.id;

  const action = new ReadSchedulerAction();

  const result = await action.execute(user_id, id);

  res.status(result.success ? HttpStatusCode.OK : HttpStatusCode.NOT_FOUND).json(result);
}
export const update = async (req : any & { user: Partial<IUserDto>}, res : Response) => {

  let user_id = req.user.id;
  let event : ISchedulingDto = {
    id: req.body.id,
    title: req.body.title,
    description: req.body.description, 
    location: req.body.location,
    duration: req.body.duration,
    date: req.body.date
  }
  const action = new UpdateSchedulerAction();

  const result = await action.execute(user_id, event);

  res.status(result.success ? HttpStatusCode.OK : HttpStatusCode.NOT_FOUND).json(result);
}

export const remove = async (req : any & { user: Partial<IUserDto>}, res : Response) => {
  const id = req.params.id || undefined;
  const user_id = req.user.id;

  const action = new DeleteSchedulerAction();

  const result = await action.execute(id, user_id);

  res.status(HttpStatusCode.OK).json(result);
}

