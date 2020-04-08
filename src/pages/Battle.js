/* eslint-disable react/prop-types */
/* eslint-disable*/
import React from 'react';
// import PropTypes from 'prop-types';
import Menu from '../components/Menu';
import CharacterStat from '../components/CharacterStat';
import MonsterStat from '../components/MonsterStat';
import Log from '../components/Log';
import Chats from '../components/Chats';
import BattleView from '../components/BattleView';

import './Battle.css';

class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      character,
      monster,
      use,
      toggleMenu,
      generateMonster,
      heal,
      moveToShop,
      quit,
      attackMonster,
      nextTurn,
      attackCharacter,
      clearMonster,
      showLog,
      // battle,
      // endBattle,
      characterAttack,
      monsterAttack,
      changeBattlefield
    } = this.props;
    const fieldRequires = {
      초원: require('../images/fieldtree.jpg'),
      사막: require('../images/fielddesert.jpg'),
      사막2: require('../images/fielddesert2.jpg'),
      픽션: require('../images/fieldfiction.jpg'),
      밤: require('../images/fieldblue.jpg'),
      동굴: require('../images/fieldcave.jpg')
    };
    const fields = ['초원', '사막', '사막2', '픽션', '밤', '동굴'];

    let field = fields[Math.floor(Math.random() * fields.length)];
    return (
      <div
        style={{
          backgroundImage: `url(${fieldRequires[field]})`
        }}
        className="Battle"
      >
        <BattleView
          monsterAttack={monsterAttack}
          characterAttack={characterAttack}
          monster={monster}
          // battle={battle}
        />
        <Menu
          character={character}
          monster={monster}
          use={use}
          toggleMenu={toggleMenu}
          generateMonster={generateMonster}
          heal={heal}
          moveToShop={moveToShop}
          quit={quit}
          attackMonster={attackMonster}
          nextTurn={nextTurn}
          attackCharacter={attackCharacter}
          clearMonster={clearMonster}
          showLog={showLog}
          // changeBattlefield={changeBattlefield}
          // endBattle={endBattle}
        />
        <MonsterStat monster={monster} />
        <CharacterStat character={character} />
        <Log />
        <Chats />
        {/* <img
          style={{
            position: 'absolute',
            border: '1px solid black'
          }}
          src={fieldRequires[field]}
          alt=""
        ></img> */}
      </div>
    );
  }
}

// Battle.propTypes = {
// quit: PropTypes.func.isRequired
// attackCharacter: PropTypes.func.isRequired
// attackMonster: PropTypes.func.isRequired
// heal: PropTypes.func.isRequired
// };

export default Battle;
