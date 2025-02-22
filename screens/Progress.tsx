import {
  View,
  Text,
  SafeAreaView,
  ToastAndroid,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import { Image } from "expo-image";
import * as React from "react";
import { useState } from "react";
import Navigation from "../components/Navigation";
import TaskCompleted from "../components/TaskCompleted";
import TaskIncomplete from "../components/TaskIncomplete";
import { Task } from "../api/models";
import { getTasksForTeam } from "../api/tasks";
import { UserContext } from "../context/UserContext";
import { TaskContext } from "../context/TaskContext";
import { RandomlyShuffle } from "../utils/helpers";

const Progress = () => {
  const [activity, setActivity] = useState<Task[]>([]);
  const { userId } = React.useContext(UserContext);
  const [isSabotaged, setIsSabotaged] = useState(false);
  const { setTaskInfo, taskInfo } = React.useContext(TaskContext);

  React.useEffect(() => {
    updateTasks();
  }, []);

  const updateTasks = async () => {
    if (!userId) {
      ToastAndroid.show("User not logged in", ToastAndroid.SHORT);
      return;
    }
    ToastAndroid.show("Updating tasks", ToastAndroid.SHORT);
    const tasks = await getTasksForTeam(userId);
    if (tasks.success) {
      setActivity(tasks.data);
      if (tasks.message === "sabotaged") {
        setIsSabotaged(true);
        ToastAndroid.show("You have been sabotaged", ToastAndroid.SHORT);
        return;
      }
      setIsSabotaged(false);
      ToastAndroid.show("Tasks updated", ToastAndroid.SHORT);
    } else {
      setActivity([]);
      ToastAndroid.show(tasks.message, ToastAndroid.SHORT);
    }
  };

  return (
    <SafeAreaView>
      <View className="bg-black h-[100%] overflow-hidden flex flex-col items-center">
        <View className="flex-row justify-between items-center w-full mt-10">
          <Image
            className="h-48 w-16"
            contentFit="cover"
            source={require("../assets/leaderboard-header.svg")}
          />
          <Image
            className="h-8 w-48 mt-5"
            contentFit="cover"
            source={require("../assets/progress-header.svg")}
          />
          <Image
            className="h-48 w-16 rotate-180 mt-5"
            contentFit="cover"
            source={require("../assets/leaderboard-header.svg")}
          />
        </View>

        {isSabotaged && (
          <View className="flex-row justify-center items-center w-full mt-5">
            <Text className="text-[#dc3636] text-2xl font-bold text-center">
              You have been sabotaged
            </Text>
          </View>
        )}
        <View className="w-full h-[60%] mt-3">
          <FlatList
            data={RandomlyShuffle(activity)}
            renderItem={({ item, index }) =>
              item.status === "completed" ? (
                <TaskCompleted
                  key={index}
                  taskName={String(index + 1)}
                  taskId={item.id}
                />
              ) : (
                <TaskIncomplete
                  onPress={() => {
                    setTaskInfo({
                      ...item,
                      initialTime: 0,
                    });
                  }}
                  key={index}
                  taskName={String(index + 1)}
                  taskId={item.id}
                />
              )
            }
          />
        </View>

        <TouchableOpacity
          className="absolute flex flex-row p-3 items-center gap-x-5 bg-secondary rounded-xl justify-center bottom-5"
          onPress={updateTasks}
        >
          <Image
            className="h-8 w-8"
            contentFit="cover"
            source={require("../assets/refresh.svg")}
          />
          <Text className="text-white text-xl mr-3">Refresh</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Progress;
