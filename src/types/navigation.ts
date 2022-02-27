export enum Screens {
  Login = 'Login',
  ResetPassword = 'ResetPassword',
  Welcome = 'Welcome',
}

export type RootStackParamList = {
  [Screens.Login]: undefined;
  [Screens.ResetPassword]: undefined;
  [Screens.Welcome]: undefined;
};
