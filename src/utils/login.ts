import { Alert } from 'react-native';
import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorageKey } from '~/types/async-storage';
import { User } from '~/types/login';
import { decryptData } from './aes-crypto';
import { Screens } from '~/types/navigation';

export const askSavePassword = (
  matchedUser: User,
  users: User[],
  navigation: any,
) => {
  const login = () =>
    navigation.navigate(Screens.Welcome, {
      username: matchedUser.username,
    });

  if (!matchedUser.askSavePassword) {
    matchedUser.askSavePassword = true;
    AsyncStorage.setItem(AsyncStorageKey.Users, JSON.stringify(users));

    Alert.alert('Save Password', 'Do you want to save password?', [
      {
        text: 'Cancel',
        style: 'cancel',
        onPress: login,
      },
      {
        text: 'OK',
        onPress: () => {
          decryptData({
            cipher: matchedUser.password,
            iv: matchedUser.iv,
          })
            .then((password: string) =>
              Keychain.setGenericPassword(matchedUser.username, password),
            )
            .then(login);
        },
      },
    ]);
  } else {
    login();
  }
};
