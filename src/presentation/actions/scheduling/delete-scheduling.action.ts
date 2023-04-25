
import { IPayloadResponse } from "../../../domain/dto/payload-response.interface";
import { SchedulingAction } from "./scheduling-action";

export default class DeleteSchedulerAction extends SchedulingAction {

  async execute(id: number, user_id: string): Promise<IPayloadResponse>{
    await this.repository.delete(user_id, id);

    return {
      success: true, 
      message: "Evento deletado com sucesso!",
      data: []
    }
  }
}