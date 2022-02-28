import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TextField } from 'rn-material-ui-textfield'; // No ts declaration
import images from '~/assets/images';
import { Field } from '~/types/form';
import { Screens } from '~/types/navigation';

interface Props {
  data: Field;
  onChangeText: (text: string) => void;
}

const FormField = (props: Props) => {
  const navigation = useNavigation();

  const { data, onChangeText } = props;
  const { label, isPassword, forgetPassword, ...textInputProps } = data;
  const [hidePassword, setHidePassword] = useState(isPassword);
  const ref = useRef(undefined);

  const renderRightAccessory = () => (
    <Pressable onPress={() => setHidePassword(!hidePassword)}>
      <FastImage
        source={hidePassword ? images.passwordHide : images.passwordShow}
        style={styles.eyeIcon}
      />
    </Pressable>
  );

  return (
    <>
      <TextField
        ref={ref}
        style={styles.text}
        labelTextStyle={styles.label}
        fontSize={14}
        label={label}
        baseColor={'#000000'}
        tintColor={'#000000'}
        contentInset={{ top: 8, label: 2, input: 8 }}
        autoCapitalize={'none'}
        autoCorrect={false}
        onChangeText={onChangeText}
        secureTextEntry={hidePassword}
        renderRightAccessory={isPassword && renderRightAccessory}
        {...textInputProps}
      />
      {forgetPassword && (
        <Pressable
          style={styles.forgetPassword}
          onPress={() => navigation.navigate(Screens.ResetPassword)}>
          <Text style={styles.forgetPasswordText}>Forget Password</Text>
        </Pressable>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'OpenSans-Regular',
  },
  label: {
    fontFamily: 'OpenSans-Medium',
  },
  eyeIcon: {
    width: 18,
    height: 12,
    marginVertical: 3,
    marginHorizontal: 5,
  },
  forgetPassword: {
    alignSelf: 'flex-end',
  },
  forgetPasswordText: {
    textDecorationLine: 'underline',
  },
});

export default FormField;
