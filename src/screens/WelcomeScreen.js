import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CustomButton from '../components/ui/CustomButton';
import { Colors } from '../constants/color';

export default WelcomeScreen = () => {
  const navigation = useNavigation();

  const buttonHandler = () => {
    navigation.navigate('PhoneAuth');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/nurturely-doctor-logo.png')}
          resizeMode="contain"
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.heading}>Welcome.</Text>
        <Text style={styles.subHeading}>
          To Nurturely Doctor. The single platform to monitor all your Nurturely
          Tot patients.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Lets get Started!"
          onPress={buttonHandler}
          backgroundColor={Colors.primary500}
          textColor={Colors.white}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageContainer: {
    alignItems: 'center',
    margin: 16,
  },
  image: {
    height: 250,
  },
  textContainer: {
    margin: 16,
  },
  heading: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  subHeading: {
    fontSize: 20,
    color: Colors.darkGrey,
  },
  buttonContainer: {
    margin: 16,
  },
});
