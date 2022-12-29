import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { Colors } from '../constants/color';
import CustomTextInput from '../components/signup/CustomTextInput';
import CustomButton from '../components/ui/CustomButton';
import { addDoctor } from '../services/apis/mutations/doctor';
import { doctorActions } from '../store/doctor';

export default SignUpScreen = ({ route }) => {
  const [doctorName, setDoctorName] = useState('');
  const [doctorPhone, setDoctorPhone] = useState(route.params.phone);
  const [doctorEmail, setDoctorEmail] = useState('');
  const [clinicName, setClinicName] = useState('');
  const [clinicAddress, setClinicAddress] = useState('');
  const [doctorFee, setDoctorFee] = useState(0);
  const [region, setRegion] = useState('New Delhi');
  const [doctorDesc, setDoctorDesc] = useState('');

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [addDoctorHandler, { data, loading, error }] = useMutation(addDoctor, {
    onCompleted: (data) => {
      dispatch(doctorActions.setDoctor(data.insert_doctor_one));
      navigation.reset({
        index: 0,
        routes: [{ name: 'Tabs' }],
      });
    },
  });

  const registerHandler = () => {
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
      <ScrollView style={styles.form}>
        <CustomTextInput
          label="Name"
          placeholder="Name..."
          prefix="Dr."
          value={doctorName}
          editable={true}
          onChangeText={setDoctorName}
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
        />
        <CustomTextInput
          label="Clinic Name"
          placeholder="Clinic Name..."
          value={clinicName}
          editable={true}
          onChangeText={setClinicName}
          icon="medkit"
        />
        <CustomTextInput
          label="Clinic Address"
          placeholder="Clinic Address..."
          value={clinicAddress}
          editable={true}
          onChangeText={setClinicAddress}
          icon="location"
        />
        <CustomTextInput
          label="Consultation Fee"
          placeholder="Consultation Fee..."
          value={doctorFee}
          editable={true}
          prefix="₹"
          onChangeText={setDoctorFee}
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
        />
        <View style={styles.footer}>
          <CustomButton
            title="Register"
            backgroundColor={Colors.primary500}
            textColor={Colors.white}
            onPress={registerHandler}
          />
        </View>
      </ScrollView>
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
