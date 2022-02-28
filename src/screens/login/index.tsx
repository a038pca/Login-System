import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';
import images from '~/assets/images';
import * as Keychain from 'react-native-keychain';
import { RootStackParamList, Screens } from '~/types/navigation';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Credentials, EncryptedData, User } from '~/types/login';
import { FieldValueMap } from '~/types/form';
import { AsyncStorageKey } from '~/types/async-storage';
import { getUsersAsync } from '~/utils/async-storage';
import { decryptData, encryptData } from '~/utils/aes-crypto';
import sharedStyles from '~/styles';
import Form from '~/components/form/Form';
import { askSavePassword } from '~/utils/login';

const banners = [images.banner1, images.banner2, images.banner3];

const Login = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, Screens.Login>) => {
  const [credentials, setCredentials] = useState<Credentials>({
    username: '',
    password: '',
  });

  // Use async storage to mock the user information in server's database
  // Initialize default users (Assume there are more than 1 users)
  useEffect(() => {
    AsyncStorage.getItem(AsyncStorageKey.Users)
      .then(serializedUsers => {
        if (!serializedUsers) {
          encryptData('P@ssw0rd')
            .then(({ cipher, iv }: EncryptedData) => {
              AsyncStorage.setItem(
                AsyncStorageKey.Users,
                JSON.stringify([
                  {
                    username: 'esdlife',
                    password: cipher,
                    iv: iv,
                    askSavePassword: false,
                  },
                ]),
              );
            })
            .catch((err: Error) => console.error(err));
        }
      })
      .catch(err => console.error(err));
  }, []);

  // Retrieve saved password
  useEffect(() => {
    Keychain.getGenericPassword()
      .then(keychainCredentials => {
        if (keychainCredentials) {
          const { username, password } = keychainCredentials;
          setCredentials({ username, password });
        }
      })
      .catch(err => console.error(err));
  }, []);

  const onLogin = async (fieldValueMap: FieldValueMap) => {
    // If the credentials are from Keychain, setting default value won't trigger onChangeText in FormField
    // fieldValueMap may be null and need to merge to credentials
    const cred = { ...credentials, ...fieldValueMap };

    const users = await getUsersAsync();
    let matchedUser: User | undefined;
    for (const user of users) {
      if (cred.username === user.username) {
        const password = await decryptData({
          cipher: user.password,
          iv: user.iv,
        });

        if (cred.password === password) {
          matchedUser = user;
          break;
        }
      }
    }

    if (matchedUser) {
      askSavePassword(matchedUser, users, navigation);
      return '';
    } else {
      return 'Incorrect username or password';
    }
  };

  return (
    <View style={[sharedStyles.root, { justifyContent: 'center' }]}>
      <Form
        title={'Login'}
        titleStyle={styles.title}
        fields={[
          {
            key: 'username',
            label: 'Username',
            defaultValue: credentials.username,
          },
          {
            key: 'password',
            label: 'Password',
            isPassword: true,
            forgetPassword: true,
            defaultValue: credentials.password,
          },
        ]}
        submitButtonStyle={styles.loginButton}
        submitButtonText={'Login'}
        onSubmit={onLogin}
      />
      <View style={styles.bannerList}>
        <FlatList
          data={banners}
          renderItem={({ item }) => (
            <FastImage source={item} style={styles.banner} />
          )}
          ItemSeparatorComponent={() => <View style={styles.bannerSeparator} />}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 42,
    textAlign: 'center',
    marginBottom: 40,
  },
  loginButton: {
    alignSelf: 'center',
    marginTop: 40,
  },
  bannerList: {
    marginTop: 40,
  },
  banner: {
    width: 132,
    height: 76,
    borderRadius: 8,
  },
  bannerSeparator: {
    width: 8,
  },
});

export default Login;
