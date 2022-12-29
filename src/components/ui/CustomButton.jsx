import { Text, Pressable, StyleSheet } from 'react-native';

export default CustomButton = ({
  title,
  onPress,
  backgroundColor,
  textColor,
}) => {
  return (
    <Pressable
      style={[styles.buttonContainer, { backgroundColor: backgroundColor }]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 12,
    borderRadius: 12,
    marginVertical: 8,
  },
  buttonText: {
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 20,
  },
});
