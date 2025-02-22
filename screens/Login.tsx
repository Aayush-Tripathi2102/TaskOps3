import React, { useState, useCallback, useContext } from "react";
import { StyleSheet, Text, View, TextInput, ToastAndroid } from "react-native";
// import { useFonts } from 'expo-font';
// import * as SplashScreen from 'expo-splash-screen';
import Background from "../components/Background";
import Input from "../components/Input";
import Button from "../components/Button";
import { loginTeam } from "../api/teams";
import { UserContext } from "../context/UserContext";
import { delay } from "../utils/helpers";
//SplashScreen.preventAutoHideAsync();

const Login = () => {
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
      <View style={styles.container}>
        <Text style={styles.heading}>LOGIN</Text>
        <View className="relative w-full top-5 inset-0 mx-auto my-auto space-y-10">
          <TextInput
            className="w-[70%] mx-auto h-12 bg-white rounded-xl text-2xl p-2"
            placeholder="Team Name"
            onChange={(e) => {
              setTeamName(e.nativeEvent.text);
            }}
          />
          <TextInput
            textContentType="password"
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
  container: {
    width: 400,
    marginVertical: 100,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  heading: {
    color: "#43FFFF",
    fontSize: 64,
    // top:108,
    // left:60,
    textAlign: "center",
    marginBottom: 150,
    //fontFace:"Aldrich",
  },

  input: {
    marginTop: 120,
  },
});

export default Login;
