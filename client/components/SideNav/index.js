import React, {Component} from 'react';
import {SideNav, NavItem, NavHeader} from 'ad-react-components';

class Side extends Component {
  render() {
    return (
      <SideNav>
        <NavHeader>
          Support
        </NavHeader>
        <NavItem>
          <a href="#/superuser/support#network-catalog" className="custom-url-classname">
            Network Catalog
          </a>
        </NavItem>
        <NavItem>
          <a href="#/superuser/support#import-manager" className="custom-url-classname">
            Import Catalog
          </a>
        </NavItem>
        <NavItem selected>
          <a href="#/superuser/support#express-catalog" className="custom-url-classname">
            Express Catalog
          </a>
        </NavItem>
        <NavHeader>
          Marketplace Management
        </NavHeader>
        <NavItem>
          <a href="#/superuser/support/marketplace/ms-csp" className="custom-url-classname">
            Microsoft CSP
          </a>
        </NavItem>
      </SideNav>
    );
  }
}

Side.propTypes = {};

export default Side;