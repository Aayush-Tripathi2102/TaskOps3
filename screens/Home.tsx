import { View, Text, TouchableOpacity, ToastAndroid } from "react-native";
import React, { useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Task } from "../api/models";
import { getTasksForTeam } from "../api/tasks";

export default function Home() {
  const { userId, setUserId } = React.useContext(UserContext);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    (async function () {
      if (!userId) {
        return;
      }
      const t = await getTasksForTeam(userId);
      setTasks(t.data);
    })();
  }, []);
  return (
    <View className="flex-1">
      <Text>Home</Text>
      <TouchableOpacity
        className="mx-auto my-auto bg-red-500 p-2 rounded-md"
        onPress={() => {
          setUserId(null);
        }}
      >
        <Text>Logout</Text>
      </TouchableOpacity>

      <Text className="text-center text-3xl text-black">
        {JSON.stringify(tasks.map((t) => t.name))}
      </Text>
    </View>
  );
}