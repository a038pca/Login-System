import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Screens } from '~/types/navigation';

const Welcome = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{ fontSize: 36 }}>Welcome!</Text>
      <Pressable onPress={() => navigation.navigate(Screens.Login)}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({});
