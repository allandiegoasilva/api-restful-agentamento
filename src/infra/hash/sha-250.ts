import { IHash } from "./hash.interface";
import { createHash } from 'crypto';

export class Sha256 implements IHash {
  async encode(value: string): Promise<any> {
    const hash = createHash('sha256');

    hash.update(value);

    return hash.digest('hex');
  }
}