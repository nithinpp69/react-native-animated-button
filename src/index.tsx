import React, { useMemo } from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const Y_DISTANCE = 120;

type Direction = 'up' | 'down';
type Position = 'left' | 'center' | 'right';
export interface AnimatedButtonProps {
  onPress?: () => void;
  duration?: number;
  style?: StyleProp<ViewStyle>;
  direction: Direction;
  children?: React.ReactNode;
  childContainer?: React.ReactNode;
  enableScaleAnimation?: boolean;
  position: Position;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  onPress = () => { },
  duration = 500,
  style = {},
  direction = 'up',
  children = null,
  childContainer = null,
  enableScaleAnimation = true,
  position = 'center',
}: AnimatedButtonProps) => {

  const getPosition = (position) => {
    switch (position) {
      case 'left':
        return 'flex-start';
      case 'center':
        return 'center';
      case 'right':
        return 'flex-end';
    }
  };

  const containerPosition = useMemo(() => getPosition(position), [position]);

  const styleProps = {
    position: containerPosition
  };

  const yTranslation = direction == 'up' ? -Y_DISTANCE : Y_DISTANCE;

  const animatedValue = useSharedValue(0);

  const rCStyle = useAnimatedStyle(() => {
    if (!enableScaleAnimation) {
      return {};
    }
    return {
      transform: [
        {
          scale: interpolate(animatedValue.value, [0, 0.5, 1], [1, 0.8, 1]),
        },
      ],
    };
  });

  const rChStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            animatedValue.value,
            [0, 0.9, 1],
            [0, yTranslation, 0],
          ),
        },
      ],
      opacity: interpolate(
        animatedValue.value,
        [0, 0.6, 0.8, 0.81, 1],
        [0, 1, 0.5, 0, 0],
      ),
    };
  });

  const handleOnPress = () => {
    const toValue = animatedValue.value === 1 ? 0 : 1;
    animatedValue.value = withTiming(toValue, { duration });
    onPress?.();
  };

  return (
    <View>
      <Animated.View style={[rCStyle]}>
        <TouchableOpacity
          style={style}
          activeOpacity={0.8}
          onPress={handleOnPress}
        >
          {children}
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        pointerEvents={'none'}
        style={[styles(styleProps).childContainer, rChStyle]}>
        {childContainer || children || <View style={style} />}
      </Animated.View>
    </View>
  );
};

const styles = (props) => (
  StyleSheet.create({
    childContainer: {
      position: 'absolute',
      top: 0,
      zIndex: 110,
      alignSelf: props.position,
    },
  }));

export default AnimatedButton;
