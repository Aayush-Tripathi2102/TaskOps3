// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ToastAndroid,
//   FlatList,
// } from "react-native";
// import React, { useEffect, useState } from "react";
// import { UserContext } from "../context/UserContext";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Image } from "expo-image";
// import { Team } from "../api/models";
// import { Button } from "react-native-elements";
// import { getActiveTeamsToSabotage } from "../api/getActiveTeams";
// import { sabotageTeam } from "../api/assignSabotage";

// export default function Sabotage() {
//   const { userId } = React.useContext(UserContext);
//   const [teams, setTeams] = useState<Team[]>([]);

//   useEffect(() => {
//     fetchSabotageStatus();
//   }, []);

//   const fetchSabotageStatus = async () => {
//     try {
//       ToastAndroid.show("Fetching sabotage status", ToastAndroid.SHORT);
//       setTeams(await getActiveTeamsToSabotage(userId || ""));
//     } catch (e) {
//       console.log("error", e);
//     }
//     ToastAndroid.show("Fetched sabotage status", ToastAndroid.SHORT);
//   };

//   const sabotageTeamFunc = async (teamName: string) => {
//     ToastAndroid.show("Sabotaging team", ToastAndroid.SHORT);
//     try {
//       await sabotageTeam(teamName, userId as string);

//       ToastAndroid.show("Sabotaged team", ToastAndroid.SHORT);
//     } catch (e) {
//       ToastAndroid.show("Error in sabotaging team", ToastAndroid.SHORT);
//     }
//   };

//   return (
//     <SafeAreaView>
//       <View className="bg-black h-[100%] overflow-hidden flex flex-col items-center">
//         <View className="flex-row justify-between items-center w-full pt-10">
//           <Image
//             className="h-48 w-16"
//             contentFit="cover"
//             source={require("../assets/leaderboard-header.svg")}
//           />
//           <Image
//             className="h-8 w-48 mt-5"
//             contentFit="cover"
//             source={require("../assets/SABOTAGE.svg")}
//           />
//           <Image
//             className="h-48 w-16 rotate-180 mt-5"
//             contentFit="cover"
//             source={require("../assets/leaderboard-header.svg")}
//           />
//         </View>
//         <View>
//           {teams!.length > 0 ? (
//             <View>
//               <Text>Select Team to sabotage</Text>
//               <View className="w-full h-[70%] mt-3 flex flex-col">
//                 <FlatList
//                   data={teams}
//                   renderItem={({ item, index }) => (
//                     <View className="flex flex-row items-center m-2">
//                       <Button
//                         className="m-2 p-2"
//                         onPress={() => sabotageTeamFunc((item as any).id)}
//                       ></Button>
//                       <Text className="text-white ml-6">
//                         {index + 1}. {item.name}
//                       </Text>
//                     </View>
//                   )}
//                 />
//               </View>
//             </View>
//           ) : (
//             <Text className="text-white">You are not eligible to sabotage</Text>
//           )}
//         </View>
//         <TouchableOpacity
//           className="absolute flex flex-row p-3 items-center gap-x-5 bg-secondary rounded-xl justify-center bottom-5"
//           onPress={fetchSabotageStatus}
//         >
//           <Image
//             className="h-8 w-8"
//             contentFit="cover"
//             source={require("../assets/refresh.svg")}
//           />
//           <Text className="text-white text-xl mr-3">Refresh</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }
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
import { Image } from "expo-image";
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
    <SafeAreaView className="flex-1 bg-black">
      {/* App Bar */}
      <View className="flex-row justify-between items-center px-5 py-3 bg-gray-800">
        <Text className="text-white text-2xl font-bold">Sabotage</Text>
        <TouchableOpacity
          className="bg-red-500 px-3 py-2 rounded-lg"
          onPress={() => setLogoutModal(true)}
        >
          <Text className="text-white text-lg">Logout</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1 items-center">
        {/* Header Design */}
        <View className="flex-row justify-between items-center w-full pt-10">
          <Image
            className="h-48 w-16"
            contentFit="cover"
            source={require("../assets/leaderboard-header.svg")}
          />
          <Image
            className="h-8 w-48 mt-5"
            contentFit="cover"
            source={require("../assets/SABOTAGE.svg")}
          />
          <Image
            className="h-48 w-16 rotate-180 mt-5"
            contentFit="cover"
            source={require("../assets/leaderboard-header.svg")}
          />
        </View>

        {/* Team List */}
        <View className="flex-1 w-full px-5">
          {teams.length > 0 ? (
            <View>
              <Text className="text-white text-lg text-center">
                Select a team to sabotage
              </Text>
              <FlatList
                data={teams}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                  <View className="flex-row items-center justify-between my-2 p-3 bg-gray-700 rounded-lg">
                    <Text className="text-white text-lg">
                      {index + 1}. {item.name}
                    </Text>
                    <TouchableOpacity
                      className="bg-red-500 px-3 py-2 rounded-lg"
                      onPress={() => sabotageTeamFunc(item.id)}
                    >
                      <Text className="text-white">Sabotage</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          ) : (
            <Text className="text-white text-center mt-10">
              You are not eligible to sabotage
            </Text>
          )}
        </View>

        {/* Refresh Button */}
        <TouchableOpacity
          className="absolute flex-row p-3 items-center bg-secondary rounded-xl bottom-5"
          onPress={fetchSabotageStatus}
        >
          <Image
            className="h-8 w-8"
            contentFit="cover"
            source={require("../assets/refresh.svg")}
          />
          <Text className="text-white text-xl ml-3">Refresh</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Modal */}
      <Modal visible={logoutModal} transparent={true} animationType="slide">
        <View className="flex-1 justify-center items-center bg-black bg-opacity-70">
          <View className="bg-white p-5 rounded-lg w-80">
            <Text className="text-center text-lg font-bold">Enter Password</Text>
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
                <Text className="text-white">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-red-500 px-4 py-2 rounded-md"
                onPress={handleLogout}
              >
                <Text className="text-white">Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
