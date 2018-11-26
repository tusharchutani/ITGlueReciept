import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    return (
        <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            {this.props.title}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}


Header.propTypes = {
    title: PropTypes.string.isRequired
  }

export default Header;
