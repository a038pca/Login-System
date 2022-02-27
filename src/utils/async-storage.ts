import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorageKey } from '~/types/async-storage';
import { Credentials } from '~/types/login';

export const getUsersAsync = async () => {
  let users: Credentials[];
  const serializedUsers = await AsyncStorage.getItem(AsyncStorageKey.Users);
  if (serializedUsers) {
    users = JSON.parse(serializedUsers);
  } else {
    users = [];
  }

  return users;
};
