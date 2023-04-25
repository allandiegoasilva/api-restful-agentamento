import { IPayloadResponse } from "../../../domain/dto/payload-response.interface";
import { IUserRepository } from "../../../domain/ports/user-repository.interface";
import SQLiteDB from "../../../infra/database/persistence";
import { JWTHash } from "../../../infra/hash/jwt-hash";
import { UserRepository } from "../../../repository/user-repository";


export class AuthAction {
  protected repository : IUserRepository;
  
  constructor(){
    const db = SQLiteDB.getInstance();
    this.repository = new UserRepository(db);
  }

  async execute(email : string, password: string) : Promise<IPayloadResponse>{
    const user = await this.repository.readByEmail(email.trim());

    let output = {
      success: false,
      message: "Usuário/Senha inválidos!",
      data: {}
    };

    if(!user) return output;

    if(password != user.password)
      return output;

    output.success = true;
    
    const hashService = new JWTHash();
    const token = await hashService.encode({
      id: user.id, 
      name: user.name,
      email: user.email
    });

    output.data = {
      token,
      user: {
        id: user.id, 
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      }
    }

    return output;
  }
}