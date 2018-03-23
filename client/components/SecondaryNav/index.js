import './style.scss';
import React, { Component } from 'react';

import PropTypes from 'prop-types';

class SecondaryNav extends Component {

  isActive(tab) {
    return tab === this.props.activeTab;
  }

  getClassName(tab) {
    return this.isActive(tab) ? "secondary_nav--item active" : "secondary_nav--item"
  }

  render() {
    return (
      <div className="secondary_nav">
        <div className="wrapper">
          <nav>
            <ul className="secondary_nav--items">
              <li className={this.getClassName("status")}>Agent Status</li>
              <li className={this.getClassName("events")}>Agent Events</li>
            </ul>
          </nav>
        </div>
      </div>
    )
  }
}

SecondaryNav.propTypes = {
  activeTab: PropTypes.string.required
};

export default SecondaryNav;