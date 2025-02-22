import React, { useState, useCallback, useContext } from "react";
import { StyleSheet, Text, View, TextInput, ToastAndroid,Dimensions,TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
// import { useFonts } from 'expo-font';
// import * as SplashScreen from 'expo-splash-screen';
import Background from "../components/Background";
import Input from "../components/Input";
import Button from "../components/Button";
import { loginTeam } from "../api/teams";
import { UserContext } from "../context/UserContext";
import { delay } from "../utils/helpers";

//SplashScreen.preventAutoHideAsync();

const { width, height } = Dimensions.get("window");
const Login = () => {
  const navigation = useNavigation();
  const [teamName, setTeamName] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const { setUserId } = useContext(UserContext);

  const submit = async () => {
    if (!teamName || !password) {
      ToastAndroid.show("Please fill all the fields", ToastAndroid.SHORT);
      return;
    }

    try {
      const res = await loginTeam(teamName, password);

      ToastAndroid.show("Team logged in successfully!", ToastAndroid.SHORT);

      delay(500);

      await setUserId(res.id);
    } catch (e) {
      ToastAndroid.show((e as any).message, ToastAndroid.SHORT);
    }
  };

  return (
    <Background>
      <View style={styles.appBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.heading}>LOGIN</Text>
        <View className="relative w-full top-5 inset-0 mx-auto my-auto space-y-10">
          <TextInput
            placeholderTextColor="rgb(255, 255, 255)"
            style={styles.input}
            textAlign="center" 
            className="w-[70%] mx-auto h-12 bg-white rounded-xl text-2xl p-2"
            placeholder="Team Name"
            onChange={(e) => {
              setTeamName(e.nativeEvent.text);
            }}
          />
          <TextInput
            placeholderTextColor="rgb(255, 255, 255)"
            textContentType="password"
            
            style={styles.input}
            secureTextEntry={true}
            className="w-[70%] mx-auto h-12 bg-white rounded-xl text-2xl p-2"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.nativeEvent.text);
            }}
          />
        </View>
        <Button
          label={"SUBMIT"}
          TextColor={"black"}
          Margin={100}
          Press={() => {
            submit();
          }}
        />
      </View>
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
    marginTop: height * 0.01,
  },
  container: {
    width: width*0.8,
    marginVertical: height*0.1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  heading: {
    fontFamily: 'Joffrey',
    color: "#FFFFFF",
    fontSize:  height * 0.08,
    textAlign: "center",
    marginTop: height*0.05,
    marginBottom: height*0.1,
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

export default Login;
