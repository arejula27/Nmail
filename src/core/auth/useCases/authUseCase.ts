export interface AuthUseCases {
  getPublicKey(): string | null;
  getPrivateKey(): string | null;
  setPrivateKey(key: string): void;
  setPublicKey(key: string): void;
}

const PRIVATE_KEY = "privKey";
const PUBLIC_KEY = "pubKey";

export class AuthUseCasesImpl implements AuthUseCases {
  static _instance: AuthUseCases;
  constructor() {}

  public static get Execute() {
    // Do you need arguments? Make it a regular static method instead.
    return this._instance || (this._instance = new this());
  }

  getPublicKey = (): string | null => localStorage.getItem(PUBLIC_KEY);

  getPrivateKey = (): string | null => localStorage.getItem(PRIVATE_KEY);

  setPrivateKey(key: string): void {
    localStorage.setItem(PRIVATE_KEY, key);
  }
  setPublicKey(key: string): void {
    localStorage.setItem(PUBLIC_KEY, key);
  }
}
