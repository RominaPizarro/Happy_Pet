import { Injectable } from '@angular/core';
import { AES, enc } from "crypto-js";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Security {

    private static secretKey = environment.security.secretKey;

    constructor() {}

    public static encrypt(text: string): string {
      const ciphertext = AES.encrypt(text, this.secretKey).toString();
      return ciphertext;
    }

    public static decrypt(ciphertext: string): string {
      const bytes = AES.decrypt(ciphertext, this.secretKey);
      const originalText = bytes.toString(enc.Utf8);
      return originalText;
    }

    public static secure(secretKey: string): string{
      return this.decrypt(secretKey);
    }
}
