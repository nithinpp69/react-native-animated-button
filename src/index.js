import React from 'react';
import { Animated, Easing, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const AnimatedButton = (props) => {

  const animate = new Animated.Value(0);
  const animateButton = new Animated.Value(0);
  const DISTANCE = 120;
  const actionOpacity = animate.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  });
  const positionY = animate.interpolate({
    inputRange: [0, 1],
    outputRange: [0, props.direction === 'down' ? DISTANCE : -DISTANCE],
    extrapolate: 'clamp'
  });
  const scale = animate.interpolate({
    inputRange: [0, 1],
    outputRange: [0.65, 0.85],
    extrapolate: 'clamp'
  });
  const buttonScale = animateButton.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.8],
    extrapolate: 'clamp'
  });

  const animateValue = () => {
    Animated.parallel([
      Animated.sequence([
        Animated.timing(animate, {
          toValue: 1,
          duration: 600,
          easing: Easing.linear,
          useNativeDriver: true
        }),
        Animated.timing(animate, {
          toValue: 0,
          duration: 10,
          easing: Easing.linear,
          useNativeDriver: true
        })
      ]),
      Animated.sequence([
        Animated.timing(animateButton, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true
        }),
        Animated.timing(animateButton, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true
        })
      ])
    ]).start();
  };

  return (
    <>
      <Animated.View pointerEvents={'none'} style={[props.containerStyle, {position: 'absolute', alignItems: 'center', justifyContent:'center', opacity: actionOpacity,transform: [{translateY: positionY}, {scale: scale}]}]}>{props.infoContainer || props.children}</Animated.View>
      <TouchableOpacity activeOpacity={0.8} onPress={() => {animateValue(), props.onPress();}} style={props.containerStyle}>
        <Animated.View style={{transform: [{scale: buttonScale}]}}>{props.children}</Animated.View>
      </TouchableOpacity>
    </>
  );
};

AnimatedButton.propTypes = {
  onPress: PropTypes.func,
  infoContainer: PropTypes.node,
  direction: PropTypes.oneOfType(['up', 'down']),
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  containerStyle: PropTypes.object
};

AnimatedButton.defaultProps = {
  containerStyle: {},
  direction: 'up',
  onPress: ()=>{}
};

export default AnimatedButton;