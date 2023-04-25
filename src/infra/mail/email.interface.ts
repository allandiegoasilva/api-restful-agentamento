
export interface IEmail {

  send(email: string, options: {name: string, event_name: string}): Promise<any>;
}