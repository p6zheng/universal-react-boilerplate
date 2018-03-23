import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {SideNav, NavItem, NavHeader} from 'ad-react-components';
import { AgentStatus, AgentTypes, ALL } from '../../constants/rowFilters';

class Side extends Component {
  render() {
    const { onStatusFilter, onTypeFilter, status, type } = this.props;
    const { ACTIVE, DEACTIVATED, CANCELLED } = AgentStatus;
    return (
      <div className="sidebar">
        <SideNav>
          <NavHeader>
            Agent Status
          </NavHeader>
          <NavItem selected={status === ALL} onClick={() => onStatusFilter(ALL)}>
            All
          </NavItem>
          <NavItem selected={status === ACTIVE} onClick={() => onStatusFilter(ACTIVE)}>
            Active
          </NavItem>
          <NavItem selected={status === DEACTIVATED} onClick={() => onStatusFilter(DEACTIVATED)}>
            Deactivated
          </NavItem>
          <NavItem selected={status === CANCELLED} onClick={() => onStatusFilter(CANCELLED)}>
            Cancelled
          </NavItem>
          <NavHeader>
            Agent Type
          </NavHeader>
          <NavItem selected={type === "All"} onClick={() => onTypeFilter("All")}>
            All
          </NavItem>
          <NavItem selected={type === "lmi"} onClick={() => onTypeFilter("lmi")}>
            lmi
          </NavItem>
          <NavItem selected={type === "mp"} onClick={() => onTypeFilter("mp")}>
            mp
          </NavItem>
          <NavItem selected={type === "abc"} onClick={() => onTypeFilter("abc")}>
            abc
          </NavItem>
        </SideNav>
      </div>
    );
  }
}

Side.propTypes = {
  onStatusFilter: PropTypes.func.isRequired,
  onTypeFilter: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default Side;