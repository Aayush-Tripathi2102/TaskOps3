// import {
//   View,
//   Text,
//   SafeAreaView,
//   TouchableOpacity,
//   TextInput,
//   ToastAndroid,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   Dimensions,
// } from "react-native";
// import { Image } from "expo-image";
// import * as React from "react";
// import { TaskContext } from "../context/TaskContext";
// import { UserContext } from "../context/UserContext";
// import { submitCodeForTask } from "../api/tasks";
// import { delay } from "../utils/helpers";
// import { useWindowDimensions } from "react-native";

// const TaskPage = () => {
//   const { taskInfo, setTaskInfo } = React.useContext(TaskContext);
//   const { userId } = React.useContext(UserContext);
//   if (!taskInfo) return <Text>Loading...</Text>;

//   const [code, setCode] = React.useState("");
//   const [time, setTime] = React.useState(0);
//   const [points, setPoints] = React.useState(0);
//   const { width, height } = useWindowDimensions();

//   React.useEffect(() => {
//     const initialTime = taskInfo.initialTime;
//     setTime(initialTime);
//     const interval = setInterval(() => {
//       setTime((prev) => {
//         setTaskInfo({
//           ...taskInfo,
//           initialTime: prev,
//         });
//         return prev + 1;
//       });
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const submitTask = async () => {
//     if (!code) {
//       ToastAndroid.show("Please enter code", ToastAndroid.SHORT);
//       return;
//     }
//     if (!userId) {
//       ToastAndroid.show("User not logged in", ToastAndroid.SHORT);
//       return;
//     }
//     try {
//       const res = await submitCodeForTask(userId, taskInfo.id, code, time, points);
//       if (res.success) {
//         ToastAndroid.show("Task Completed", ToastAndroid.SHORT);
//         setTaskInfo(null);
//       } else {
//         if (res.message === "You are sabotaged! Please finish that first") {
//           ToastAndroid.show(res.message + " Routing Back To Progress Page!", ToastAndroid.SHORT);
//           await delay(1000);
//           setTaskInfo(null);
//           return;
//         }
//         ToastAndroid.show(res.message, ToastAndroid.SHORT);
//       }
//     } catch (e) {
//       console.log((e as any).message);
//     }
//   };

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         style={{ flex: 1 }}
//       >
//         <ScrollView
//           contentContainerStyle={{ flexGrow: 1 }}
//           keyboardShouldPersistTaps="handled"
//         >
//           <View className="flex-1 items-center py-5">
//             {/* Header Section */}
//             <View className="w-full flex-row items-center px-5">
//               <Image
//                 className="h-24 w-20"
//                 contentFit="cover"
//                 source={require("../assets/taskpage-header.svg")}
//               />
//               <Text className="text-[5vw] text-center text-accent absolute left-[20%]">
//                 {taskInfo.name}
//               </Text>
//             </View>

//             {/* Task Description & Background Image */}
//             <View className="w-full items-center my-5">
//               <Image
//                 style={{ width: width * 0.8, height: height * 0.3 }}
//                 contentFit="cover"
//                 source={require("../assets/taskpage-bg.svg")}
//               />
//               <Text className="text-white text-center px-5 mt-2">{taskInfo.description}</Text>
//             </View>

//             {/* Timer & Progress Section */}
//             <Text className="text-[#43FFFF] text-lg">{time}s</Text>

//             {/* Progress Bar */}
//             <View className="w-full items-center">
//               <Image
//                 style={{ width: width * 0.9, height: 10 }}
//                 contentFit="cover"
//                 source={require("../assets/progress-bar.svg")}
//               />
//               <Image
//                 style={{ width: width * 0.4, height: 5, position: "absolute", left: "5%" }}
//                 contentFit="cover"
//                 source={require("../assets/progress-meter.svg")}
//               />
//             </View>

//             {/* Input Fields */}
//             <TextInput
//               secureTextEntry
//               onChangeText={setCode}
//               placeholder="Enter code"
//               className="w-[90%] mx-auto h-14 bg-white rounded-xl mt-5 shadow-2xl text-center text-xl"
//             />

//             <TextInput
//               onChangeText={(text) => setPoints(Number(text))}
//               value={points.toString()}
//               keyboardType="numeric"
//               placeholder="Enter Points"
//               className="w-[90%] mx-auto h-14 bg-white rounded-xl mt-5 shadow-2xl text-center text-xl"
//             />

//             {/* Submit Button */}
//             <TouchableOpacity
//               onPress={submitTask}
//               className="w-[50%] mx-auto h-14 bg-white rounded-xl mt-5 shadow-2xl flex justify-center"
//             >
//               <Text className="text-3xl text-center font-bold">DONE</Text>
//             </TouchableOpacity>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// export default TaskPage;
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Alert,
  Modal,
  BackHandler,
  ImageBackground, // Import ImageBackground
} from "react-native";
import { Image } from "expo-image";
import * as React from "react";
import { TaskContext } from "../context/TaskContext";
import { UserContext } from "../context/UserContext";
import { submitCodeForTask } from "../api/tasks";
import { delay } from "../utils/helpers";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
const TaskPage = () => {
  const { taskInfo, setTaskInfo } = React.useContext(TaskContext);
  const { userId } = React.useContext(UserContext);
  const navigation = useNavigation();

  if (!taskInfo) return <Text>Loading...</Text>;

  const [code, setCode] = React.useState("");
  const [time, setTime] = React.useState(0);
  const [points, setPoints] = React.useState(0);

  // Back Button Handling
  const [showModal, setShowModal] = React.useState(false);
  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        Alert.alert(
          "Task Incomplete",
          "You can visit the nearest task volunteer to close this task.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Permit Back", onPress: () => setShowModal(true) },
          ]
        );
        return true; // Prevents default back action
      }
    );

    return () => backHandler.remove();
  }, []);

  const checkPasswordAndGoBack = () => {
    if (password === "1234") {
      // Change to real validation logic
      setShowModal(false);
      setTaskInfo(null);
    } else {
      ToastAndroid.show("Incorrect password!", ToastAndroid.SHORT);
    }
  };

  React.useEffect(() => {
    const initialTime = taskInfo.initialTime;
    setTime(initialTime);
    const interval = setInterval(() => {
      setTime((prev) => {
        setTaskInfo({
          ...taskInfo,
          initialTime: prev,
        });
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const submitTask = async () => {
    if (!code) {
      ToastAndroid.show("Please enter code", ToastAndroid.SHORT);
      return;
    }
    if (!userId) {
      ToastAndroid.show("User not logged in", ToastAndroid.SHORT);
      return;
    }
    try {
      const res = await submitCodeForTask(
        userId,
        taskInfo.id,
        code,
        time,
        points
      );
      if (res.success) {
        ToastAndroid.show("Task Completed", ToastAndroid.SHORT);
        setTaskInfo(null);
      } else {
        if (res.message === "You are sabotaged! Please finish that first") {
          ToastAndroid.show(
            res.message + " Routing Back To Progress Page!",
            ToastAndroid.SHORT
          );
          await delay(1000);
          setTaskInfo(null);
          return;
        }
        ToastAndroid.show(res.message, ToastAndroid.SHORT);
      }
    } catch (e) {
      console.log((e as any).message);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/space_bg.jpg")} // Set Background Image
      style={{ flex: 1, resizeMode: "cover" }} // Ensure it covers full screen
    >
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <View className="flex-1 items-center py-5">
              {/* Header Section */}
              <View className="w-full flex-row items-center px-5">
                <Image
                  className="h-24 w-20"
                  contentFit="cover"
                  // source={require("../assets/taskpage-header.svg")}
                />
                <Text className="text-[8vw] text-center text-accent absolute left-[10%] bottom-[10%] font-joffrey">
                  {taskInfo.name}
                </Text>
              </View>

              {/* Task Description & Background Image */}
              <View className="w-full items-center my-5 relative">
                <Image
                  style={{ width: width * 0.9, height: height * 0.35 }} // Reduced size
                  contentFit="contain" // Ensures the image is fully visible without cropping
                  source={require("../assets/Voting_screen.png")}
                />
                <Text
                  className="text-white text-center px-5 absolute"
                  style={{
                    width: "80%", // Ensure text doesn't overflow
                    top: "40%", // Center vertically
                    left: "50%", // Center horizontally
                    transform: [
                      { translateX: -width * 0.4 },
                      { translateY: -height * 0.04 },
                    ], // Offset by half its own size
                    fontSize: height * 0.025,
                    // fontWeight: "bold",
                  }}
                >
                  {taskInfo.description}
                </Text>
              </View>

              {/* Timer & Progress Section */}
              <Text className="text-[#43FFFF] text-lg">{time}s</Text>

              {/* Progress Bar */}
              <View className="w-full items-center">
                <Image
                  style={{ width: width * 0.9, height: 10 }}
                  contentFit="cover"
                  source={require("../assets/progress-bar.svg")}
                />
                <Image
                  style={{
                    width: width * 0.4,
                    height: 5,
                    position: "absolute",
                    left: "5%",
                  }}
                  contentFit="cover"
                  source={require("../assets/progress-meter.svg")}
                />
              </View>

              {/* Input Fields */}
              <TextInput
                secureTextEntry
                style={styles.input}
                placeholderTextColor="rgb(255, 255, 255)"
                onChangeText={(text) => setCode(text.toLowerCase())}
                placeholder="Enter code"
                className="w-[70%] mx-auto h-14 bg-white rounded-xl mt-10 shadow-2xl text-center text-3xl font-joffrey"
              />

              <TextInput
                onChangeText={(text) => setPoints(Number(text))}
                style={styles.input}
                placeholderTextColor="rgb(255, 255, 255)"
                value={points.toString()}
                keyboardType="numeric"
                placeholder="Enter Points"
                className="w-[70%] mx-auto h-14 bg-white rounded-xl mt-5 shadow-2xl text-center text-3xl font-joffrey"
              />

              {/* Submit Button */}
              <TouchableOpacity
                onPress={submitTask}
                className="w-[50%] mx-auto h-14 bg-white rounded-xl mt-5 shadow-2xl flex justify-center"
              >
                <Text className="text-3xl text-center font-bold ">DONE</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        {/* Password Modal */}
        <Modal visible={showModal} transparent animationType="slide">
          <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
            <View className="bg-white p-5 rounded-lg">
              <Text className="text-xl text-center mb-2">
                Enter Volunteer Password
              </Text>
              <TextInput
                secureTextEntry
                className="border p-2 rounded-lg w-64"
                value={password}
                onChangeText={setPassword}
                placeholder="Enter password"
              />
              <TouchableOpacity
                onPress={checkPasswordAndGoBack}
                className="bg-blue-500 p-2 rounded-lg mt-3"
              >
                <Text className="text-white text-center">Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
        onPress={() => setShowModal(false)}
        className="bg-red-500 p-2 rounded-lg mt-2"
      >
        <Text className="text-white text-center">Cancel</Text>
      </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  input: {
    fontFamily: "Joffrey",
    alignSelf: "center",
    width: width * 0.6,
    height: height * 0.06,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 12,
    backgroundColor: "transparent",
    color: "white",
    fontSize: width * 0.055,
    paddingHorizontal: 15,
    textAlign: "center",
    marginBottom: height * 0.001,
  },
});
export default TaskPage;
