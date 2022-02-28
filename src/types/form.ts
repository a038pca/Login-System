import { TextInputProps } from 'react-native';

export interface Field extends TextInputProps {
  key: string;
  label: string;
  isPassword?: boolean;
  forgetPassword?: boolean;
}

export interface FieldValueMap {
  [key: string]: string;
}
