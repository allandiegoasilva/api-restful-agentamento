import { IPayloadResponse } from "../../../domain/dto/payload-response.interface";
import { IUserDto } from "../../../domain/dto/user-dto.interface";
import { UserAction } from "./user-action";
import { randomUUID } from "crypto";

export class CreateUserAction extends UserAction {

  async execute(user : Omit<IUserDto, 'id'|'createdAt'>) : Promise<IPayloadResponse> {

    const alreadyExist = await this.repository.readByEmail(user.email);

    if(alreadyExist)
      return {
        success: false,
        message: "Tente outro e-mail, este já está sendo utilizado.",
        data: []
      }
    
    let now = new Date();
    let day = now.getDate().toString().padStart(2, '0');
    let month = (now.getMonth() + 1).toString().padStart(2, '0');
    let year = now.getFullYear();
    let hour = now.getHours().toString().padStart(2, '0');
    let minute = now.getMinutes().toString().padStart(2, '0');
    let formattedDate = `${day}/${month}/${year} ${hour}:${minute}`;

    const result = await this.repository.create({
      id: randomUUID(),
      name: user.name.trim(),
      email: user.email.trim(),
      password: user.password.trim(),
      createdAt: formattedDate
    });

    const created = Object.keys(result).includes("lastID");

    return {
      success: created,
      message: '',
      data: result
    }
  }
}