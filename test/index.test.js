import React from 'react';
import { shallow } from 'enzyme';
import AnimatedButton from '../src';

/*global describe*/
/*global beforeEach*/
/*global it*/
/*global expect*/
/*esliint:no-undef: "error"*/

describe('Rendering ', () => {

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<AnimatedButton />);
  });

  it('shoudld render a view', () => {
    expect(wrapper.find('View')).toHaveLength(1);
  });

});