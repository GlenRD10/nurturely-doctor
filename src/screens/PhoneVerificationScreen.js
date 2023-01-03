import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  Image,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import React, { useState, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useLazyQuery } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import firebase from 'firebase/compat/app';

import { firebaseConfig } from '../services/firebase/firebase_config';
import { Colors } from '../constants/color';
import CustomButton from '../components/ui/CustomButton';

import { getDoctorByPhone } from '../services/apis/queries/doctor';

export default PhoneVerificationScreen = () => {
  const navigation = useNavigation();

  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [verId, setVerId] = useState(null);
  const recaptchaVerifier = useRef(null);

  const [phoneVal, setPhoneVal] = useState(true);
  const [otpVal, setOtpVal] = useState(true);

  const [phoneLoading, setPhoneLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const [phoneIsTrue, setPhoneIsTrue] = useState(true);

  const storeClientID = async (id) => {
    try {
      await AsyncStorage.setItem('myClientID', id);
    } catch (e) {
      console.log(e);
    }
  };

  const [getDoctor, { error: getDoctorError }] = useLazyQuery(
    getDoctorByPhone,
    {
      variables: { phone: '+91' + phone },
      onCompleted: (data) => {
        storeClientID(data.doctor[0].id);
        setOtpLoading(false);
        if (data.doctor.length === 0) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'SignUp', params: { phone: phone } }],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Tabs' }],
          });
        }
      },
    }
  );

  const sendVerification = () => {
    //TODO: set the Phone Loading to true when switching to testing

    if (phone.length < 10) {
      setPhoneVal(false);
      return;
    }
    // const finalPhone = '+91' + phone;
    // const phoneProvider = new firebase.auth.PhoneAuthProvider();
    // phoneProvider
    //   .verifyPhoneNumber(finalPhone, recaptchaVerifier.current)
    //   .then(setVerId);
    setPhoneIsTrue(false);
  };

  const confirmCode = () => {
    if (code.length < 6) {
      setOtpVal(false);
      return;
    }
    setOtpLoading(true);
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
    <View style={styles.rootContainer}>
      <View style={styles.titleBar}>
        <Text style={styles.title}>Hey there!</Text>
        <Text style={styles.subtitle}>
          We respect your privacy and promise to only use your number for
          updates and notifications!
        </Text>
      </View>
      <KeyboardAwareScrollView style={styles.container}>
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
          <Text style={styles.heading}>
            {phoneIsTrue ? 'Phone Verification' : 'OTP Verification'}
          </Text>
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
            {!phoneVal && (
              <Text style={styles.valText}>
                Please enter a valid 10 digit phone number
              </Text>
            )}
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
            {!otpVal && (
              <Text style={styles.valText}>
                Please enter the correct 6 digit OTP
              </Text>
            )}
            {otpLoading ? (
              <ActivityIndicator size="small" color={Colors.primary500} />
            ) : (
              <CustomButton
                title="Verify OTP"
                onPress={confirmCode}
                backgroundColor={Colors.primary500}
                textColor={Colors.white}
              />
            )}
          </View>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.primary500,
    paddingTop: 25,
  },
  titleBar: {
    padding: 16,
  },
  title: {
    color: Colors.white,
    fontSize: 36,
    fontWeight: 'bold',
  },
  subtitle: {
    color: Colors.grey,
    fontSize: 16,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
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
  valText: {
    color: Colors.red,
    textAlign: 'center',
  },
  highlight: {
    color: Colors.primary500,
    fontWeight: 'bold',
  },
});
