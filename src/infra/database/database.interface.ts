

export interface IDatabase {
  execute(query: string, params?: any[]): Promise<any>;
}