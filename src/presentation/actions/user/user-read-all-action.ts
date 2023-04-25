
import { IPayloadResponse } from "../../../domain/dto/payload-response.interface";
import { UserAction } from "./user-action";


export class ReadAllUserAction extends UserAction {

  async execute() : Promise<IPayloadResponse> {

    let users = await this.repository.readAll();

    users = users.map((user: any) => {
      delete user.password;

      return user;
    });

    return {
      success: true,
      message: null,
      data: users
    }
  }
}