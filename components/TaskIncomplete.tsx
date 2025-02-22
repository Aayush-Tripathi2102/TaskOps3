// import { Text, TouchableOpacity } from "react-native";
// import { Image } from "expo-image";
// import * as React from "react";

// const TaskIncomplete: React.FC<{
//   taskId: number;
//   taskName: string;
//   onPress: () => void;
// }> = ({ taskId, taskName, onPress }) => {
//   return (
//     <TouchableOpacity
//       onPress={onPress}
//       className="flex items-center justify-center w-full overflow-visible mt-5"
//     >
//       <Image
//         className="h-16 w-[90vw] rounded-2xl overflow-visible"
//         contentFit="cover"
//         source={require("../assets/leaderbottom.svg")}
//       />
//       <Text className="text-white text-lg absolute top-4 font-extrabold">
//         TASK {taskName}{" "}
//       </Text>
//     </TouchableOpacity>
//   );
// };

// export default TaskIncomplete;
import { Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import * as React from "react";
import { useFonts } from "expo-font";

const TaskIncomplete: React.FC<{
  taskId: number;
  taskName: string;
  onPress: () => void;
}> = ({ taskId, taskName, onPress }) => {
  const [fontsLoaded] = useFonts({
    AmongUs: require("../assets/fonts/amongus.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex items-center justify-center w-full overflow-visible mt-5"
    >
      <Image
        className="h-24 w-[90vw] rounded-2xl overflow-visible"
        contentFit="cover"
        source={require("../assets/new-theme/task-incomp.png")}
      />
      <Text
        className="text-black text-[30px] absolute top-9"
        style={{ fontFamily: "AmongUs" }}
      >
        TASK {taskName}
      </Text>
    </TouchableOpacity>
  );
};

export default TaskIncomplete;
