import React from 'react';

import PropTypes from 'prop-types';
import store from '../store';

import './Menu.css';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      turn: true,
      use: false
      // monster: false
    };
  }

  // componentDidMount() {
  //   const { showLog } = this.props;
  //   showLog('서버에 접속하였습니다.');
  // }

  async nextTurn() {
    const { attackCharacter, showLog, monster } = this.props;
    let { turn } = this.state;
    // const turn = !turn;
    turn = !turn;
    if (!turn) {
      // toggleMenu();
      if (monster) {
        window.setTimeout(() => {
          showLog('몬스터의 차례입니다');

          window.setTimeout(() => {
            attackCharacter();
            // if (user.hp > 0) {
            window.setTimeout(() => {
              // toggleMenu();
              showLog('당신의 턴입니다.');
              this.setState({
                use: false
              });
            }, 1000);
            // }
            // this.setState({
            //   use: false
            // });
          }, 1000);
        }, 1000);
        await this.setState({
          turn: !turn,
          use: true
        });
      }
    }
  }

  quit() {
    const { logout } = this.props;
    if (window.confirm('그만하게습니까?')) {
      // fetch("http://localhost:5001/logout", {
      //     method: 'POST',
      //     headers: {
      //         'Content-Type': 'application/json',
      //         credentials: 'include',
      //         body: JSON.stringify(this.props.user)
      //     }
      // })
      logout();
    } else {
      return null;
    }
    return null;
  }

  // disable() {}

  render() {
    const state = store.getState();
    const {
      generateMonster,
      clearMonster,
      attackMonster,
      heal,
      showLog
    } = this.props;
    const { use } = this.state;

    return (
      <div>
        <div className="menuBar">
          <button
            type="button"
            onClick={() => {
              state.toggleMenu('monster');
              generateMonster();
              showLog('몬스터가 출현했습니다');
            }}
          >
            모험한다
          </button>
          <button
            type="button"
            onClick={() => {
              heal();
              this.nextTurn();
            }}
          >
            휴식한다
          </button>
          <button type="button" onClick={() => this.quit()}>
            그만한다
          </button>
        </div>

        <div className="battleBar">
          <button
            type="button"
            disabled={use}
            onClick={() => {
              attackMonster().then(() => {
                this.nextTurn();
              });
            }}
          >
            공격한다
          </button>
          <button
            type="button"
            disabled={use}
            onClick={() => {
              heal();
              this.nextTurn();
            }}
          >
            회복한다
          </button>
          <button
            type="button"
            disabled={use}
            onClick={() => {
              clearMonster();
              state.toggleMenu();
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
  logout: PropTypes.func.isRequired,
  attackCharacter: PropTypes.func.isRequired,
  generateMonster: PropTypes.func.isRequired,
  clearMonster: PropTypes.func.isRequired,
  attackMonster: PropTypes.func.isRequired,
  heal: PropTypes.func.isRequired,
  showLog: PropTypes.func.isRequired
};

export default Menu;
