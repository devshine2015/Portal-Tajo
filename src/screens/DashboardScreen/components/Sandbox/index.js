import React from 'react';
import rd3 from 'react-d3-library';
import node from './d3file';

const RD3Component = rd3.Component;

const STYLES = {
  width: '100%',
  border: '1px solid #ccc',
  marginTop: 20,
};

class D3Sandbox extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      d3: '',
    };
  }

  componentDidMount() {
    // eslint-disable-next-line
    this.setState({
      d3: node,
    });
  }

  render() {
    return (
      <div style={STYLES}>
        Dashboard
        <RD3Component data={this.state.d3} />
      </div>
    );
  }
}

export default D3Sandbox;
