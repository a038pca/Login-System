import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
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
        source={hidePassword ? images.passwordHide : images.passwordShow}
        style={styles.eyeIcon}
      />
    </Pressable>
  );

  return (
    <TextField
      style={styles.font}
      labelTextStyle={styles.font}
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
    />
  );
};

const styles = StyleSheet.create({
  font: {
    fontFamily: 'OpenSans-Regular',
  },
  eyeIcon: {
    width: 18,
    height: 12,
  },
});

export default FormField;
