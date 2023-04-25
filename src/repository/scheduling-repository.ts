import { ISchedulingDto } from "../domain/dto/scheduling-dto.interface";
import { ISchedulingRepository } from "../domain/ports/scheduling-repository.interface";
import { IDatabase } from "../infra/database/database.interface";


export class SchedulingRepository implements ISchedulingRepository {
  constructor(private readonly database: IDatabase) {}

  async create(user_id: string, event: ISchedulingDto): Promise<any> {
  
    const result = await this.database.execute(`INSERT INTO scheduling(title, description, date, duration, location, user_id, createdAt) 
                                                VALUES (?,?,?,?,?,?,?)`, [
                                                  event.title,
                                                  event.description,
                                                  event.date,
                                                  event.duration,
                                                  event.location,
                                                  user_id,
                                                  event.createdAt
                                                ]);

    return result;
  }
  
  async read(user_id: string): Promise<any[]> {
    console.log(user_id);
    const events = await this.database.execute(`SELECT * 
                                                  FROM scheduling 
                                                 WHERE scheduling.user_id  = ?
                                                    OR scheduling.id IN (SELECT invites.scheduling_id  
                                                                           FROM invites WHERE invites.user_id = ?)`, [user_id, user_id]);
   
    let data = Array.isArray(events) ? events : [];

    if(typeof events != 'undefined' && !Array.isArray(events))
      data = [events];

    data = data.map((item : any) => {
      item["invite"] = item.user_id != user_id;

      return item;
    });
    
    return data;
  }

  async readById(user_id : string, id: number): Promise<any> {
    const values = await this.read(user_id);

    // Check if user has access in this id for view.
    const idsAllowed = values.map(value => value.id);

    console.log(idsAllowed);
    
    // @ts-ignore
    if(typeof id != 'undefined' && !idsAllowed.includes(id))
      return {};

    const event = await this.database.execute(`
      SELECT scheduling.*, 
              users.name as created_by
        FROM scheduling, 
              users 
        WHERE scheduling.id = ?
          AND users.id = scheduling.user_id 
    `, [id]);

    if(event)
     event["invite"] = event.user_id != user_id;
    

    return event || {};
  }

  async update(user_id: string, event: ISchedulingDto): Promise<any> {

    const result = await this.database.execute(`UPDATE scheduling 
                                                   SET title = ?, 
                                                       description = ?, 
                                                       date = ?, 
                                                       duration = ?, 
                                                       location = ?
                                                 WHERE id = ? 
                                                   AND user_id = ?`, [
                                                  event.title,
                                                  event.description,
                                                  event.date,
                                                  event.duration,
                                                  event.location,
                                                  event.id,
                                                  user_id
                                                ]);
    return result;
  }

  async delete(user_id: string, id: number): Promise<void> {
    await this.database.execute("DELETE FROM invites WHERE scheduling_id = ? AND created_by = ?", [id, user_id]);
    await this.database.execute("DELETE FROM scheduling WHERE id = ? AND user_id = ?", [id, user_id]);
  }
}