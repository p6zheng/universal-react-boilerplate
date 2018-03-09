import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import AgentTable from '../../components/AgentTable';
import styles from './styles';


class Main extends Component {

  render() {
    return (
      <div>
        <AgentTable/>
      </div>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Main);