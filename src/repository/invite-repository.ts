import { IInviteDto } from "../domain/dto/invite-dto.interface";
import { IInviteRepository } from "../domain/ports/invite-repository.interface";
import { IDatabase } from "../infra/database/database.interface";


export class InviteRepository implements IInviteRepository {

  constructor(private readonly database: IDatabase){}

  async create(scheduling_id: number, invite: IInviteDto): Promise<any> {

    await this.database.execute("DELETE FROM invites WHERE user_id = ? AND scheduling_id = ?", [invite.user_id, invite.scheduling_id]);

    const result = await this.database.execute(`INSERT INTO invites (scheduling_id, user_id, created_by, token) 
                                                     VALUES (?, ?, ?, ?)`, [scheduling_id, invite.user_id, invite.created_by, invite.token]);
    
    return result;
  }
  
  async readByToken(token: string): Promise<any> {
    const result = await this.database.execute("SELECT * FROM invites WHERE token = ?", [token]);
    return result;
  }

  async read(user_id: string): Promise<any> {
    let result = await this.database.execute("SELECT * FROM invites WHERE created_by = ? OR user_id = ?", [user_id]);
    
    if(typeof result != 'undefined' && !Array.isArray(result))
      result = [result];

    return result || [];
  }

  async accept(token: string, accept: number): Promise<any> {
     const result = await this.database.execute("UPDATE invites SET accepted = ? WHERE token = ?", [accept, token]);
    
    return result;
  }
  
  async unaccept(id: number, user_id: string): Promise<any> {
    const result = await this.database.execute("UPDATE invites SET accepted = 0 WHERE scheduling_id = ? AND user_id = ?", [id, user_id]);
    
    return result;
  }

  async remove(id: number, created_by: string): Promise<any>{
    const result = await this.database.execute("DELETE FROM invites WHERE created_by = ? AND id = ?", [created_by, id]);
    
    return result;
  }
}