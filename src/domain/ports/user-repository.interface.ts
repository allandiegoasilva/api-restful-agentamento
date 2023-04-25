import { IUserDto } from "../dto/user-dto.interface";


export interface IUserRepository {
  create(user: IUserDto): Promise<any>
  read(id: string): Promise<any>
  readByEmail(email: string): Promise<IUserDto>
  readManyById(ids: string[]): Promise<any>
  readAll(): Promise<any>
  update(id: string, user: Partial<IUserDto>): Promise<any>
}