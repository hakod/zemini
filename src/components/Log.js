import React from 'react';

import './Log.css';

class Log extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column-reverse',
          width: '100%',
          height: '200px',
          overflow: 'hidden'
        }}
        className="Log"
      />
    );
  }
}

export default Log;
