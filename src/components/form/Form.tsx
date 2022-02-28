import React, { useRef, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  ListRenderItemInfo,
  TextStyle,
} from 'react-native';
import { Field, FieldValueMap } from '~/types/form';
import FormField from './FormField';
import sharedStyles from '~/styles';

interface Props {
  style?: ViewStyle;
  title?: string;
  titleStyle?: TextStyle;
  fields: Field[];
  submitButtonText: string;
  submitButtonStyle?: ViewStyle;
  onSubmit: (fieldsValue: any) => Promise<string>;
}

const Form = (props: Props) => {
  const {
    style,
    title,
    titleStyle,
    fields,
    submitButtonText,
    submitButtonStyle,
    onSubmit,
  } = props;
  const [errorMessage, setErrorMessage] = useState('');
  const fieldValueMapRef = useRef<FieldValueMap>({});

  const submit = () => {
    const fieldValueMap = fieldValueMapRef.current;
    onSubmit(fieldValueMap)
      .then(setErrorMessage)
      .catch(err => console.error(err));
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
      {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
      <FlatList
        data={fields}
        renderItem={renderFormField}
        scrollEnabled={false}
      />
      <Text style={styles.error}>{errorMessage}</Text>
      <Pressable
        style={({ pressed }) => [
          sharedStyles.button,
          pressed ? sharedStyles.activeButton : sharedStyles.inactiveButton,
          submitButtonStyle,
        ]}
        onPress={submit}>
        {({ pressed }) => (
          <Text
            style={[
              sharedStyles.buttonText,
              pressed
                ? sharedStyles.activeButtonText
                : sharedStyles.inactiveButtonText,
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
});

export default Form;
