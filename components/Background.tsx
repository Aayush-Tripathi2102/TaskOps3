import React, { ReactNode } from "react";
import { View, ImageBackground, StyleSheet, Dimensions } from "react-native";

interface BackgroundProps {
  children: ReactNode;
}

const { width, height } = Dimensions.get("window");

const Background = ({ children }: BackgroundProps) => {
  return (
    
      <ImageBackground
        source={require("../assets/background2.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
      <View style={styles.contentContainer}>
        {children}
      </View>
      </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  contentContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default Background;