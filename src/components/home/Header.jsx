import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { useSelector } from 'react-redux';

import { Colors } from '../../constants/color';

export default Header = () => {
  const doctor = useSelector((state) => state.doctor);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome Dr. {doctor.name}</Text>
      <Text style={styles.subHeading}>You have 3 Appointments Today</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 40,
    marginHorizontal: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
  },
  subHeading: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.grey,
  },
});
