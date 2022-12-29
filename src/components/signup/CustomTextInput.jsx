import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../../constants/color';

export default CustomTextInput = ({
  label,
  placeholder,
  prefix,
  onChangeText,
  value,
  editable,
  icon,
  multiline,
}) => {
  return (
    <View style={styles.input}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputBox}>
        <View style={{ flex: 1, alignItems: 'center', marginRight: 4 }}>
          {icon ? (
            <Ionicons name={icon} color={Colors.primary500} size={20} />
          ) : (
            <Text style={styles.inputText}>{prefix}</Text>
          )}
        </View>
        <View style={{ flex: 9 }}>
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={Colors.primary400}
            keyboardType="default"
            style={styles.inputField}
            value={value}
            onChangeText={onChangeText}
            editable={editable}
            multiline={multiline}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginHorizontal: 16,
    marginVertical: 4,
  },
  label: {
    marginHorizontal: 8,
    fontSize: 12,
    color: Colors.primary500,
    fontWeight: 'bold',
  },
  inputBox: {
    padding: 12,
    marginVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: Colors.primary500,
    borderRadius: 16,
  },
  inputText: {
    fontSize: 16,
    color: Colors.primary500,
    fontWeight: '500',
  },
  inputField: {
    flex: 1,
    marginHorizontal: 4,
    fontSize: 16,
    color: Colors.primary500,
    fontWeight: '500',
  },
});
