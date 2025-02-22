import React from "react";
import { TextInput, TextInputProps } from "react-native";

interface InputProps extends TextInputProps {}

const Input: React.FC<InputProps> = (props) => {
  return (
    <TextInput {...props} style={{
        marginBottom:30,
        borderRadius:20,
        fontSize:28,
        width:335,
        height:60,
        backgroundColor:"#F0F0F3",
        color:"#1E1E1E",
        borderColor:"black",
        borderWidth:1,
        paddingHorizontal:20
    }} placeholderTextColor="#1E1E1E" ></TextInput>
  );
};

export default Input;