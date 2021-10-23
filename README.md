# react-native-animated-button

[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()
![platforms](https://img.shields.io/badge/platforms-Android%20%7C%20iOS-brightgreen.svg?style=flat&colorB=191A17)
[![Version](https://img.shields.io/npm/v/@nithinpp69/react-native-animated-button.svg)](https://www.npmjs.com/package/@nithinpp69/react-native-animated-button)
[![npm](https://img.shields.io/npm/dt/@nithinpp69/react-native-animated-button.svg)](https://www.npmjs.com/package/@nithinpp69/react-native-animated-button)

A simple and customizable React Native animated button component. 
## Demo

❤️ [Expo Snack](https://snack.expo.dev/@nithinpp69/react-native-animated-button)

![](demo.gif)
## Prerequisites

 ⚠️ Peer Dependencies

 * [react-native-reanimated-v2](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/)

This component has a peer dependency on react-native-reanimated-v2. react-native-reanimated-v2 has to be installed and linked into your project.
Follow [react-native-reanimated-v2](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/) to install the dependency.

## Installation

Supported version: react-native >= 0.59.0

  ```
  npm install @nithinpp69/react-native-animated-button
  ```
  
  or
  
  ```
  yarn add @nithinpp69/react-native-animated-button
  ```
## Example
```
import AnimatedButton from '@nithinpp69/react-native-animated-button';

....

<Text>Without Custom popup</Text>
<AnimatedButton
  direction="up"
>
  <Ionicons name='ios-heart' color='red' size=30>
</AnimatedButton>


<Text>With Custom popup</Text>
<AnimatedButton
  direction="up"
  infoContainer={
    <Text style={{color: 'white', fontSize: 14}}> +1 </Text>
  }
>
  <Ionicons name='ios-heart' color='red' size=30>
</AnimatedButton>


```
## Props

| Prop | Description | Type | Default Value | Required |
| :---:|:-----------:|:----:|:-------------:|:--------:|
| onPress | button onPress callback | Function | () => {} | false |
| duration | animation duration | Number | 500 | false |
| style | button container style | Object | {} | false |
| direction | flying direction | 'up' or 'down' | 'up' | false |
| children | children componenent | React.ReactNode | null | false |
| renderFlyingContainer | function to render the flying container. If not given, will be replaced by children element | Function | () => null | false |
| enableScaleAnimation | enable or disable button scale animation | Boolean | true | false |
| position | flying container position based on the button element | 'left' or 'center' or 'right' | 'center' | false |
| animationEnabled | enable or disable button animation | Boolean | true | false |



