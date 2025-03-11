import { Image, StyleSheet, Text } from 'react-native';
import React, { useState, useCallback, useImperativeHandle, forwardRef } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withDelay,
  withTiming,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
const Toast = forwardRef(({}, ref) => {
  const toastTopAnimation = useSharedValue(-100);
  const context = useSharedValue(0);
  const [showing, setShowing] = useState(false);
  const [toastType, setToastType] = useState('success');
  const [toastText, setToastText] = useState('');
  const [toastDuration, setToastDuration] = useState(0);
  // If you're not using react-native-bars, please use the one below by uncommenting it
  const TOP_VALUE = 60;
  // const TOP_VALUE = Platform.OS === 'ios' ? 60 : 20;
  useImperativeHandle(
    ref,
    () => ({
      show,
    }),
    [show]
  );

  const show = useCallback(
    ({ type, text, duration }) => {
      setShowing(true);
      setToastType(type);
      setToastText(text);
      setToastDuration(duration);
      toastTopAnimation.value = withSequence(
        withTiming(TOP_VALUE),
        withDelay(
          duration,
          withTiming(-100, null, (finish) => {
            if (finish) {
              runOnJS(setShowing)(false);
            }
          })
        )
      );
    },
    [TOP_VALUE, toastTopAnimation]
  );

  const animatedTopStyles = useAnimatedStyle(() => {
    return {
      top: toastTopAnimation.value,
    };
  });

  const pan = Gesture.Pan()
    .onBegin(() => {
      context.value = toastTopAnimation.value;
    })
    .onUpdate((event) => {
      if (event.translationY < 100) {
        toastTopAnimation.value = withSpring(context.value + event.translationY, {
          damping: 600,
          stiffness: 100,
        });
      }
    })
    .onEnd((event) => {
      if (event.translationY < 0) {
        toastTopAnimation.value = withTiming(-100, null, (finish) => {
          if (finish) {
            runOnJS(setShowing)(false);
          }
        });
      } else if (event.translationY > 0) {
        toastTopAnimation.value = withSequence(
          withTiming(TOP_VALUE),
          withDelay(
            toastDuration,
            withTiming(-100, null, (finish) => {
              if (finish) {
                runOnJS(setShowing)(false);
              }
            })
          )
        );
      }
    });

  return (
    <>
      {showing && (
        <GestureDetector gesture={pan}>
          <Animated.View
            style={[
              styles.toastContainer,
              toastType === 'info'
                ? styles.infoToastContainer
                : toastType === 'success'
                  ? styles.successToastContainer
                  : toastType === 'warning'
                    ? styles.warningToastContainer
                    : styles.errorToastContainer,
              animatedTopStyles,
            ]}>
            {
              toastType != 'info' &&
              <Image
                source={
                  toastType === 'success'
                    ? require('../assets/images/SuccessIcon.png')
                    : toastType === 'warning'
                      ? require('../assets/images/WarningIcon.png')
                      : require('../assets/images/ErrorIcon.png')
                }
                style={styles.toastIcon}
              />
            }
            {
              toastType === 'info' &&
              <Feather name="info" size={24} color="#0d6efd" />
            }
            <Text
              style={[
                styles.toastText,
                toastType === 'info'
                  ? styles.infoToastText
                  :
                toastType === 'success'
                  ? styles.successToastText
                  : toastType === 'warning'
                    ? styles.warningToastText
                    : styles.errorToastText,
              ]}>
              {toastText}
            </Text>
          </Animated.View>
        </GestureDetector>
      )}
    </>
  );
});

export default Toast;

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: 0,
    width: '90%',
    padding: 10,
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  toastText: {
    marginLeft: 14,
    fontSize: 16,
  },
  toastIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  successToastContainer: {
    backgroundColor: '#def1d7',
    borderColor: '#1f8722',
  },
  warningToastContainer: {
    backgroundColor: '#fef7ec',
    borderColor: '#f08135',
  },
  errorToastContainer: {
    backgroundColor: '#fae1db',
    borderColor: '#d9100a',
  },
  infoToastContainer: {
    backgroundColor: '#e7f0ff',
    borderColor: '#0d6efd',
  },
  successToastText: {
    color: '#1f8722',
  },
  warningToastText: {
    color: '#f08135',
  },
  errorToastText: {
    color: '#d9100a',
  },
  infoToastText: {
    color: '#0d6efd',
  },
});
