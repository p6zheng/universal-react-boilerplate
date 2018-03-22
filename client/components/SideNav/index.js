import React, {Component} from 'react';
import {SideNav, NavItem, NavHeader} from 'ad-react-components';

class Side extends Component {
  render() {
    return (
      <div className="sidebar">
        <SideNav>
          <NavHeader>
            Agent Status
          </NavHeader>
          <NavItem selected>
            All
          </NavItem>
          <NavItem>
            Active
          </NavItem>
          <NavItem>
            Diactivated
          </NavItem>
          <NavItem>
            Cancelled
          </NavItem>
          <NavHeader>
            Agent Type
          </NavHeader>
          <NavItem>
            All
          </NavItem>
          <NavItem>
            lmi
          </NavItem>
          <NavItem>
            mp
          </NavItem>
          <NavItem>
            abc
          </NavItem>
        </SideNav>
      </div>
    );
  }
}

Side.propTypes = {};

export default Side;