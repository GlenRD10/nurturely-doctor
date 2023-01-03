import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import React, { useState } from 'react';

import Moment from 'moment';

import { useSelector } from 'react-redux';

import { Colors } from '../../constants/color';

export default AppointmentList = () => {
  const appointments = useSelector((state) => state.appointments);
  const [selectedTab, setSelectedTab] = useState('Today');
  const tabList = ['Today', 'All', 'Pending'];

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

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {tabList.map((tab) => {
          let color = Colors.darkGrey;
          let bgColor = Colors.white;
          if (tab === selectedTab) {
            color = Colors.white;
            bgColor = Colors.primary500;
          }
          return (
            <Pressable
              key={tab}
              style={[styles.tabButton, { backgroundColor: bgColor }]}
              onPress={() => {
                setSelectedTab(tab);
              }}
            >
              <Text style={[styles.tabText, { color: color }]}>{tab}</Text>
            </Pressable>
          );
        })}
      </View>
      <ScrollView style={styles.appointmentList}>
        {appointments.map((appointment) => {
          const appDate = new Date(appointment.dateTime);
          const userAge = getAge(appointment.user.dateOfBirth);

          return (
            <View key={appointment.dateTime} style={styles.appointmentCard}>
              <View style={styles.dateTime}>
                <Text style={styles.subHeading}>
                  {Moment(appDate).format('ll')}
                </Text>
                <Text style={styles.heading}>
                  {Moment(appDate).format('LT')}
                </Text>
              </View>
              <View style={styles.userDetails}>
                <Text style={styles.heading}>{appointment.user.name}</Text>
                <Text style={styles.subHeading}>{appointment.description}</Text>
              </View>
              <View style={styles.age}>
                <Text style={styles.subHeading}>Age:</Text>
                <Text style={styles.heading}>{userAge} M</Text>
              </View>
            </View>
          );
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
  tabContainer: {
    flexDirection: 'row',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  tabText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  appointmentList: {
    marginTop: 12,
  },
  appointmentCard: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 16,
    flexDirection: 'row',
    backgroundColor: Colors.primary500,
  },
  dateTime: {
    flex: 3,
  },
  userDetails: {
    flex: 5,
  },
  age: {
    flex: 1,
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
});
