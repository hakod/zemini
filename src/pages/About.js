import React from 'react';
import { Link } from 'react-router-dom';

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div>만든이 : Team Zemix</div>
        <div>패치중</div>
        <Link
          style={{
            position: 'absolute',
            top: '90%',
            left: '85%',
            border: '1px solid black'
          }}
          to="/"
        >
          뒤로가기
        </Link>
      </div>
    );
  }
}

export default About;
