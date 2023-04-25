
export interface IHash {
  encode(value: unknown): Promise<any>;
  check?(value: unknown): Promise<any>; 
}