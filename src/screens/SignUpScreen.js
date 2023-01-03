import React, { useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';

import { Colors } from '../constants/color';
import CustomTextInput from '../components/signup/CustomTextInput';
import CustomButton from '../components/ui/CustomButton';
import { addDoctor } from '../services/apis/mutations/doctor';

export default SignUpScreen = ({ route }) => {
  const [doctorName, setDoctorName] = useState('');
  const [doctorPhone, setDoctorPhone] = useState(route.params.phone);
  const [doctorEmail, setDoctorEmail] = useState('');
  const [clinicName, setClinicName] = useState('');
  const [clinicAddress, setClinicAddress] = useState('');
  const [doctorFee, setDoctorFee] = useState(0);
  const [region, setRegion] = useState('New Delhi');
  const [doctorDesc, setDoctorDesc] = useState('');

  const [nameVal, setNameVal] = useState(true);
  const [emailVal, setEmailVal] = useState(true);
  const [cliNameVal, setCliNameVal] = useState(true);
  const [cliAddVal, setCliAddVal] = useState(true);
  const [feeVal, setFeeVal] = useState(true);
  const [descVal, setDescVal] = useState(true);

  const [registerLoading, setRegisterLoading] = useState(false);

  const navigation = useNavigation();

  const storeClientID = async (id) => {
    try {
      await AsyncStorage.setItem('myClientID', id);
    } catch (e) {
      console.log('Something went wrong');
    }
  };

  const [addDoctorHandler, { data, loading, error }] = useMutation(addDoctor, {
    onCompleted: (data) => {
      storeClientID(data.insert_doctor_one.id);
      setRegisterLoading(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Tabs' }],
      });
    },
  });

  const registerHandler = () => {
    if (doctorName.length <= 5) {
      setNameVal(false);
      return;
    } else if (doctorEmail.length <= 10) {
      setNameVal(true);
      setEmailVal(false);
      return;
    } else if (clinicName.length <= 5) {
      setNameVal(true);
      setEmailVal(true);
      setCliNameVal(false);
      return;
    } else if (clinicAddress.length <= 10) {
      setNameVal(true);
      setEmailVal(true);
      setCliNameVal(true);
      setCliAddVal(false);
      return;
    } else if (parseInt(doctorFee) <= 0 || parseInt(doctorFee) >= 2500) {
      setNameVal(true);
      setEmailVal(true);
      setCliNameVal(true);
      setCliAddVal(true);
      setFeeVal(false);
      return;
    } else if (doctorDesc.length <= 15) {
      setNameVal(true);
      setEmailVal(true);
      setCliNameVal(true);
      setCliAddVal(true);
      setFeeVal(true);
      setDescVal(false);
      return;
    } else {
      setNameVal(true);
      setCliNameVal(true);
      setCliAddVal(true);
      setEmailVal(true);
      setFeeVal(true);
      setDescVal(true);
    }

    setRegisterLoading(true);
    addDoctorHandler({
      variables: {
        aboutMe: doctorDesc,
        clinicAddress: clinicAddress,
        clinicName: clinicName,
        consultationFee: doctorFee,
        email: doctorEmail,
        name: doctorName,
        phone: '+91' + doctorPhone,
        region: region,
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Hello.</Text>
        <Text style={styles.subHeading}>
          Looks like you're new. Fill in these details to setup your account.
        </Text>
      </View>
      <KeyboardAwareScrollView style={styles.form}>
        <CustomTextInput
          label="Name"
          placeholder="Name..."
          prefix="Dr."
          value={doctorName}
          editable={true}
          onChangeText={setDoctorName}
          isValidated={nameVal}
          valText="Please enter your full name"
        />
        <CustomTextInput
          label="Phone"
          prefix="+91"
          value={doctorPhone}
          editable={false}
        />
        <CustomTextInput
          label="Email"
          placeholder="Email ID..."
          value={doctorEmail}
          editable={true}
          onChangeText={setDoctorEmail}
          icon="mail-open"
          isValidated={emailVal}
          valText="Email seems to be wrong"
        />
        <CustomTextInput
          label="Clinic Name"
          placeholder="Clinic Name..."
          value={clinicName}
          editable={true}
          onChangeText={setClinicName}
          icon="medkit"
          isValidated={cliNameVal}
          valText="Clinic name must have atleast 5 characters"
        />
        <CustomTextInput
          label="Clinic Address"
          placeholder="Clinic Address..."
          value={clinicAddress}
          editable={true}
          onChangeText={setClinicAddress}
          icon="location"
          isValidated={cliAddVal}
          valText="Clinic address must atleast be 10 characters long"
        />
        <CustomTextInput
          label="Consultation Fee"
          placeholder="Consultation Fee..."
          value={doctorFee}
          editable={true}
          prefix="₹"
          onChangeText={setDoctorFee}
          isValidated={feeVal}
          keyboardType="number-pad"
          valText="Please enter a valid number"
        />
        <CustomTextInput
          label="Region"
          value={region}
          editable={false}
          icon="map"
        />
        <CustomTextInput
          label="About me"
          placeholder="Few Lines about me..."
          value={doctorDesc}
          editable={true}
          onChangeText={setDoctorDesc}
          icon="person"
          multiline={true}
          isValidated={descVal}
          valText="Description is not wordy enough!"
        />
        <View style={styles.footer}>
          {registerLoading ? (
            <ActivityIndicator size="small" color={Colors.primary500} />
          ) : (
            <CustomButton
              title="Register"
              backgroundColor={Colors.primary500}
              textColor={Colors.white}
              onPress={registerHandler}
            />
          )}
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: Colors.primary500,
  },
  header: {
    padding: 16,
    alignItems: 'flex-start',
  },
  heading: {
    fontSize: 36,
    fontWeight: 'bold',
    color: Colors.white,
  },
  subHeading: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.grey,
  },
  form: {
    flex: 1,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: 8,
    paddingTop: 16,
    backgroundColor: Colors.white,
  },
  footer: {
    margin: 16,
  },
});
