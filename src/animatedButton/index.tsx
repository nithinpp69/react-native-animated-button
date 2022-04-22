import React, { useCallback, useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import type { FlexAlignType } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import type { AnimatedButtonProps, Position } from './types';
import styles from './styles';

const Y_DISTANCE: number = 120;

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  onPress = () => null,
  duration = 500,
  style = {},
  direction = 'up',
  children = null,
  renderFlyingContainer = () => null,
  enableScaleAnimation = true,
  position = 'center',
  animationEnabled = true,
}: AnimatedButtonProps) => {
  const animatedValue: Animated.SharedValue<number> = useSharedValue(0);

  const getPosition = useCallback((value: Position): FlexAlignType => {
    switch (value) {
      case 'left':
        return 'flex-start';
      case 'center':
        return 'center';
      case 'right':
        return 'flex-end';
      default:
        return 'center';
    }
  }, []);

  const containerPosition = useMemo(() => getPosition(position), [position]);

  const styleProps = useMemo(
    () => ({
      position: containerPosition,
    }),
    [containerPosition]
  );

  const yTranslation: number = useMemo(
    () => (direction == 'up' ? -Y_DISTANCE : Y_DISTANCE),
    [direction]
  );

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
            [0, yTranslation, 0]
          ),
        },
      ],
      opacity: interpolate(
        animatedValue.value,
        [0, 0.6, 0.8, 0.81, 1],
        [0, 1, 0.5, 0, 0]
      ),
    };
  });

  const handleOnPress = useCallback(() => {
    if (animationEnabled)
      animatedValue.value = withTiming(1, { duration }, (isFinished) => {
        if (isFinished) {
          animatedValue.value = 0;
        }
      });
    onPress?.();
  }, [animationEnabled, duration, onPress]);

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
        style={[styles(styleProps).childContainer, rChStyle]}
      >
        {renderFlyingContainer?.() || children || <View style={style} />}
      </Animated.View>
    </View>
  );
};

export default AnimatedButton;
