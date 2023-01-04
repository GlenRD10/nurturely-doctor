import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useState, useEffect } from 'react';

import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { getDoctorById } from '../services/apis/queries/doctor';
import { Colors } from '../constants/color';
import { doctorActions } from '../store/doctor';

import Header from '../components/home/Header';
import AppointmentList from '../components/home/AppointmentList';
import { appointmentActions } from '../store/appointment';

export default HomeScreen = () => {
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState('Today');
  const [skip, setSkip] = React.useState(false);
  const [myClientID, setMyClientID] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('myClientID').then((myClientID) => {
      setMyClientID(myClientID);
    });
  }, []);

  const { data, loading, error } = useQuery(getDoctorById, {
    variables: { id: myClientID },
    skip,
    onCompleted: (data) => {
      dispatch(
        appointmentActions.setAppointments(data.doctor_by_pk.appointments)
      );
      dispatch(doctorActions.setDoctor(data.doctor_by_pk));
    },
  });

  useEffect(() => {
    if (!loading && !data) setSkip(true);
  }, [data, loading]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Spinner
          color={Colors.primary500}
          visible={loading}
          textContent={'Loading up your Appointments'}
          textStyle={styles.spinnerTextStyle}
        />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>An unexpected Error Occured</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header selectedTab={selectedTab} />
      <AppointmentList
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinnerTextStyle: {
    color: Colors.primary500,
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.primary500,
  },
});
