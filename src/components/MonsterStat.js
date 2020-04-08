/* eslint-disable react/prop-types */
import React from 'react';
// import PropTypes from 'prop-types';

class MonsterStat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { monster } = this.props;
    return (
      <div
        style={{
          position: 'absolute',
          left: '5%',
          bottom: '5%'
        }}
      >
        <p>Monster Status</p>
        {monster ? (
          <div>
            <div>{monster.monster_name}</div>
            <div>레 벨 : {monster.level}</div>
            <div>체 력 : {monster.hp}</div>
            <div>공격력 : {monster.att}</div>
            {/* <div>경험치 : {monster.exdiv}</div> */}
          </div>
        ) : null}
      </div>
    );
  }
}

MonsterStat.propTypes = {
  // monster: PropTypes.objectOf(PropTypes.object).isRequired
};

export default MonsterStat;
