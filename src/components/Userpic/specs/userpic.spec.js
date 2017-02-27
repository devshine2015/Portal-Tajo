/* eslint-disable func-names, prefer-arrow-callback, space-before-function-paren */

import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Userpic from '../index';

describe('<Userpic />', function () {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (fn) => (node) => fn(node, {
    context: { muiTheme },
    childContextTypes: {
      muiTheme: React.PropTypes.object.isRequired,
    },
  });

  it('should render question mark if neither src or children not specified', function() {
    const wrapper = shallowWithContext(mount)(<Userpic />);

    expect(wrapper.text()).to.contain('?');
  });

  it('should render single letter as userpic', function () {
    const username = 'test';
    const wrapper = shallowWithContext(mount)(<Userpic>{ username }</Userpic>);

    expect(wrapper.text()).to.contain('T');
  });

  it('should render first two letters of first two words', function () {
    const username = 'test user';
    const wrapper = shallowWithContext(mount)(<Userpic>{ username }</Userpic>);

    expect(wrapper.text()).to.contain('TU');
  });

  it('should render first two letters of first two words if username contain 2+ words', function () {
    const username = 'long user name';
    const wrapper = shallowWithContext(mount)(<Userpic>{ username }</Userpic>);

    expect(wrapper.text()).to.contain('LU');
  });
});
