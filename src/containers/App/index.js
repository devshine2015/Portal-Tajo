import React from 'react';
import { Link } from 'react-router';

class App extends React.Component {

  render() {
    return (
      <div>
        Lol
        <Link to="/another">Go to Another</Link>
      </div>
    );
  }
}

export default App;
