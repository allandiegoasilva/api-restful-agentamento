import { IHash } from "./hash.interface";
import jwt, { Secret, SignOptions} from 'jsonwebtoken';

export class JWTHash implements IHash {


  private secret = "RANDOM_STRING_HERE";

  async encode(user: { id: string, name: string, email: string}): Promise<any> {

    const secret : Secret = this.secret;

    const options : SignOptions = {

    }
    const token = jwt.sign(user, secret, options);

    return token;
  }

  async check(token: string): Promise<any> {
    
    const data = await jwt.verify(token, this.secret);

    return data; 
  }
}