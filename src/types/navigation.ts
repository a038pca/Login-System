export enum Screens {
  Login = 'Login',
  ResetPassword = 'Reset Password',
  Welcome = 'Welcome',
}

export type RootStackParamList = {
  [Screens.Login]: undefined;
  [Screens.ResetPassword]: undefined;
  [Screens.Welcome]: undefined;
};
