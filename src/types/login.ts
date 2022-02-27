export interface Credentials {
  username: string;
  password: string;
}

export interface User extends Credentials {
  iv: string;
  askSavePassword: boolean;
}

export interface Field {
  key: string;
  label: string;
  isPassword?: boolean;
}

export interface FieldValueMap {
  [key: string]: string;
}
