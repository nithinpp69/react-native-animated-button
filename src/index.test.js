import React from 'react';
import {
  shallow
} from 'enzyme';
import AnimatedButton from './index';

describe('AnimatedButton', () => {
  describe('Rendering', () => {
    it('should match to snapshot', () => {
      const component = shallow( < AnimatedButton /> )
      expect(component).toMatchSnapshot('AnimatedButton snapshot')
    });
  });
});