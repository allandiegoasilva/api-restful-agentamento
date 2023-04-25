import { IPayloadResponse } from "../../../domain/dto/payload-response.interface";
import { SchedulingAction } from "./scheduling-action";

export default class ReadSchedulerAction extends SchedulingAction {

  async execute(user_id: string, id = undefined) : Promise<IPayloadResponse> {
    
    if(id){
      const result = await this.repository.readById(user_id, Number(id));
      const success =  Object.keys(result).includes("created_by");

      return {
        success: success,
        message: success ? null : "O agentamento não existe ou você não está associado a ele.",
        data: result,
      }
    }

    const result = await this.repository.read(user_id);

    return {
        success: true,
        data: result,
      }
  }
}