import { View, Text } from "react-native";
import { Image } from "expo-image";
import * as React from "react";
import { useFonts } from "expo-font";

const TaskCompleted: React.FC<{ taskId: number; taskName: string }> = ({
  taskId,
  taskName,
}) => {
  const [fontsLoaded] = useFonts({
    AmongUs: require("../assets/fonts/amongus.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View className="flex items-center mt-5">
      <Image
        className="h-24 w-[95vw]"
        contentFit="fill"
        source={require("../assets/new-theme/task-completed.png")}
      />
      <Text
        className="text-white text-[30px] absolute top-9 font-amongus"
        style={{ fontFamily: "AmongUs" }}
      >
        TASK {taskName}{" "}
      </Text>
      <Text
        className="text-white absolute top-14 text-[15px] font-extrabold right-14"
        style={{ fontFamily: "AmongUs" }}
      >
        COMPLETED
      </Text>
    </View>
  );
};

export default TaskCompleted;
