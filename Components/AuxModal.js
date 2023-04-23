import {
  StyleSheet,
  View,
  useWindowDimensions,
  TouchableWithoutFeedback,
  StatusBar,
} from "react-native";
import React, {
  forwardRef,
  useImperativeHandle,
  useCallback,
  useEffect,
} from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedGestureHandler,
  interpolate,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import {
  Poppins_600SemiBold,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
const AuxModal = forwardRef(
  ({ activeHeight, children, backgroundColor, backDropColor }, ref) => {
    const { height } = useWindowDimensions();
    const newActiveHeight = height - activeHeight;
    const topAnimation = useSharedValue(height);

    const expand = useCallback(() => {
      "worklet";
      topAnimation.value = withSpring(newActiveHeight, {
        damping: 100,
        stiffness: 500,
      });
    }, []);

    const close = useCallback(() => {
      "worklet";
      topAnimation.value = withSpring(height, {
        damping: 100,
        stiffness: 500,
      });
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        expand,
        close,
      }),
      [expand, close]
    );

    const animationStyle = useAnimatedStyle(() => {
      const top = topAnimation.value;
      return {
        top,
      };
    });
    const backDropAnimation = useAnimatedStyle(() => {
      const opacity = interpolate(
        topAnimation.value,
        [height, newActiveHeight],
        [0, 0.5]
      );
      const display = opacity === 0 ? "none" : "flex";
      return {
        opacity,
        display,
      };
    });

    const gestureHandler = useAnimatedGestureHandler({
      onStart: (_, ctx) => {
        ctx.startY = topAnimation.value;
      },
      onActive: (event, ctx) => {
        if (event.translationY < 0) {
          topAnimation.value = withSpring(newActiveHeight, {
            damping: 100,
            stiffness: 600,
          });
        } else {
          topAnimation.value = withSpring(ctx.startY + event.translationY, {
            damping: 100,
            stiffness: 600,
          });
        }
      },
      onEnd: (_) => {
        if (topAnimation.value > newActiveHeight + 220) {
          topAnimation.value = withSpring(height, {
            damping: 100,
            stiffness: 600,
          });
        } else {
          topAnimation.value = withSpring(newActiveHeight, {
            damping: 100,
            stiffness: 600,
          });
        }
      },
    });
    let [fontsLoaded] = useFonts({
      "Poppins-Bold": Poppins_700Bold,
      "Poppins-SemiBold": Poppins_600SemiBold,
      "Poppins-Regular": Poppins_400Regular,
    });
    if (!fontsLoaded) {
      return <AppLoading />;
    }

    return (
      <>
        <TouchableWithoutFeedback
          onPress={() => {
            close();
          }}
        >
          <Animated.View
            style={[
              styles.backDrop,
              backDropAnimation,
              { backgroundColor: backDropColor },
            ]}
          />
        </TouchableWithoutFeedback>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View
            style={[
              styles.container,
              animationStyle,
              { height: activeHeight, backgroundColor: backgroundColor },
            ]}
          >
            <View style={styles.lineContainer}>
              <View style={styles.line} />
            </View>
            {children}
          </Animated.View>
        </PanGestureHandler>
      </>
    );
  }
);

export default AuxModal;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "red",
  },
  lineContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
  line: {
    width: 50,
    height: 4,
    backgroundColor: "black",
    borderRadius: 20,
  },
  backDrop: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: "none",
  },
});
