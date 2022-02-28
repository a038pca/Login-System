export interface Credentials {
  username: string;
  password: string;
}

export interface User extends Credentials {
  iv: string;
  askSavePassword: boolean;
}

export interface EncryptedData {
  cipher: string;
  iv: string;
}
