import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import * as React from "react";

const Landing = ({ navigation }: any) => {
  return (
    <SafeAreaView className="flex-1">
      <Image
        source={require("../assets/space_bg.jpg")}
        className="absolute w-full h-full"
        contentFit="cover"
      />

      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex">
        <View className="flex-1 justify-center items-center mt-20">
          <Text className="text-white font-joffrey text-8xl text-center uppercase">
            Task Ops 3.0
          </Text>

          <Text className="text-white font-joffrey text-2xl mt-6 text-center">
            Welcome, Crewmate!
          </Text>

          <Text className="text-white font-joffrey text-xl mt-4 px-6 text-center">
            Complete tasks and climb the leaderboard. Watch out for impostors!
          </Text>

          <View className="mt-12 flex-row space-x-6">
            <TouchableOpacity
              onPress={() => navigation.navigate("Register")}
              className="bg-red-600 px-6 py-3 rounded-xl border-2 border-white"
            >
              <Text className="text-white font-joffrey text-2xl text-center">Register</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              className="bg-blue-600 px-6 py-3 rounded-xl border-2 border-white"
            >
              <Text className="text-white font-joffrey text-2xl text-center">Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Landing;
