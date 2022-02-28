import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, StatusBar, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Form from '~/components/login/Form';
import { RootStackParamList, Screens } from '~/types/navigation';
import { getUsersAsync } from '~/utils/async-storage';
import { AsyncStorageKey } from '~/types/async-storage';
import { FieldValueMap } from '~/types/login';
import { encryptData } from '~/utils/aes-crypto';
import sharedStyles from '~/styles';

const passwordRules = [
  { regex: /(?=.*?[A-Z])/, error: '* At lease 1 uppercase letter' },
  { regex: /(?=.*?[a-z])/, error: '* At lease 1 lowercase letter' },
  { regex: /(?=.*?[0-9])/, error: '* At lease 1 number' },
  { regex: /(?=.*?[#?!@$%^&*-])/, error: '* At lease 1 special character' },
  { regex: /.{8,}/, error: '* At lease 8 character' },
];

const ResetPassword = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const [currentUser, setCurrentUser] = useState<string | undefined>(undefined);

  const onVerifyUsername = async (fieldsValue: FieldValueMap) => {
    const users = await getUsersAsync();
    const matchedUser = users.find(
      user => user.username === fieldsValue.username,
    );
    if (matchedUser) {
      setCurrentUser(matchedUser.username);
      return '';
    } else {
      return 'User is not found';
    }
  };

  const onVerifyNewPassword = async (fieldsValue: FieldValueMap) => {
    const errors = [];
    const { newPassword, confirmPassword } = fieldsValue;

    if (newPassword !== confirmPassword) {
      errors.push('Passwords do not match');
    } else {
      for (const rule of passwordRules) {
        const { regex, error } = rule;
        if (!regex.test(newPassword || '')) {
          errors.push(error);
        }
      }
    }

    if (errors.length === 0) {
      const users = await getUsersAsync();
      const matchedUser = users.find(user => user.username === currentUser);
      if (matchedUser) {
        const encryptedPassword = await encryptData(newPassword);
        matchedUser.password = encryptedPassword.cipher;
        matchedUser.iv = encryptedPassword.iv;
        AsyncStorage.setItem(AsyncStorageKey.Users, JSON.stringify(users));

        Alert.alert('Reset Password', 'Reset password success', [
          {
            text: 'OK',
            onPress: () => navigation.navigate(Screens.Welcome),
          },
        ]);
      }
      return '';
    } else {
      return errors.join('\n');
    }
  };

  return (
    <View style={sharedStyles.root}>
      <StatusBar barStyle="light-content" />
      <Form
        title={'Please enter your username'}
        fields={[
          {
            key: 'username',
            label: 'Username',
          },
        ]}
        submitButtonText={'Continue'}
        onSubmit={onVerifyUsername}
      />

      {currentUser && (
        <Form
          title={'Please enter your new password'}
          style={{ marginTop: 16 }}
          fields={[
            {
              key: 'newPassword',
              label: 'New Password',
              isPassword: true,
            },
            {
              key: 'confirmPassword',
              label: 'Confirm Password',
              isPassword: true,
            },
          ]}
          submitButtonText={'Reset Password'}
          onSubmit={onVerifyNewPassword}
        />
      )}
    </View>
  );
};

export default ResetPassword;
