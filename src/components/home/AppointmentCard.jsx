import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import React from 'react';

import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';

import Moment from 'moment';

import { Colors } from '../../constants/color';
import { appointmentActions } from '../../store/appointment';
import {
  approveAppointmentById,
  deleteAppointmentById,
} from '../../services/apis/mutations/appointment';

export default AppointmentCard = ({ appointment, type }) => {
  const dispatch = useDispatch();
  const appDate = new Date(appointment.dateTime);

  const getAge = (date) => {
    const userDOB = new Date(date);
    const today = new Date();

    var age = today.getFullYear() - userDOB.getFullYear();
    var m = today.getMonth() - userDOB.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < userDOB.getDate())) {
      age--;
    }

    return age * 12 + (12 + m);
  };

  const userAge = getAge(appointment.user.dateOfBirth);

  //TODO: Add error handling for error in deleting appointment
  const [
    deleteAppointmentMutation,
    { loading: declineLoading, error: declineError },
  ] = useMutation(deleteAppointmentById, { variables: { id: appointment.id } });

  const declineHandler = () => {
    deleteAppointmentMutation().then((response) => {
      dispatch(
        appointmentActions.removeAppointment(
          response.data.delete_appointment_by_pk.id
        )
      );
    });
  };

  const [
    approveAppointmentMutation,
    { loading: approveLoading, error: approveError },
  ] = useMutation(approveAppointmentById, {
    variables: { id: appointment.id },
  });

  const approveHandler = () => {
    approveAppointmentMutation().then((response) => {
      dispatch(
        appointmentActions.approveAppointment(
          response.data.update_appointment_by_pk.id
        )
      );
    });
  };

  return (
    <View key={appointment.id} style={styles.container}>
      <View style={styles.appointmentCard}>
        <View style={{ flex: 2.5 }}>
          <Text style={styles.subHeading}>{Moment(appDate).format('ll')}</Text>
          <Text style={styles.heading}>{Moment(appDate).format('LT')}</Text>
        </View>
        <View style={{ flex: 5 }}>
          <Text style={styles.heading}>{appointment.user.name}</Text>
          <Text style={styles.subHeading}>{appointment.description}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.subHeading}>Age:</Text>
          <Text style={styles.heading}>{userAge} M</Text>
        </View>
      </View>
      {type === 'pending' ? (
        <View style={styles.pendingContainer}>
          <Pressable style={styles.buttons} onPress={approveHandler}>
            {approveLoading ? (
              <ActivityIndicator size="small" color={Colors.primary500} />
            ) : (
              <Text style={styles.buttonText}>Approve</Text>
            )}
          </Pressable>
          <Pressable style={styles.buttons} onPress={declineHandler}>
            {declineLoading ? (
              <ActivityIndicator size="small" color={Colors.primary500} />
            ) : (
              <Text style={styles.buttonText}>Decline</Text>
            )}
          </Pressable>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    borderRadius: 16,
    backgroundColor: Colors.primary500,
    padding: 16,
  },
  appointmentCard: {
    flexDirection: 'row',
  },
  heading: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: 'bold',
  },
  subHeading: {
    fontSize: 12,
    color: Colors.grey,
    fontWeight: '500',
  },
  pendingContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttons: {
    flex: 1,
    backgroundColor: Colors.primary500,
    padding: 8,
    marginHorizontal: 8,
    borderRadius: 16,
    backgroundColor: Colors.white,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary500,
    textAlign: 'center',
  },
});
