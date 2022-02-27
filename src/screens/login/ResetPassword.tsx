import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import Form from '~/components/login/Form';
import { RootStackParamList, Screens } from '~/types/navigation';
import { getUsersAsync } from '~/utils/async-storage';
import { AsyncStorageKey } from '~/types/async-storage';
import { FieldValueMap } from '~/types/login';
import { encryptData } from '~/utils/aes-crypto';

const passwordRules = [
  { regex: /(?=.*?[A-Z])/, error: 'At lease 1 uppercase letter' },
  { regex: /(?=.*?[a-z])/, error: 'At lease 1 lowercase letter' },
  { regex: /(?=.*?[0-9])/, error: 'At lease 1 number' },
  { regex: /(?=.*?[#?!@$%^&*-])/, error: 'At lease 1 special character' },
  { regex: /.{8,}/, error: 'At lease 8 character' },
];

const ResetPassword = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const [currentUser, setCurrentUser] = useState<string | undefined>(undefined);
  const [showSuccess, setShowSuccess] = useState(false);

  const onVerifyUsername = async (fieldsValue: FieldValueMap) => {
    const users = await getUsersAsync();
    const foundUser = users.find(
      user => user.username === fieldsValue.username,
    );
    if (foundUser) {
      setCurrentUser(foundUser.username);
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
      const foundUser = users.find(user => user.username === currentUser);
      if (foundUser) {
        const encryptedPassword = await encryptData(newPassword);
        foundUser.password = encryptedPassword.cipher;
        foundUser.iv = encryptedPassword.iv;
        AsyncStorage.setItem(AsyncStorageKey.Users, JSON.stringify(users));

        setShowSuccess(true);
      }
      return '';
    } else {
      return errors.join('\n');
    }
  };

  return (
    <>
      <View style={{ flex: 1, paddingVertical: 16, paddingHorizontal: 16 }}>
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
            submitButtonText={'Reset'}
            onSubmit={onVerifyNewPassword}
          />
        )}
      </View>
      <Modal
        style={{ alignItems: 'center' }}
        isVisible={showSuccess}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        backdropOpacity={0.2}>
        <View style={{ width: 250, backgroundColor: '#FFFFFF' }}>
          <Text style={{ textAlign: 'center', padding: 16 }}>
            Reset Password Successful
          </Text>
          <Pressable
            onPress={() => {
              setShowSuccess(false);
              navigation.navigate(Screens.Welcome);
            }}>
            <Text style={{ textAlign: 'center', padding: 16 }}>OK</Text>
          </Pressable>
        </View>
      </Modal>
    </>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({});
