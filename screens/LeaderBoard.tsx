import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  ImageBackground,
} from "react-native";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import { Team } from "../api/models";
import { UserContext } from "../context/UserContext";
import { getGlobalLeaderBoard, getTeamById } from "../api/teams";

// Store the PNG images in an array
const teamLogos = [
  require("../assets/teamlogo/img1.png"),
  require("../assets/teamlogo/img2.png"),
  require("../assets/teamlogo/img3.png"),
  require("../assets/teamlogo/img4.png")
];

function ChatBubble({ team, index }: { team: Team; index: number }) {
  // Randomly pick a team logo
  const randomLogo = teamLogos[index % teamLogos.length];

  return (
    <View className="w-[90%] mx-auto mt-3 bg-white p-4 rounded-lg border border-gray-300 shadow-lg flex-row items-center">
      <View className="flex-shrink-0">
        <Text className="text-blue-400 text-[20px] font-bold">{index}</Text>
      </View>
      <View className="ml-4 flex-1">
        <Text className="text-black text-[20px] font-bold font-joffrey">{team.name}</Text>
        <Text className="text-gray-800 text-[14px]">Score: {team.total_score}</Text>
      </View>
      <View className="flex-shrink-0">
        <Image
          className="h-10 w-10 rounded-full"
          contentFit="cover"
          source={randomLogo}
        />
      </View>
    </View>
  );
}

const LeaderBoard = () => {
  const { userId } = React.useContext(UserContext);
  const [teams, setTeams] = useState<Team[]>([]);
  const [userScore, setUserScore] = useState(0);

  useEffect(() => {
    (async function () {
      try {
        const t = await getGlobalLeaderBoard();
        setTeams(t);
        const loggedInTeam = await getTeamById(userId ?? "");
        const points = t.find((team) => team.name == loggedInTeam?.name)?.total_score || 0;
        setUserScore(points);
      } catch (e) {
        console.log("error", e);
      }
    })();
  }, []);

  return (
    
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 p-4">
          {/* Add space above LeaderBoard */}
          <View className="h-10" />

          {/* Header */}
          <Text className="text-white font-joffrey text-8xl text-center uppercase">
            LEADERBOARD
          </Text>
          <Text className="text-gray-400 text-[16px] mb-3 text-center">
            Your Score: {userScore}
          </Text>

          {/* Scrollable Leaderboard */}
          <View className="flex-1">
            {teams.map((team, i) => (
              <ChatBubble index={i + 1} key={i} team={team} />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Fixed Refresh Button */}
      <TouchableOpacity
        className="absolute bottom-5 left-10 right-10 flex flex-row p-3 items-center gap-x-5 bg-blue-500 rounded-xl justify-center"
        onPress={async () => {
          try {
            ToastAndroid.show("Refreshing...", ToastAndroid.SHORT);
            const t = await getGlobalLeaderBoard();
            setTeams(t);
          } catch (e) {
            console.log("error", e);
          }
          ToastAndroid.show("Refreshed", ToastAndroid.SHORT);
        }}
      >
        <Image className="h-8 w-8" contentFit="cover" source={require("../assets/refresh.svg")} />
        <Text className="text-white text-xl">Refresh</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LeaderBoard;