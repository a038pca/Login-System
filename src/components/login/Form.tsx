import React, { useRef, useState } from 'react';
import { ListRenderItemInfo } from 'react-native';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { Field, FieldValueMap } from '~/types/login';
import FormField from './FormField';

interface Props {
  style?: ViewStyle;
  title?: string;
  fields: Field[];
  submitButtonText: string;
  submitButtonStyle?: ViewStyle;
  onSubmit: (fieldsValue: any) => Promise<string>;
}

const Form = (props: Props) => {
  const {
    style,
    title,
    fields,
    submitButtonText,
    submitButtonStyle,
    onSubmit,
  } = props;
  const [errorMessage, setErrorMessage] = useState('');
  const fieldValueMapRef = useRef<FieldValueMap>({});

  const submit = () => {
    const fieldValueMap = fieldValueMapRef.current;
    onSubmit(fieldValueMap).then(setErrorMessage);
  };

  const renderFormField = ({ item }: ListRenderItemInfo<Field>) => (
    <FormField
      data={item}
      onChangeText={(text: string) => {
        const fieldValueMap = fieldValueMapRef.current;
        fieldValueMap[item.key] = text;
      }}
    />
  );

  return (
    <View style={[styles.container, style]}>
      {title && <Text style={styles.title}>{title}</Text>}
      <FlatList
        data={fields}
        renderItem={renderFormField}
        scrollEnabled={false}
      />
      <Text style={styles.error}>{errorMessage}</Text>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.activeButton : styles.inactiveButton,
          submitButtonStyle,
        ]}
        onPress={submit}>
        {({ pressed }) => (
          <Text
            style={[
              styles.buttonText,
              pressed ? styles.activeButtonText : styles.inactiveButtonText,
            ]}>
            {submitButtonText}
          </Text>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontFamily: 'OpenSans-SemiBold',
    marginBottom: 4,
  },
  error: {
    fontFamily: 'OpenSans-Medium',
    fontSize: 12,
    color: '#FF0000',
  },
  button: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignSelf: 'flex-end',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#000000',
  },
  inactiveButton: {
    backgroundColor: '#000000',
  },
  activeButton: {
    backgroundColor: '#FFFFFF',
  },
  buttonText: {
    fontFamily: 'OpenSans-SemiBold',
  },
  inactiveButtonText: {
    color: '#FFFFFF',
  },
  activeButtonText: {
    color: '#000000',
  },
});

export default Form;
