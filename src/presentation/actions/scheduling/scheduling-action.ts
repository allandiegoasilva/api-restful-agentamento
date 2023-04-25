import SQLiteDB from "../../../infra/database/persistence";
import { ISchedulingRepository } from "../../../domain/ports/scheduling-repository.interface";
import { SchedulingRepository } from "../../../repository/scheduling-repository";


export abstract class SchedulingAction {
  protected repository : ISchedulingRepository;
  
  constructor(){
    const db = SQLiteDB.getInstance();
    this.repository = new SchedulingRepository(db);
  }
}