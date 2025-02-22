import React, { ReactNode } from "react";
import { View, ImageBackground, ViewStyle } from "react-native";

interface BackgroundProps {
  children: ReactNode;
}

const Background = ({ children }: BackgroundProps) => {
  return (
    <View>
      <ImageBackground
        source={require("../assets/background.png")}
        style={{ height: "100%" }}
      />
      <View
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {children}
      </View>
    </View>
  );
};

export default Background;
