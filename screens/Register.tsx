import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ToastAndroid,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for back button
import Background from "../components/Background";
import Button from "../components/Button";
import { registerTeam } from "../api/teams";

const { width, height } = Dimensions.get("window");

const Register = () => {
  const navigation = useNavigation();
  const [teamName, setTeamName] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  // const [roundNo, setRoundNo] = useState<string | null>(null);
  const roundNo = "1"; 
  const submit = async () => {
    if (!teamName || !password || !roundNo) {
      ToastAndroid.show("Please fill all the fields", ToastAndroid.SHORT);
      return;
    }

    try {
      await registerTeam(teamName, password, parseInt(roundNo));
      ToastAndroid.show(
        "Team registered successfully, Please Login Now!",
        ToastAndroid.SHORT
      );
    } catch (e) {
      ToastAndroid.show((e as any).message, ToastAndroid.SHORT);
    }
  };

  return (
    <Background>
      {/* App Bar with Back Button */}
      <View style={styles.appBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <Text style={styles.heading}>REGISTER</Text>
        <View className="relative w-full top-5 inset-0 mx-auto my-auto space-y-10">
        <TextInput
  className="w-[70%] mx-auto h-12 bg-white rounded-xl text-2xl p-2"
  placeholder="Team Name"
  style={styles.input}
  placeholderTextColor="rgb(255, 255, 255)"
  onChange={(e) => setTeamName(e.nativeEvent.text.toLowerCase())}
/>
<TextInput
  textContentType="password"
  secureTextEntry={true}
  style={styles.input}
  placeholderTextColor="rgb(255, 255, 255)"
  className="w-[70%] mx-auto h-12 bg-white rounded-xl text-2xl p-2"
  placeholder="Password"
  onChange={(e) => setPassword(e.nativeEvent.text.toLowerCase())}
/>

        </View>
      </View>
      <Button
        label={"SUBMIT"}
        TextColor={"black"}
        Margin={height * 0.01}
        Press={submit}
      />
    </Background>
  );
};

const styles = StyleSheet.create({
  appBar: {
    width: "100%",
    height: height * 0.08,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginTop: height * 0.03,
  },
  container: {
    width: width * 0.8,
    marginVertical: height * 0.07,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontFamily: "Joffrey",
    color: "#FFFFFF",
    fontSize: height * 0.08,
    textAlign: "center",
    marginTop: height * 0.05,
    marginBottom: height * 0.1,
  },
  input: {
    fontFamily: "Joffrey",
    alignSelf: "center",
    width: width * 0.6,
    height: height * 0.06,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 12,
    backgroundColor: "transparent",
    color: "white",
    fontSize: width * 0.055,
    paddingHorizontal: 15,
    textAlign: "center",
    marginBottom: height * 0.001,
  },
});

export default Register;
