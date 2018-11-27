import './setupTests';

import App from './App';
import React from 'react';
import { shallow } from 'enzyme';

describe('<App>', ()=> {

  it('should have nav bar and a reciept component', () => {
    let wrapper =  shallow(<App />);
    expect(wrapper.find('#navBar').length).toEqual(1);
    expect(wrapper.find('#reciept').length).toEqual(1);
  });

});
