import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import Animated, { interpolate } from "react-native-reanimated";
import { useTimingTransition } from "react-native-redash/lib/module/v1";

const Y_DISTANCE = 120;

const AnimatedButton = ({ onPress, duration, style, direction, children, childContainer }) => {

  const containerStyle = Array.isArray(style) ? [styles.container, ...style] : [styles.container, style];
  const yTranslation = direction == "up" ? -Y_DISTANCE : Y_DISTANCE;
  const [animation, setAnimation] = useState(false);
  const transition = useTimingTransition(animation, { duration });

  const scale = interpolate(transition, {
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.8, 1],
  });

  const translateY = interpolate(transition, {
    inputRange: [0, 0.9, 1],
    outputRange: [0, yTranslation, 0]
  });

  const opacity = interpolate(transition, {
    inputRange: [0, 0.6, 0.8, 0.81, 1],
    outputRange: [0, 1, 0.5, 0, 0]
  });

  const handleOnPress = () => {
    setAnimation(prev => !prev);
    onPress();
  };

  return (
    <View>
      <Animated.View style={[containerStyle, { transform: [{ scale }] }]}>
        <TouchableOpacity style={styles.touchable} activeOpacity={0.8} onPress={handleOnPress}>
          {children}
        </TouchableOpacity>
      </Animated.View>
      <Animated.View pointerEvents={'none'} style={[styles.childContainer, { transform: [{ translateY }], opacity }]}>
        {childContainer || children || (<View style={[containerStyle, styles.touchable]} />)}
      </Animated.View>
    </View>
  );
};

AnimatedButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  duration: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  childContainer: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  direction: PropTypes.oneOf(['up', 'down']),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

AnimatedButton.defaultProps = {
  duration: 600,
  style: {},
  childContainer: null,
  direction: 'up',
  children: null
};

const styles = StyleSheet.create({
  container: {
  },
  touchable: {
    flex: 1
  },
  childContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 110,
    alignSelf: 'center'
  }
});

export default AnimatedButton;