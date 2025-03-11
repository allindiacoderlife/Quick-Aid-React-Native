import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
  Image,
} from "react-native";
import React from "react";
import Animated, {
  AnimatedRef,
  SharedValue,
  interpolateColor,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Link, useRouter } from "expo-router";
const CustomButton = ({flatListRef, flatListIndex, dataLength, x}) => {
    const {width: SCREEN_WIDTH} = useWindowDimensions();
    const router = useRouter();

    const buttonAnimationStyle = useAnimatedStyle(() => {
        return {
          width:
            flatListIndex.value === dataLength - 1
              ? withSpring(140)
              : withSpring(60),
          height: 60,
        };
      });
    
      const arrowAnimationStyle = useAnimatedStyle(() => {
        return {
          width: 30,
          height: 30,
          opacity:
            flatListIndex.value === dataLength - 1 ? withTiming(0) : withTiming(1),
          transform: [
            {
              translateX:
                flatListIndex.value === dataLength - 1
                  ? withTiming(100)
                  : withTiming(0),
            },
          ],
        };
      });
    
      const textAnimationStyle = useAnimatedStyle(() => {
        return {
          opacity:
            flatListIndex.value === dataLength - 1 ? withTiming(1) : withTiming(0),
          transform: [
            {
              translateX:
                flatListIndex.value === dataLength - 1
                  ? withTiming(0)
                  : withTiming(-100),
            },
          ],
        };
      });

    const animatedColor = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
          x.value,
          [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
          ['#005b4f', '#1e2169', '#F15937'],
        );
    
        return {
          backgroundColor: backgroundColor,
        };
      });
  return (
    <TouchableWithoutFeedback
        onPress={() => {
            if (flatListIndex.value < dataLength - 1) {
                flatListRef.current?.scrollToIndex({index: flatListIndex.value + 1});
              } else {
                router.push("auth/user-choice");
              }
        }}
    >
      <Animated.View
        style={[styles.container, buttonAnimationStyle, animatedColor]}>
        <Animated.Text style={[styles.textButton, textAnimationStyle]}>
          Get Started
        </Animated.Text>
        <Animated.Image
          source={require('../../assets/images/ArrowIcon.png')}
          style={[styles.arrow, arrowAnimationStyle]}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1e2169",
    padding: 10,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    width: 60,
    height:60,
  },
  arrow: {
    position: "absolute",
  },
  textButton: { color: "white", fontSize: 16, position: "absolute" },
});
