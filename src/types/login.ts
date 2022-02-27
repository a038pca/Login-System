export type Credentials = {
  username: string;
  password: string;
};

export interface Field {
  key: string;
  label: string;
  isPassword?: boolean;
}

export interface FieldsValue {
  [key: string]: string;
}
