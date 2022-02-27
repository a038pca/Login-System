export interface Credentials {
  username: string;
  password: string;
}

export interface User extends Credentials {
  askSavePassword: boolean;
}

export interface Field {
  key: string;
  label: string;
  isPassword?: boolean;
}

export interface FieldsValue {
  [key: string]: string;
}
