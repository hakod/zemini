/* eslint-disable global-require */
/* eslint-disable react/prop-types */
import React from 'react';
import './BattleView.css';
// import PropTypes from 'prop-types';
const player = require('../images/playeridle.gif');
const playerAttack = require('../images/playerattack.gif');

const monsters = {
  쥐: require('../images/ratidle.gif'),
  좀비: require('../images/zombieidle.gif'),
  슬라임: require('../images/slime_move.gif'),
  늑대인간: require('../images/wolfidle.gif'),
  규동몬: require('../images/gyudongmon.gif')
};

const monstersAttack = {
  쥐: require('../images/ratattack.png'),
  좀비: require('../images/zombieattack.png'),
  슬라임: require('../images/slime160.png'),
  늑대인간: require('../images/wolfattack.png'),
  규동몬: require('../images/gyudongmonattack.png')
};

class BattleView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { monster, characterAttack, monsterAttack } = this.props;
    const imgStyle = {
      padding: '20px'
    };
    return (
      <div
        style={{
          position: 'absolute',
          right: '50%',
          bottom: '30%',
          width: 'auto'
        }}
      >
        {monster && monsterAttack ? (
          <img
            id="monster"
            style={imgStyle}
            src={monstersAttack[monster.monster_name]}
            alt=""
          />
        ) : (
          <img
            id="monster"
            style={imgStyle}
            src={monsters[monster.monster_name]}
            alt=""
          />
        )}
        {monster && characterAttack ? (
          <img id="player" style={imgStyle} src={playerAttack} alt="" />
        ) : (
          <img id="player" style={imgStyle} src={player} alt="" />
        )}
      </div>
    );
  }
}

export default BattleView;
