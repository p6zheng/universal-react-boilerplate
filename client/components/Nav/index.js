import React, { Component } from 'react';
import { SecondaryNavigation, SecondaryNavItem, SecondaryNavLink } from 'ad-react-components';

class Nav extends Component {
  render() {
    return (
      <SecondaryNavigation title="HUBBIT">
        <SecondaryNavItem>
          <SecondaryNavLink active>
            Home
          </SecondaryNavLink>
        </SecondaryNavItem>
        <SecondaryNavItem>
          <SecondaryNavLink >
            Users
          </SecondaryNavLink>
        </SecondaryNavItem>
        <SecondaryNavItem>
          <SecondaryNavLink>
            Search
          </SecondaryNavLink>
        </SecondaryNavItem>
        <SecondaryNavItem>
          <SecondaryNavLink>
            Admin
          </SecondaryNavLink>
        </SecondaryNavItem>
        <SecondaryNavItem>
          <SecondaryNavLink>
            System
          </SecondaryNavLink>
        </SecondaryNavItem>
      </SecondaryNavigation>
    );
  }
}

Nav.propTypes = {
};

export default Nav;