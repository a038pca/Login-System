import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorageKey } from '~/types/async-storage';
import { User } from '~/types/login';

export const getUsersAsync = async () => {
  let users: User[];
  const serializedUsers = await AsyncStorage.getItem(AsyncStorageKey.Users);
  if (serializedUsers) {
    users = JSON.parse(serializedUsers);
  } else {
    users = [];
  }

  return users;
};
