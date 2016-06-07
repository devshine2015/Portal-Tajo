import React from 'react';
import { Link } from 'react-router';

class Another extends React.Component {

  render() {
    return (
      <div>
        some another component
        <Link to="/">Got to Root</Link>
      </div>
    );
  }
}

module.exports = Another;
