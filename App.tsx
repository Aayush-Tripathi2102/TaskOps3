import React, { useEffect, useState, useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Landing from "./screens/Landing";
import Login from "./screens/Login";
import Register from "./screens/Register";
import TaskPage from "./screens/TaskPage";
import LeaderBoard from "./screens/LeaderBoard";
import Progress from "./screens/Progress";
import Sabotage from "./screens/Sabotage";
import { UserContext } from "./context/UserContext";
import { TaskContext } from "./context/TaskContext";
import { Task } from "./api/models";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync(); // Prevent splash screen from hiding

const loadFonts = async () => {
  await Font.loadAsync({
    Joffrey: require("./assets/fonts/joffrey.ttf"),
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [taskInfo, setTaskInfo] = useState<(Task & { initialTime: number }) | null>(null);
  const { getItem, setItem, removeItem } = useAsyncStorage("@user_id");
  const { getItem: getTask, setItem: setTask, removeItem: removeTask } = useAsyncStorage("@task_info");

  useEffect(() => {
    async function loadData() {
      await loadFonts();
      const id = await getItem();
      const task = await getTask();
      if (task) setTaskInfo(JSON.parse(task));
      setUserId(id);
      setFontsLoaded(true);
    }
    loadData();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync(); // Hide splash screen once fonts are loaded
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null; // Prevent rendering before fonts load

  return (
    <TaskContext.Provider
      value={{
        setTaskInfo: async (taskInfo: (Task & { initialTime: number }) | null) => {
          if (!taskInfo) {
            await removeTask();
            setTaskInfo(null);
            return;
          }
          await setTask(JSON.stringify(taskInfo));
          setTaskInfo(taskInfo);
        },
        taskInfo,
      }}
    >
      <UserContext.Provider
        value={{
          setUserId: async (userId) => {
            if (!userId) {
              await removeItem();
              setUserId(null);
              return;
            }
            await setItem(userId);
            setUserId(userId);
          },
          userId,
        }}
      >
        <NavigationContainer onReady={onLayoutRootView}>
          {userId ? (
            <HomeStack.Navigator screenOptions={{ headerShown: false }}>
              {taskInfo ? (
                <HomeStack.Screen name="TaskPage" component={TaskPage} />
              ) : (
                <HomeStack.Screen name="Home">
                  {() => (
                   <Tab.Navigator
                   screenOptions={{
                     headerShown: false,
                     tabBarStyle: {
                       backgroundColor: "#222222", // Dark-themed tab bar
                     },
                     tabBarActiveTintColor: "#FFD700", // Gold for active icons
                     tabBarInactiveTintColor: "#B0B0B0", // Soft gray for inactive icons
                   }}
                   initialRouteName={"Tasks"}
                 >
                   <Tab.Screen
                     name="Tasks"
                     component={Progress}
                     options={{
                       tabBarLabel: "Tasks",
                       tabBarIcon: ({ color, size }) => <Ionicons name="list" color={color} size={size} />,
                     }}
                   />
                   <Tab.Screen
                     name="Leaderboard"
                     component={LeaderBoard}
                     options={{
                       tabBarLabel: "Leaderboard",
                       tabBarIcon: ({ color, size }) => <Ionicons name="flag" color={color} size={size} />,
                     }}
                   />
                   <Tab.Screen
                     name="Sabotage"
                     component={Sabotage}
                     options={{
                       tabBarLabel: "Sabotage",
                       tabBarIcon: ({ color, size }) => <Ionicons name="skull" color={color} size={size} />,
                     }}
                   />
                 </Tab.Navigator>
                 
                  )}
                </HomeStack.Screen>
              )}
            </HomeStack.Navigator>
          ) : (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Landing" component={Landing} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </UserContext.Provider>
    </TaskContext.Provider>
  );
}
