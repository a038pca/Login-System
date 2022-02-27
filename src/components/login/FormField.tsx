import React, { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TextField } from 'rn-material-ui-textfield';
import images from '~/assets/images';
import { Field } from '~/types/login';

interface Props {
  data: Field;
  onChangeText: (text: string) => void;
}

const FormField = (props: Props) => {
  const { data, onChangeText } = props;
  const { label, isPassword } = data;
  const [hidePassword, setHidePassword] = useState(isPassword);

  const renderRightAccessory = () => (
    <Pressable onPress={() => setHidePassword(!hidePassword)}>
      <FastImage
        source={hidePassword ? images.passwordShow : images.passwordHide}
        style={styles.eyeIcon}
      />
    </Pressable>
  );

  return (
    <TextField
      label={label}
      autoCapitalize={'none'}
      autoCorrect={false}
      onChangeText={onChangeText}
      secureTextEntry={hidePassword}
      renderRightAccessory={isPassword && renderRightAccessory}
    />
  );
};

const styles = StyleSheet.create({
  eyeIcon: {
    width: 18,
    height: 12,
  },
});

export default FormField;
