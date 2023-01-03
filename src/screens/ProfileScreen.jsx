import { StyleSheet, Text, View, Button } from 'react-native';
import React from 'react';

import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default ProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>ProfileScreen</Text>
      <Button
        title="Logout"
        onPress={async () => {
          await AsyncStorage.removeItem('myClientID');
          navigation.reset({
            index: 0,
            routes: [{ name: 'Welcome' }],
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
