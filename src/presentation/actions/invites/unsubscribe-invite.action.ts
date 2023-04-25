import { IPayloadResponse } from "../../../domain/dto/payload-response.interface";
import { InviteAction } from "./invite-action";


export class UnsubscribeInviteAction extends InviteAction {

  async execute(id: number, user_id: string) : Promise<IPayloadResponse> {

    await this.repository.unaccept(id, user_id);

    return {
      success: true,
      message: "Convite recusado com sucesso!",
      data: []
    };
  }
}