import './style.scss';
import React from 'react';

const SecondaryNav = () => (
  <div className="secondary_nav">
    <div className="wrapper">
      <nav>
        <ul className="secondary_nav--items">
          <li className="secondary_nav--item active">Agent Status</li>
          <li className="secondary_nav--item">Agent Events</li>
        </ul>
      </nav>
    </div>
  </div>
);

SecondaryNav.propTypes = {
};

export default SecondaryNav;