/* eslint-disable react/prop-types */
import React from 'react';
// import PropTypes from 'prop-types';
import Menu from '../components/Menu';
import CharacterStat from '../components/CharacterStat';
import MonsterStat from '../components/MonsterStat';
import Messages from '../components/Log';

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
      quit,
      attackMonster,
      nextTurn,
      attackCharacter,
      clearMonster,
      showLog
    } = this.props;
    return (
      <div>
        <Menu
          character={character}
          monster={monster}
          use={use}
          toggleMenu={toggleMenu}
          generateMonster={generateMonster}
          heal={heal}
          quit={quit}
          attackMonster={attackMonster}
          nextTurn={nextTurn}
          attackCharacter={attackCharacter}
          clearMonster={clearMonster}
          showLog={showLog}
        />
        <MonsterStat monster={monster} />
        <CharacterStat character={character} />
        <Messages />
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
