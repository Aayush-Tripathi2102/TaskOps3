import { View, Text } from "react-native";
import { Image } from "expo-image";
import * as React from "react";

const TaskCompleted: React.FC<{ taskId: number; taskName: string }> = ({
  taskId,
  taskName,
}) => {
  return (
    <View className="flex items-center mt-5">
      <Image
        className="h-14 w-[95vw]"
        contentFit="cover"
        source={require("../assets/task-complete.svg")}
      />
      <Text className="text-white text-[15px] absolute top-3 font-extrabold">
        TASK {taskName}{" "}
      </Text>
      <Text className="text-white absolute bottom-0 text-[15px] font-extrabold right-14">
        COMPLETED
      </Text>
    </View>
  );
};

export default TaskCompleted;
