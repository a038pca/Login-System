import React, { useRef, useState } from 'react';
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

  return (
    <View style={[styles.container, style]}>
      {title && <Text>{title}</Text>}
      <FlatList
        data={fields}
        renderItem={({ item }) => (
          <FormField
            data={item}
            onChangeText={(text: string) => {
              const fieldValueMap = fieldValueMapRef.current;
              fieldValueMap[item.key] = text;
            }}
          />
        )}
        scrollEnabled={false}
      />
      <Text style={styles.error}>{errorMessage}</Text>
      <Pressable
        style={[{ alignItems: 'flex-end' }, submitButtonStyle]}
        onPress={submit}>
        <Text>{submitButtonText}</Text>
      </Pressable>
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  error: {
    color: '#FF0000',
  },
});
