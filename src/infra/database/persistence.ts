
import sqlite3 from 'sqlite3';

import { IDatabase } from "./database.interface";

export default class SQLiteDB implements IDatabase {

  private static instance: SQLiteDB;
  private db: sqlite3.Database;

  private constructor() {
    this.db = new sqlite3.Database('database.sqlite');
  }

  static getInstance(): SQLiteDB {
    if (!SQLiteDB.instance)
      SQLiteDB.instance = new SQLiteDB();
    
    SQLiteDB.initScript();

    return SQLiteDB.instance;
  }

  async execute(query: string, params: any[]): Promise<any>{
    
    return new Promise((resolve, reject) => {
    
      if(query.toLocaleLowerCase().includes("select"))
        this.db.all(query, params, function(err, rows){
          
          if (err)
            reject(err)
          
          if(rows.length == 0)
            resolve(undefined);
            
          if(rows.length == 1)
            resolve(rows[0])

          resolve(rows);
        });

      this.db.run(query, params, function (err) {
        if (err)
          reject(err)
            
        resolve(this);
      });
    });
  }

  static initScript() {
    SQLiteDB.instance.db.serialize(() => {
      SQLiteDB.instance.db.run(`
        CREATE TABLE IF NOT EXISTS users(
          id TEXT PRIMARY KEY,
          name TEXT,
          email TEXT,
          password TEXT, 
          createdAt TEXT
        );`);

      SQLiteDB.instance.db.run(`
        CREATE TABLE IF NOT EXISTS scheduling(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT,
          description TEXT,
          date TEXT,  
          duration TEXT, 
          location TEXT,
          user_id TEXT,
          createdAt TEXT
        );
      `);

      SQLiteDB.instance.db.run(`
        CREATE TABLE IF NOT EXISTS invites(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          scheduling_id INTEGER,
          user_id TEXT, 
          created_by TEXT, 
          token TEXT,
          accepted INTEGER DEFAULT 0,
          createdAt TEXT
        );
      `);
    });
  }
}

