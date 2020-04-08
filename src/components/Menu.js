import React from 'react';
import PropTypes from 'prop-types';

import './Menu.css';
import { Link } from 'react-router-dom';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      use,
      toggleMenu,
      generateMonster,
      heal,
      // moveToShop,
      quit,
      clearMonster,
      attackMonster,
      nextTurn,
      showLog
      // changeBattlefield
      // endBattle
    } = this.props;

    return (
      <div
        style={{
          position: 'absolute',
          right: '60%',
          bottom: '5%'
        }}
      >
        <div className="menuBar">
          <button
            disabled={use}
            type="button"
            onClick={() => {
              toggleMenu('monster');
              generateMonster();
              showLog('몬스터가 출현했습니다');
              // changeBattlefield();
            }}
          >
            모험한다
          </button>
          <br />
          <button
            type="button"
            onClick={() => {
              heal();
              nextTurn();
            }}
          >
            휴식한다
          </button>
          <br />
          {/* <button
            type="button"
            onClick={() => {
              moveToShop();
            }}
          >
            상점간다
          </button> */}

          <Link to="/shop">
            <button type="button">상점가기 </button>
          </Link>

          <br />
          <button type="button" onClick={() => quit()}>
            그만한다
          </button>
          <br />
        </div>

        <div className="battleBar">
          <button
            type="button"
            disabled={use}
            onClick={() => {
              attackMonster().then(() => {
                nextTurn();
              });
            }}
          >
            공격한다
          </button>
          <br />
          <button
            type="button"
            disabled={use}
            onClick={() => {
              heal();
              nextTurn();
            }}
          >
            회복한다
          </button>
          <br />
          <button
            type="button"
            disabled={use}
            onClick={() => {
              clearMonster();
              toggleMenu();
              // endBattle();
              showLog('도망쳤습니다');
            }}
          >
            도망친다
          </button>
        </div>
      </div>
    );
  }
}

Menu.propTypes = {
  use: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  generateMonster: PropTypes.func.isRequired,
  heal: PropTypes.func.isRequired,
  // moveToShop: PropTypes.func.isRequired,
  quit: PropTypes.func.isRequired,
  attackMonster: PropTypes.func.isRequired,
  nextTurn: PropTypes.func.isRequired,
  clearMonster: PropTypes.func.isRequired,
  showLog: PropTypes.func.isRequired
  // endBattle: PropTypes.func.isRequired
};

export default Menu;
