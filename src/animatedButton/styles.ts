import { FlexAlignType, StyleSheet } from 'react-native';

type StyleProps = {
  position: FlexAlignType;
};

const styles = (props: StyleProps) => {
  return StyleSheet.create({
     childContainer: {
       position: 'absolute',
       top: 0,
       zIndex: 110,
       alignSelf: props.position,
     },
  });
 };

export default styles;