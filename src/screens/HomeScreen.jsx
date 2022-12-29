import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';

export default HomeScreen = () => {
  const doctor = useSelector((state) => state.doctor);

  return (
    <View>
      <Text>{doctor.name}</Text>
      <Text>{doctor.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
