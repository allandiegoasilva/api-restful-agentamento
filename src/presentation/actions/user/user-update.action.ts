import { IPayloadResponse } from "../../../domain/dto/payload-response.interface";
import { IUserDto } from "../../../domain/dto/user-dto.interface";
import { UserAction } from "./user-action";

export class UpdateUserAction extends UserAction {

  async execute(id: string, data: Omit<IUserDto, 'id'|'createdAt'> & { current_password?: string}) : Promise<IPayloadResponse> {

    const user = await this.repository.read(id);
    const userFound = typeof user != 'undefined';
    
    if(!userFound) 
      return {
      success: typeof user != 'undefined',
      message: userFound ? null : "Usuário não encontrado!",
      data: user
    }

    if(data.password && (data.current_password != user.password)){
      return {
        success: false,
        message: "Informe uma senha válida para atualizar.",
        data: {}
      }
    }

    const userMail = await this.repository.readByEmail(data.email);

    if(userMail && userMail.id != id)
      return {
        success: false,
        message: "Tente outro e-mail, este já está sendo utilizado por outro usuário.",
        data: {}
      }

    const updated = await this.repository.update(id, data);

    return {
      success: true,
      message: "Usuário atualizado com sucesso!",
      data: updated
    }
  }
}