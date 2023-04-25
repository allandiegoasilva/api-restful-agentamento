import { IPayloadResponse } from "../../../domain/dto/payload-response.interface";
import { ISchedulingDto } from "../../../domain/dto/scheduling-dto.interface";
import { SchedulingAction } from "./scheduling-action";

export default class UpdateScheduler extends SchedulingAction {

  async execute(user_id: string, event: ISchedulingDto) : Promise<IPayloadResponse>{
    
    const result = await this.repository.update(user_id, event);

    const success = result.changes > 0;
    
    return {
      success: success,
      message: success ? "Evento atualizado com sucesso!" : "Não foi possível atualizar este evento.",
      data: result
    }
  }
}