import React from 'react';
import { Link } from 'react-router';

class App extends React.Component {

  render() {
    return (
      <div>
        app root
        <Link to="/another">Got to Another</Link>
      </div>
    );
  }
}

module.exports = App;
