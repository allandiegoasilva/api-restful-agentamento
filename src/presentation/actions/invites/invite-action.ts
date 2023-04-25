import { IInviteRepository } from "../../../domain/ports/invite-repository.interface";
import { ISchedulingRepository } from "../../../domain/ports/scheduling-repository.interface";
import { IUserRepository } from "../../../domain/ports/user-repository.interface";
import SQLiteDB from "../../../infra/database/persistence";
import { InviteRepository } from "../../../repository/invite-repository";
import { SchedulingRepository } from "../../../repository/scheduling-repository";
import { UserRepository } from "../../../repository/user-repository";

export abstract class InviteAction {

  protected repository: IInviteRepository;
  protected schedulingRepository: ISchedulingRepository;
  protected userRepository: IUserRepository; 

  constructor(){
    const db = SQLiteDB.getInstance();

    this.repository = new InviteRepository(db);
    this.schedulingRepository = new SchedulingRepository(db);
    this.userRepository = new UserRepository(db);
  }
}