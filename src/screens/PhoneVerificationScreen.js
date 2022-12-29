import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  Button,
  Image,
} from 'react-native';
import React, { useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { useLazyQuery } from '@apollo/client';

import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import firebase from 'firebase/compat/app';

import { firebaseConfig } from '../services/firebase/firebase_config';
import { Colors } from '../constants/color';
import CustomButton from '../components/ui/CustomButton';

import { getDoctorByPhone } from '../services/apis/queries/doctor';
import { doctorActions } from '../store/doctor';

export default PhoneVerificationScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [verId, setVerId] = useState(null);
  const recaptchaVerifier = useRef(null);

  const [phoneIsTrue, setPhoneIsTrue] = useState(true);

  const [getDoctor, { error: getDoctorError }] = useLazyQuery(
    getDoctorByPhone,
    {
      variables: { phone: '+91' + phone },
      onCompleted: (data) => {
        if (data.doctor.length === 0) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'SignUp', params: { phone: phone } }],
          });
        } else {
          dispatch(doctorActions.setDoctor(data.doctor[0]));
          navigation.reset({
            index: 0,
            routes: [{ name: 'Tabs' }],
          });
        }
      },
    }
  );

  const sendVerification = () => {
    // const finalPhone = '+91' + phone;
    // const phoneProvider = new firebase.auth.PhoneAuthProvider();
    // phoneProvider
    //   .verifyPhoneNumber(finalPhone, recaptchaVerifier.current)
    //   .then(setVerId);
    setPhoneIsTrue(false);
  };

  const confirmCode = () => {
    // const credential = firebase.auth.PhoneAuthProvider.credential(verId, code);
    // firebase
    //   .auth()
    //   .signInWithCredential(credential)
    //   .then(() => {
    //     getDoctor();
    //   })
    //   .catch((err) => {
    //     alert(err);
    //   });
    getDoctor();
  };

  if (getDoctorError) return <Text>`Error ${getDoctorError.message}`</Text>;

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <View style={styles.header}>
        <Image
          source={require('../assets/images/phone-auth.jpg')}
          resizeMode="contain"
          style={styles.image}
        />
        <Text style={styles.heading}>OTP Verification</Text>
      </View>

      {phoneIsTrue && (
        <View style={styles.formContainer}>
          <Text style={styles.subHeading}>
            Please enter a valid 10 digit mobile number to get an OTP for
            verifictaion
          </Text>
          <TextInput
            placeholder="Enter number here.."
            placeholderTextColor={Colors.primary500}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            style={styles.phoneInput}
            maxLength={10}
          />
          <CustomButton
            title="Get OTP"
            onPress={sendVerification}
            backgroundColor={Colors.primary500}
            textColor={Colors.white}
          />
        </View>
      )}

      {!phoneIsTrue && (
        <View style={styles.formContainer}>
          <Text style={styles.subHeading}>
            Enter the OTP that was sent to{' '}
            <Text style={styles.highlight}>+91 {phone}</Text>
          </Text>
          <TextInput
            placeholder="Enter OTP here.."
            placeholderTextColor={Colors.primary500}
            onChangeText={setCode}
            keyboardType="phone-pad"
            style={styles.phoneInput}
            maxLength={6}
          />
          <CustomButton
            title="Verify OTP"
            onPress={confirmCode}
            backgroundColor={Colors.primary500}
            textColor={Colors.white}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  image: {
    height: 300,
    width: 300,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary500,
  },
  header: {
    alignItems: 'center',
  },
  formContainer: {
    marginVertical: 16,
    marginHorizontal: 32,
  },
  phoneInput: {
    padding: 8,
    marginVertical: 16,
    borderWidth: 0.5,
    borderColor: Colors.primary500,
    color: Colors.primary500,
    fontWeight: '500',
    borderRadius: 16,
    fontSize: 20,
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 14,
    textAlign: 'center',
    color: Colors.darkGrey,
    fontWeight: '500',
  },
  highlight: {
    color: Colors.primary500,
    fontWeight: 'bold',
  },
});
