import React, { Component } from 'react';
import { SecondaryNavigation, SecondaryNavItem, SecondaryNavLink } from 'ad-react-components';

class Header extends Component {
  render() {
    return (
      <SecondaryNavigation title="nav">
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

Header.propTypes = {
};

export default Header;