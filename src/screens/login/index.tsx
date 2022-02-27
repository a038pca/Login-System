import React, { memo, useEffect, useRef, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextField } from 'rn-material-ui-textfield';
import FastImage from 'react-native-fast-image';
import images from '~/assets/images';
import isEqual from 'react-fast-compare';
import * as Keychain from 'react-native-keychain';
import { RootStackParamList, Screens } from '~/types/navigation';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Credentials } from '~/types/login';
import { AsyncStorageKey } from '~/types/async-storage';
import { getUsersAsync } from '~/utils/async-storage';

const Login = ({ navigation }: NativeStackScreenProps<RootStackParamList>) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [showError, setShowError] = useState(false);
  const credentialRef = useRef<Credentials>({ username: '', password: '' });

  // Use async storage to mock the user information in server's database
  // Initialize default users (Assume there are more than 1 users)
  useEffect(() => {
    AsyncStorage.getItem(AsyncStorageKey.Users)
      .then(serializedUsers => {
        if (!serializedUsers) {
          AsyncStorage.setItem(
            AsyncStorageKey.Users,
            JSON.stringify([{ username: 'esdlife', password: 'P@ssw0rd' }]),
          );
        }
      })
      .catch(err => console.error(err));
  }, []);

  const getFieldValue = (value: string, fieldName: keyof Credentials) => {
    const credential = credentialRef.current;
    credential[fieldName] = value;
  };

  const onLogin = async () => {
    try {
      const credential = credentialRef.current;
      const users = await getUsersAsync();

      if (users.some((user: Credentials) => isEqual(user, credential))) {
        setShowError(false);
        await Keychain.setGenericPassword(
          credential.username,
          credential.password,
        );
        navigation.navigate(Screens.Welcome);
      } else {
        setShowError(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 10 }}>
      <Text style={{ marginLeft: 10, fontSize: 28 }}>Login</Text>
      <View
        style={{
          marginTop: 16,
          paddingVertical: 10,
          paddingHorizontal: 16,
          backgroundColor: '#FFFFFF',
          borderRadius: 12,
        }}>
        <TextField
          label="Username"
          autoCapitalize={'none'}
          autoCorrect={false}
          textContentType={'username'}
          onChangeText={(text: string) => getFieldValue(text, 'username')}
        />
        <TextField
          label="Password"
          secureTextEntry={hidePassword}
          textContentType={'password'}
          onChangeText={(text: string) => getFieldValue(text, 'password')}
          renderRightAccessory={() => (
            <Pressable onPress={() => setHidePassword(!hidePassword)}>
              <FastImage
                source={
                  hidePassword ? images.passwordShow : images.passwordHide
                }
                style={{
                  width: 18,
                  height: 12,
                }}
              />
            </Pressable>
          )}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{ color: 'red' }}>
            {showError && 'Incorrect username or password'}
          </Text>
          <Pressable onPress={() => navigation.navigate(Screens.ResetPassword)}>
            <Text style={{ textDecorationLine: 'underline' }}>
              Forget Password
            </Text>
          </Pressable>
        </View>
      </View>
      <Pressable
        style={{
          paddingVertical: 10,
          paddingHorizontal: 10,
          alignItems: 'center',
        }}
        onPress={onLogin}>
        <Text style={{ fontSize: 18 }}>Login</Text>
      </Pressable>
      <View>
        <FlatList
          data={[images.banner1, images.banner2, images.banner3]}
          renderItem={({ item }) => (
            <FastImage
              source={item}
              style={{ width: 132, height: 76, borderRadius: 8 }}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default memo(Login);

const styles = StyleSheet.create({});
