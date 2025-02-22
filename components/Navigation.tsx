import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { Image, ImageBackground } from "expo-image";
import * as React from "react";

const Navigation = () => {
  return (
    <>
      <View className="bg-white absolute bottom-[10px] w-[100%] h-[5%] rounded-2xl flex-row justify-around items-center">
        <TouchableOpacity className="w-[45%] flex-row justify-around items-center">
          <Image
            className="h-4 w-4 mx-auto my-auto"
            contentFit="cover"
            source={require("../assets/percentage.svg")}
          />
          <Text className="text-black text-[12px]"> Progress </Text>
        </TouchableOpacity>

        <Image
          className="h-6 w-4 mx-auto my-auto"
          contentFit="cover"
          source={require("../assets/bars-leader.svg")}
        />

        <TouchableOpacity className="w-[45%] flex-row items-center justify-around mr-[5px]">
          <Image
            className="h-4 w-4 mx-auto"
            contentFit="cover"
            source={require("../assets/list.svg")}
          />
          <Text className="text-black text-[12px]"> Leaderboard </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Navigation;
