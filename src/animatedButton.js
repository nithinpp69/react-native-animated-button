import React, { Component } from 'react';
import {
  View,
  Animated,
  Easing,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';

class AnimatedButton extends Component {
  constructor(props) {
    super(props);
    this.animate = new Animated.Value(0);
    this.animateButton = new Animated.Value(0);
    this.actionOpacity = this.animate.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    this.positionY = this.animate.interpolate({
      inputRange: [0, 1],
      outputRange: [0, this.props.direction === 'bottom' ? 100 : -100],
      extrapolate: 'clamp'
    })
    this.scale = this.animate.interpolate({
      inputRange: [0, 1],
      outputRange: [0.65, 0.85],
      extrapolate: 'clamp'
    })
    this.buttonScale = this.animateButton.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.8],
      extrapolate: 'clamp'
    })
  }

  animateValue() {
    Animated.parallel([
      Animated.sequence([
        Animated.timing(this.animate, {
          toValue: 1,
          duration: 600,
          easing: Easing.linear,
          useNativeDriver: true
        }),
        Animated.timing(this.animate, {
          toValue: 0,
          duration: 10,
          easing: Easing.linear,
          useNativeDriver: true
        })
      ]),
      Animated.sequence([
        Animated.timing(this.animateButton, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true
        }),
        Animated.timing(this.animateButton, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true
        })
      ])
    ]).start();
  }

  render() {
    return (
      <View>
        <TouchableOpacity activeOpacity={0.8} onPress={() => { this.animateValue(), this.props.onPress() }}>
          <Animated.View style={[this.props.containerStyle, { transform: [{ scale: this.buttonScale }] }]}>
            {
              this.props.children
            }
          </Animated.View>
        </TouchableOpacity>
        <Animated.View style={[{ opacity: this.actionOpacity, position: 'absolute', top: 0, alignSelf: 'center', transform: [{ translateY: this.positionY }, { scale: this.scale }] }]}>
          {
            this.props.infoContainer || this.props.children
          }
        </Animated.View>
      </View>
    );
  }
}
AnimatedButton.propTypes = {
  onPress: PropTypes.func,
  containerStyle: PropTypes.object,
  infoContainer: PropTypes.element,
  direction: PropTypes.oneOf(['top', 'bottom']),
}

export default AnimatedButton;