import React, { FC } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ButtonProps {
  label: string;
  Press: () => void;
  TextColor: string;
  Margin: number;
}

const Button: FC<ButtonProps> = ({ label, Press, TextColor, Margin }) => {
  return (
    <TouchableOpacity
      onPress={Press}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 20,
        width: 300,
        height: 60,
        marginTop: Margin
      }}
    >
      <Text
        style={{
          color: TextColor,
          fontSize: 28,
          fontWeight: "800",
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
