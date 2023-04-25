import { ISchedulingDto } from "./scheduling-dto.interface";
import { IUserDto } from "./user-dto.interface";

export interface IInviteDto {
  scheduling_id: Number, 
  user_id: string;
  created_by: string;
  token: string;
  accepted?: number;
  createdAt: string;

  user?: IUserDto;
  scheduling?: ISchedulingDto;
}