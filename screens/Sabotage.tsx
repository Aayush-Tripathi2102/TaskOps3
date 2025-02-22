import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  FlatList,
  Alert,
  TextInput,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, ImageBackground } from "expo-image";
import { Team } from "../api/models";
import { Button } from "react-native-elements";
import { getActiveTeamsToSabotage } from "../api/getActiveTeams";
import { sabotageTeam } from "../api/assignSabotage";

export default function Sabotage() {
  const { userId, setUserId } = React.useContext(UserContext);
  const [teams, setTeams] = useState<Team[]>([]);
  const [logoutModal, setLogoutModal] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetchSabotageStatus();
  }, []);

  const fetchSabotageStatus = async () => {
    try {
      ToastAndroid.show("Fetching sabotage status", ToastAndroid.SHORT);
      setTeams(await getActiveTeamsToSabotage(userId || ""));
    } catch (e) {
      console.log("error", e);
    }
    ToastAndroid.show("Fetched sabotage status", ToastAndroid.SHORT);
  };

  const sabotageTeamFunc = async (teamName: string) => {
    ToastAndroid.show("Sabotaging team", ToastAndroid.SHORT);
    try {
      await sabotageTeam(teamName, userId as string);
      ToastAndroid.show("Sabotaged team", ToastAndroid.SHORT);
    } catch (e) {
      ToastAndroid.show("Error in sabotaging team", ToastAndroid.SHORT);
    }
  };

  const handleLogout = () => {
    if (password === "tee") {
      setUserId(null);
      setLogoutModal(false);
      ToastAndroid.show("Logged Out Successfully!", ToastAndroid.SHORT);
    } else {
      ToastAndroid.show("Incorrect Password!", ToastAndroid.SHORT);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/space_bg.jpg")}
      className="flex-1"
      resizeMode="cover"
    >
      <SafeAreaView className="flex-1">
        {/* App Bar */}
        <View className="flex-row justify-between items-center px-5 py-3">
          <Text className="text-white text-3xl font-joffrey">Sabotage</Text>
          <TouchableOpacity
            className="bg-red-500 px-4 py-2 rounded-lg shadow-md"
            onPress={() => setLogoutModal(true)}
          >
            <Text className="text-white text-lg font-joffrey">Logout</Text>
          </TouchableOpacity>
        </View>
  
        {/* Title */}
        <View className="flex-1 items-center justify-center">
          <Text className="text-red-500 text-6xl font-joffrey tracking-widest text-center">
            SABOTAGE MISSION
          </Text>
  
          {/* Team List */}
          <View className="w-full px-5 mt-5 items-center">
            {teams.length > 0 ? (
              <FlatList
                data={teams}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                  <View className="w-full max-w-sm p-4 my-3 bg-black bg-opacity-80 rounded-2xl shadow-lg border border-red-500 items-center">
                    <Text className="text-white text-xl font-joffrey mb-2">
                      {index + 1}. {item.name}
                    </Text>
                    <TouchableOpacity
                      className="bg-red-500 px-5 py-2 rounded-xl shadow-md"
                      onPress={() => sabotageTeamFunc(item.id)}
                    >
                      <Text className="text-white text-lg font-joffrey">
                        Sabotage
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                contentContainerStyle={{ paddingBottom: 100 }}
              />
            ) : (
              <Text className="text-white text-xl mt-10 font-joffrey text-center">
                No teams available to sabotage
              </Text>
            )}
          </View>
  
          {/* Refresh Button */}
          <TouchableOpacity
            className="absolute bottom-5 left-10 right-10 flex flex-row p-3 items-center gap-x-5 bg-blue-500 rounded-xl justify-center"
            onPress={fetchSabotageStatus}
          >
            <Image
              className="h-8 w-8"
              contentFit="cover"
              source={require("../assets/refresh.svg")}
            />
            <Text className="text-white text-xl">Refresh</Text>
          </TouchableOpacity>
        </View>
  
        {/* Logout Modal */}
        <Modal visible={logoutModal} transparent animationType="slide">
          <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
            <View className="bg-white p-5 rounded-lg w-full shadow-lg">
              <Text className="text-center text-lg font-joffrey">Enter Password</Text>
              <TextInput
                secureTextEntry
                className="border border-gray-400 p-2 mt-3 rounded-md"
                placeholder="Password"
                onChangeText={setPassword}
              />
              <View className="flex-row justify-between mt-5">
                <TouchableOpacity
                  className="bg-gray-400 px-4 py-2 rounded-md"
                  onPress={() => setLogoutModal(false)}
                >
                  <Text className="text-white font-joffrey">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-red-500 px-4 py-2 rounded-md"
                  onPress={handleLogout}
                >
                  <Text className="text-white font-joffrey">Logout</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ImageBackground>
  );  
  
}