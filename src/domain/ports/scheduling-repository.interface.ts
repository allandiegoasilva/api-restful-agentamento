import { ISchedulingDto } from "../dto/scheduling-dto.interface"

export interface ISchedulingRepository {
  create(user_id: string, event: ISchedulingDto): Promise<any>
  read(user_id: string): Promise<any[]>
  readById(user_id: string, id: number): Promise<any>;
  update(user_id: string, event: ISchedulingDto): Promise<any>
  delete(user_id: string, id: number): Promise<void>
}