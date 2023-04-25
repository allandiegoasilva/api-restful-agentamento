import { IPayloadResponse } from "../../../domain/dto/payload-response.interface";
import { IUserDto } from "../../../domain/dto/user-dto.interface";
import { Sha256 } from "../../../infra/hash/sha-250";
import EmailService from "../../../infra/mail/email-service";
import { InviteAction } from "./invite-action";

export class CreateInviteAction extends InviteAction {

  async execute(user_id: string, scheduling_id: number, users: string[]) : Promise<IPayloadResponse>{

    const scheduler = await this.schedulingRepository.readById(user_id, Number(scheduling_id));

    console.log(scheduler);

    if(!Object.keys(scheduler).length)
      return {
        success: false,
        message: "Agendamento não encontrado!",
        data: []
      }

    const validUsers = await this.userRepository.readManyById(users);

    const sendToUsers = validUsers.filter((validUser : any) => validUser.id != user_id);

    if(!sendToUsers.length)
      return {
        success: false,
        message: "Informe usuários válidos para convidar!",
        data: []
      }

    const emailService = new EmailService(); 
    const sha256 = new Sha256();

    sendToUsers.forEach(async (user: IUserDto) => {

      const token = await sha256.encode(user_id + String(Math.random()));

      await this.repository.create(scheduling_id, {
        token: token,
        created_by: user_id,
        user_id: user.id, 
        scheduling_id: scheduling_id,
        createdAt: String(new Date().toDateString())
      });

      await emailService.send(user.email, {
        name: user.name,
        event_name: scheduler.title,
        token: token
      });
    });

    return {
      success: true, 
      message: "Usuários convidados com sucesso!",
      data: []
    }
  }
}