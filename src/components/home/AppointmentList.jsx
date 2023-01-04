import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import React from 'react';

import { useSelector } from 'react-redux';

import { Colors } from '../../constants/color';

import AppointmentCard from './AppointmentCard';
import TabList from './TabList';

export default AppointmentList = ({ selectedTab, setSelectedTab }) => {
  const appointments = useSelector((state) => state.appointments);

  if (selectedTab === 'Approved') {
    return (
      <View style={styles.container}>
        <TabList setSelectedTab={setSelectedTab} selectedTab={selectedTab} />
        <ScrollView style={styles.appointmentList}>
          {appointments.map((appointment) => {
            if (appointment.status === 'approved') {
              return (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  type="approved"
                />
              );
            }
          })}
        </ScrollView>
      </View>
    );
  }

  if (selectedTab === 'Pending') {
    return (
      <View style={styles.container}>
        <TabList setSelectedTab={setSelectedTab} selectedTab={selectedTab} />
        <ScrollView style={styles.appointmentList}>
          {appointments.map((appointment) => {
            if (appointment.status === 'pending') {
              return (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  type="pending"
                />
              );
            }
          })}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TabList setSelectedTab={setSelectedTab} selectedTab={selectedTab} />
      <ScrollView style={styles.appointmentList}>
        {appointments.map((appointment) => {
          const today = new Date();
          const appDate = new Date(appointment.dateTime);

          if (
            today.getDate() === appDate.getDate() &&
            today.getMonth() === appDate.getMonth() &&
            today.getFullYear() === appDate.getFullYear() &&
            appointment.status === 'approved'
          ) {
            return (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                type="approved"
              />
            );
          }
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  appointmentList: {
    marginTop: 12,
  },
});
