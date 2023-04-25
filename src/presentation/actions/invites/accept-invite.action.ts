import { IPayloadResponse } from "../../../domain/dto/payload-response.interface";
import { InviteAction } from "./invite-action";


export class AcceptInviteAction extends InviteAction {

  async execute(token: string) : Promise<IPayloadResponse> {

    const invite = await this.repository.readByToken(token);

    if(!invite)
      return {
        success: false, 
        message: "Convite não encontrado!",
        data: []
      }
    
    if(invite.accepted == 1){
      return {
        success: false, 
        message: "Convite já aceito anteriormente.",
        data: []
      }
    }

    await this.repository.accept(token, 1);

    return {
      success: true,
      message: "Convite aceito com sucesso!",
      data: []
    };
  }
}