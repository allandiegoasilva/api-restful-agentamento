import { IUserRepository } from "../../../domain/ports/user-repository.interface";
import SQLiteDB from "../../../infra/database/persistence";
import { UserRepository } from "../../../repository/user-repository";


export abstract class UserAction {
  protected repository : IUserRepository;
  
  constructor(){
    const db = SQLiteDB.getInstance();
    this.repository = new UserRepository(db);
  }
}