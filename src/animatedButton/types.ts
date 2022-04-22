import React from 'react';
import { ViewStyle } from "react-native";

type Direction = 'up' | 'down';
type Position = 'left' | 'center' | 'right';

interface AnimatedButtonProps {
  /**
   * button onPress callback. Use this to handle the
   * button press event.
   */
  onPress?: () => void;
  /**
   * animation duration. This is useful if you want to
   * customize the animation duration.
   * 
   * @default 500
   */
  duration?: number;
  /**
   * button container style. Use this to style the button
   * container.
   * 
   * @default {}
   */
  style?: ViewStyle;
  /**
   * flying direction. This is useful if you want to customize
   * the flying direction. If you want to fly down, set this to
   * 'down'.
   * 
   * @default 'up'
   */
  direction?: Direction;
  /**
   * children component. Use this to provide children component to
   * the button.
   * 
   */
  children?: React.ReactNode;
  /**
   * function to render the flying container. If not given, will
   * be replaced by children element if any. This is useful if you
   * want to customize the flying container.
   * 
   * @default null;
   */
  renderFlyingContainer?: () => React.ReactNode | null;
  /**
   * enable or disable button scale animation. Use this to enable or
   * disable the button scale animation.
   * 
   * @default true
   */
  enableScaleAnimation?: boolean;
  /**
   * flying container position based on the button element. By default,
   * the flying container will be positioned center to the button element.
   * If you want to customize the flying container position, set this
   * to 'left', 'right' or 'center'.
   * 
   * @default 'center'
   */
  position?: Position;
  /**
   * enable or disable button animation. Use this to enable or
   * disable the button animation. This will remove all the animation from 
   * the button if set to false.
   * 
   * @default true
   */
  animationEnabled?: boolean;
}


export type {
  AnimatedButtonProps,
  Position,
  Direction,
};