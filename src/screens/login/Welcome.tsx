import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Screens } from '~/types/navigation';
import sharedStyles from '~/styles';

const Welcome = ({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, Screens.Welcome>) => {
  const { username } = route.params;
  console.log('current route: ', JSON.stringify(navigation));

  return (
    <View style={[sharedStyles.root, styles.root]}>
      <Text style={styles.title}>Welcome! {username}</Text>
      <Pressable
        style={({ pressed }) => [
          sharedStyles.button,
          pressed ? sharedStyles.activeButton : sharedStyles.inactiveButton,
          styles.button,
        ]}
        onPress={() =>
          navigation.reset({ index: 0, routes: [{ name: Screens.Login }] })
        }>
        {({ pressed }) => (
          <Text
            style={[
              sharedStyles.buttonText,
              pressed
                ? sharedStyles.activeButtonText
                : sharedStyles.inactiveButtonText,
            ]}>
            Logout
          </Text>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 36,
    marginBottom: 40,
  },
  button: {
    alignSelf: 'center',
  },
});

export default Welcome;
