import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { Colors } from '../../constants/color';

export default Header = ({ selectedTab }) => {
  const doctor = useSelector((state) => state.doctor);
  const appointments = useSelector((state) => state.appointments);
  const [todayApp, setTodayApp] = useState(0);
  const [allApp, setAllApp] = useState(0);
  const [pendingApp, setPendingApp] = useState(0);

  useEffect(() => {
    let tod = 0;
    let all = 0;
    let pen = 0;
    const today = new Date();
    appointments.map((appointment) => {
      const appDate = new Date(appointment.dateTime);
      if (
        today.getDate() === appDate.getDate() &&
        today.getMonth() === appDate.getMonth() &&
        today.getFullYear() === appDate.getFullYear() &&
        appointment.status === 'approved'
      )
        tod++;

      if (appointment.status === 'approved') all++;
      else if (appointment.status === 'pending') pen++;
    });
    setTodayApp(tod);
    setPendingApp(pen);
    setAllApp(all);
  }, [appointments]);

  const subHeading = (status) => {
    if (status === 'Approved')
      return (
        <Text style={styles.subHeading}>You have {allApp} Appointments</Text>
      );
    else if (status === 'Pending')
      return (
        <Text style={styles.subHeading}>
          You have {pendingApp} pending Appointments
        </Text>
      );
    return (
      <Text style={styles.subHeading}>
        You have {todayApp} Appointments Today
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome Dr. {doctor.name}</Text>
      {subHeading(selectedTab)}
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
