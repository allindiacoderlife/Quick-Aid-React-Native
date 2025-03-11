import { StyleSheet, Text, TextInput, TextInputProps, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Colors from '../../constants/Colors';
import Font from '../../constants/Font';
import FontSize from '../../constants/FontSize';
import Spacing from '../../constants/Spacing';
import { Ionicons } from '@expo/vector-icons';

const AppTextInput = ({ placeholder, secureTextEntry, ...otherProps }) => {
  const [focused, setFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  return (
    <View style={[styles.container, focused && styles.focusedContainer]}>
      <TextInput
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholderTextColor={Colors.darkText}
        secureTextEntry={secureTextEntry && !isPasswordVisible}
        placeholder={placeholder}
        {...otherProps}
        style={[styles.input]}
      />
      {secureTextEntry && (
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Ionicons
            name={isPasswordVisible ? 'eye-off' : 'eye'}
            size={Spacing * 2}
            color={Colors.darkText}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AppTextInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightPrimary,
    borderRadius: Spacing,
    marginVertical: Spacing,
  },
  focusedContainer: {
    borderWidth: 3,
    borderColor: Colors.primary,
    shadowOffset: { width: 4, height: Spacing },
    shadowOpacity: 0.2,
    shadowRadius: Spacing,
  },
  input: {
    flex: 1,
    fontFamily: Font['poppins-regular'],
    fontSize: FontSize.small,
    padding: Spacing * 2,
  },
  focusedInput: {
    borderWidth: 3,
    borderColor: Colors.primary,
    shadowOffset: { width: 4, height: Spacing },
    shadowColor: Colors.primary,
    shadowOpacity: 0.2,
    shadowRadius: Spacing,
  },
  icon: {
    padding: Spacing,
  },
});
