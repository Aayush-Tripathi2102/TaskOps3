import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  FlatList,
  TextInput,
  Modal,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Team } from "../api/models";
import { getActiveTeamsToSabotage } from "../api/getActiveTeams";
import { sabotageTeam } from "../api/assignSabotage";

export default function Sabotage() {
  const { userId } = React.useContext(UserContext);
  const [teams, setTeams] = useState<Team[]>([]);
  const [logoutModal, setLogoutModal] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    fetchSabotageStatus();
  }, []);

  const fetchSabotageStatus = async () => {
    try {
      ToastAndroid.show("Fetching sabotage status", ToastAndroid.SHORT);
      const activeTeams = await getActiveTeamsToSabotage(userId || "");
      setTeams(activeTeams);
    } catch (e) {
      console.error("Error fetching sabotage status:", e);
      ToastAndroid.show("Failed to fetch teams", ToastAndroid.SHORT);
    }
  };

  const sabotageTeamFunc = async (teamId: string) => {
    ToastAndroid.show("Sabotaging team", ToastAndroid.SHORT);
    try {
      await sabotageTeam(teamId, userId as string);
      ToastAndroid.show("Sabotaged team successfully", ToastAndroid.SHORT);
    } catch (e) {
      console.error("Error sabotaging team:", e);
      ToastAndroid.show("Failed to sabotage", ToastAndroid.SHORT);
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
        <View className="w-full px-5 py-3 bg-black bg-opacity-70 flex-row justify-between items-center">
          <Text className="text-white text-3xl font-joffrey">Task Ops 3.0</Text>
          <TouchableOpacity
            className="bg-red-600 px-4 py-2 rounded-lg shadow-lg"
            onPress={() => setLogoutModal(true)}
          >
            <Text className="text-white text-lg font-joffrey">Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text className="text-red-500 text-7xl font-joffrey mt-5 tracking-widest shadow-lg text-center">
          SABOTAGE MISSION
        </Text>

        {/* Team List */}
        <View className="flex-1 w-full px-5 mt-5">
          {teams.length > 0 ? (
            <FlatList
              data={teams}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item, index }) => (
                <View className="flex-row items-center justify-between my-2 p-4 bg-gray-900 bg-opacity-80 rounded-lg shadow-md border border-red-500">
                  <Text className="text-white text-xl font-joffrey">
                    {index + 1}. {item.name}
                  </Text>
                  <TouchableOpacity
                    className="bg-red-500 px-4 py-2 rounded-lg shadow-lg"
                    onPress={() => sabotageTeamFunc(item.id)}
                  >
                    <Text className="text-white text-xl font-joffrey">Sabotage</Text>
                  </TouchableOpacity>
                </View>
              )}
              contentContainerStyle={{ paddingBottom: 100 }}
            />
          ) : (
            <Text className="text-white text-xl text-center mt-10 font-joffrey">
              No teams available to sabotage
            </Text>
          )}
        </View>

        {/* Refresh Button */}
        <TouchableOpacity
          className="absolute flex-row p-4 items-center bg-blue-600 rounded-xl bottom-10 shadow-lg self-center"
          onPress={fetchSabotageStatus}
        >
          <Image
            className="h-8 w-8"
            contentFit="cover"
            source={require("../assets/refresh.svg")}
          />
          <Text className="text-white text-xl ml-3 font-joffrey">Refresh</Text>
        </TouchableOpacity>
      </SafeAreaView>

      {/* Logout Modal */}
      <Modal visible={logoutModal} transparent={true} animationType="slide">
        <View className="flex-1 justify-center items-center bg-black bg-opacity-70">
          <View className="bg-gray-900 p-6 rounded-lg w-80 border border-red-500">
            <Text className="text-center text-xl font-bold text-white font-joffrey">
              Enter Password
            </Text>
            <TextInput
              secureTextEntry
              className="border border-gray-400 p-3 mt-4 rounded-md text-white font-joffrey"
              placeholder="Password"
              placeholderTextColor="#ddd"
              onChangeText={setPassword}
            />
            <View className="flex-row justify-between mt-5">
              <TouchableOpacity
                className="bg-gray-600 px-4 py-2 rounded-md"
                onPress={() => setLogoutModal(false)}
              >
                <Text className="text-white font-joffrey">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-red-500 px-4 py-2 rounded-md">
                <Text className="text-white font-joffrey">Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}
