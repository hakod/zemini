import React from 'react';
import { Switch, Route, /* useHistory, */ Redirect } from 'react-router-dom';
// import axios from 'axios';
// import store from './store';

// Pages
import Login from './pages/Login';
import Character from './pages/Character';
import Signup from './pages/Signup';
import Ranking from './pages/Ranking';
import Battle from './pages/Battle';
import Secession from './pages/Secession';

// CSS
import './App.css';
import Shop from './pages/Shop';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: false,
      signup: false,
      character: false,
      monster: false,
      turn: true,
      use: false,
      redirect: false,
      email: false,
      password: false
      // dummyMob: [
      //   {
      //     name: '쥐',
      //     level: 1,
      //     hp: 1,
      //     att: 1,
      //     exp: 1
      //   },
      //   {
      //     name: '좀비',
      //     level: 3,
      //     hp: 1,
      //     att: 2,
      //     exp: 3
      //   },
      //   {
      //     name: '늑대인간[보스]',
      //     level: 10,
      //     hp: 1,
      //     att: 7,
      //     exp: 10
      //   }
      //   // {
      //   //   name: '쥐',
      //   //   level: 1,
      //   //   hp: 1,
      //   //   att: 1,
      //   //   exp: 1
      //   // },
      //   // {
      //   //   name: '좀비',
      //   //   level: 3,
      //   //   hp: 5,
      //   //   att: 2,
      //   //   exp: 3
      //   // },
      //   // {
      //   //   name: '늑대인간[보스]',
      //   //   level: 10,
      //   //   hp: 1,
      //   //   att: 7,
      //   //   exp: 10
      //   // }
      // ]
    };
    // 선택지 순서대로 정렬
    this.login = this.login.bind(this);
    this.isCharacter = this.isCharacter.bind(this);
    this.signup = this.signup.bind(this);
    this.create = this.create.bind(this);
    this.checkLoginRoute = this.checkLoginRoute.bind(this);
    this.generateMonster = this.generateMonster.bind(this);
    this.heal = this.heal.bind(this);
    this.moveToShop = this.moveToShop.bind(this);
    this.quit = this.quit.bind(this);
    this.attackMonster = this.attackMonster.bind(this);
    this.nextTurn = this.nextTurn.bind(this);
    this.attackCharacter = this.attackCharacter.bind(this);
    this.clearMonster = this.clearMonster.bind(this);
    this.logout = this.logout.bind(this);
    this.gotoLogin = this.gotoLogin.bind(this);
  }

  login(email, password) {
    fetch('http://13.209.6.41:5001/characters/info', {
      credentials: 'include'
    })
      .then(user => {
        return user.json();
      })
      .then(data => {
        if (data.noneCharacter) {
          this.setState({
            isLogin: true,
            email,
            password
          });
        } else {
          this.setState({
            isLogin: true,
            character: data,
            email,
            password
          });
        }
      });
  }

  isCharacter(info) {
    this.setState({
      isLogin: true,
      character: info
    });
  }

  signup() {
    this.setState(
      {
        signup: true,
        isLogin: false
      },
      () => this.setState({ signup: false })
    );
  }

  create(name) {
    if (window.confirm(`${name}(으)로 하겠습니까?`)) {
      this.setState({
        character: {
          name,
          level: 1,
          maxHp: 100,
          hp: 100,
          att: 5,
          exp: 0
        }
      });
    }
  }

  checkLoginRoute() {
    const { isLogin, character } = this.state;
    if (isLogin && character) {
      return <Redirect to="/battle" />;
    }
    if (isLogin && !character) {
      return (
        <Character
          createCharacter={this.create}
          isCharacter={this.isCharacter}
          quit={this.quit}
        />
      );
    }
    return <Login login={this.login} isLogin={isLogin} />;
  }

  generateMonster() {
    fetch('http://13.209.6.41:5001/monsters/info')
      .then(user => {
        return user.json();
      })
      .then(info => {
        this.setState({
          monster: info[Math.floor(Math.random() * info.length)]
        });
      });
    // const { dummyMob } = this.state;
    // this.setState({
    //   monster: JSON.parse(
    //     JSON.stringify(dummyMob[Math.floor(Math.random() * dummyMob.length)])
    //   )
    // });
  }

  toggleMenu(time) {
    if (time === 'monster') {
      document.querySelector('.menuBar').style.display = 'none';
      document.querySelector('.battleBar').style.display = 'block';
    } else if (document.querySelector('.menuBar').style.display === 'none') {
      document.querySelector('.menuBar').style.display = 'block';
      document.querySelector('.battleBar').style.display = 'none';
    }
    return this;
  }

  resetButton() {
    this.setState({
      use: false
    });
  }

  async heal() {
    await this.setState(prevState => ({
      character: {
        character_name: prevState.character.character_name,
        level: prevState.character.level,
        maxHp: prevState.character.maxHp,
        hp: prevState.character.hp + prevState.character.maxHp / 5,
        att: prevState.character.att,
        exp: prevState.character.exp,
        gold: prevState.character.gold,
        rankScore: prevState.character.rankScore
      }
    }));
    const { character } = this.state;
    if (character.hp >= character.maxHp) {
      this.setState(prevState => ({
        character: {
          character_name: prevState.character.character_name,
          level: prevState.character.level,
          maxHp: prevState.character.maxHp,
          hp: prevState.character.maxHp,
          att: prevState.character.att,
          exp: prevState.character.exp,
          gold: prevState.character.gold,
          rankScore: prevState.character.rankScore
        }
      }));
    }
    this.showLog('체력을 회복했습니다');
  }

  moveToShop() {
    console.log('?');
    const { save } = this.save;
    return <Shop save={save} />;
  }

  quit(toBattle) {
    if (window.confirm('그만하시겠습니까?')) {
      // fetch("http://localhost:5001/logout", {
      //     method: 'POST',
      //     headers: {
      //         'Content-Type': 'application/json',
      //         credentials: 'include',
      //         body: JSON.stringify(this.props.user)
      //     }
      // })
      this.logout();
      this.changeBattleView(toBattle);
    }
  }

  logout() {
    this.setState({
      isLogin: false,
      signup: false,
      character: false,
      email: false,
      password: false
    });
  }

  gotoLogin() {
    this.setState(
      {
        redirect: true
      },
      () => {
        this.setState({
          redirect: false
        });
      }
    );
  }

  clearMonster() {
    this.setState({
      monster: false
    });
  }

  // 몬스터 죽은 뒤 턴을 진행하기 위해 async
  async attackMonster() {
    const { character, monster } = this.state;
    this.showLog(
      `${monster.monster_name}에게 ${character.att}의 데미지를 입혔습니다.`
    );
    await this.setState(prevState => ({
      monster: {
        monster_name: prevState.monster.monster_name,
        level: prevState.monster.level,
        hp: prevState.monster.hp - prevState.character.att,
        att: prevState.monster.att,
        exp: prevState.monster.exp
      }
    }));
    const reMonster = this.state;
    if (reMonster.monster.hp <= 0) {
      this.setState(
        prevState => ({
          monster: {
            name: prevState.monster.monster_name,
            level: prevState.monster.level,
            maxHp: prevState.character.maxHp,
            hp: 0,
            att: prevState.monster.att,
            exp: prevState.monster.exp
          },
          use: true
        }),
        async () => {
          await this.setState(prevState => ({
            character: {
              id: prevState.character.id,
              character_name: prevState.character.character_name,
              level: prevState.character.level,
              maxHp: prevState.character.maxHp,
              hp: prevState.character.hp,
              att: prevState.character.att,
              exp: prevState.character.exp + prevState.monster.exp,
              gold: prevState.character.gold + prevState.monster.exp,
              rankScore: prevState.character.rankScore + prevState.monster.exp
            }
          }));
          window.setTimeout(this.win.bind(this), 1000);
        }
      );
    }
  }

  async nextTurn() {
    const { monster } = this.state;
    let { turn } = this.state;
    turn = !turn;
    if (!turn) {
      if (monster.hp > 0) {
        window.setTimeout(() => {
          this.showLog('몬스터의 차례입니다');

          window.setTimeout(() => {
            this.attackCharacter();
            const { character } = this.state;
            if (character.hp > 0) {
              window.setTimeout(() => {
                this.showLog('당신의 턴입니다.');
                this.setState({
                  use: false
                });
              }, 1000);
            }
          }, 1000);
        }, 1000);
        await this.setState({
          turn: !turn,
          use: true
        });
      }
    }
  }

  // 유저의 죽음을 확인하고 진행하기 위해 async
  async attackCharacter() {
    const { monster } = this.state;
    this.showLog(
      `${monster.monster_name}에게 ${monster.att}의 데미지를 입었습니다.`
    );
    if (monster.hp > 0) {
      await this.setState(prevState => ({
        character: {
          id: prevState.character.id,
          character_name: prevState.character.character_name,
          level: prevState.character.level,
          maxHp: prevState.character.maxHp,
          hp: prevState.character.hp - prevState.monster.att,
          att: prevState.character.att,
          exp: prevState.character.exp,
          gold: prevState.character.gold,
          rankScore: prevState.character.rankScore
        }
      }));
      const { character } = this.state;
      if (character.hp < 0) {
        this.setState(prevState => ({
          character: {
            id: prevState.character.id,
            character_name: prevState.character.character_name,
            level: prevState.character.level,
            maxHp: prevState.character.maxHp,
            hp: 0,
            att: prevState.character.att,
            exp: prevState.character.exp,
            gold: prevState.character.gold,
            rankScore: prevState.character.rankScore
          }
        }));
        window.setTimeout(this.lose.bind(this), 1000);
      }
    }
  }

  levelUp() {
    const { character } = this.state;
    if (character.exp >= character.level * 3) {
      this.showLog('레벨업!');
      this.setState(prevState => ({
        character: {
          id: prevState.character.id,
          character_name: prevState.character.character_name,
          level: prevState.character.level + 1,
          maxHp: prevState.character.maxHp + 5,
          hp: prevState.character.maxHp + 5,
          att: prevState.character.att + 1,
          exp: prevState.character.exp - prevState.character.level * 3,
          gold: prevState.character.gold,
          rankScore: prevState.character.rankScore
        }
      }));

      if (character.exp >= character.level * 3) {
        this.levelUp();
      }
    }
  }

  save() {
    const { character } = this.state;
    // console.log('캐릭터', JSON.stringify(character));
    fetch('http://13.209.6.41:5001/characters/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(character)
    });
  }

  win() {
    this.levelUp();
    this.showLog('전투에서 승리하였습니다.');
    this.clearMonster();
    this.toggleMenu();
    this.save();
    this.setState({
      use: false
    });
  }

  lose() {
    this.setState(prevState => ({
      character: {
        name: prevState.character.name,
        level: prevState.character.level,
        maxHp: prevState.character.maxHp,
        hp: prevState.character.hp,
        att: prevState.character.att,
        exp: prevState.character.exp
      }
    }));
    if (window.confirm('게임을 계속하시겠습니까?')) {
      // fetch("http://localhost:5001/user", {
      //     method: 'GET',
      //     headers: {
      //         'Content-Type': 'application/json',
      //         credentials: 'include',
      //         body: JSON.stringify(character)
      //     }
      // })
      // .then(user=>{
      //   return user.json();
      // })
      // .then((data)=>{
      //   this.setState({
      //     character:
      //   })
      // })
      this.setState(prevState => ({
        character: {
          name: prevState.character.name,
          level: prevState.character.level,
          maxHp: prevState.character.maxHp,
          hp: prevState.character.maxHp,
          att: prevState.character.att,
          exp: prevState.character.exp
        }
      }));
      this.showLog('게임을 재시작합니다.');
      this.toggleMenu();
    } else {
      this.logout();
    }
    this.clearMonster();
    this.resetButton();
    this.save();
  }

  showLog(msg) {
    const newLog = document.createElement('div');
    newLog.innerHTML = msg;

    const log = document.querySelector('.Log');
    log.prepend(newLog);

    // effect
    newLog.className = 'fadeIn';

    window.setTimeout(() => {
      newLog.className = 'fadeOut';

      window.setTimeout(() => {
        log.childNodes[log.childNodes.length - 1].remove();
      }, 2000);
    }, 10000);

    if (log.childNodes.length > 10) {
      log.childNodes[9].className = 'fadeOut';
      log.childNodes[10].style.display = 'none';
    }
    return this;
  }

  changeBattleView(toBattle) {
    const AppCss = document.querySelector('.App').style;
    console.log(toBattle);
    if (toBattle) {
      AppCss.width = '1050px';
    } else {
      AppCss.width = '800px';
    }
    return this;
  }

  render() {
    const {
      redirect,
      isLogin,
      signup,
      logout,
      character,
      monster,
      use,
      email,
      password
    } = this.state;
    return (
      <div className="App">
        <Switch>
          <Route path="/login" render={() => this.checkLoginRoute()} />
          <Route
            exact
            path="/signup"
            render={() =>
              signup ? (
                <Redirect to="/login" />
              ) : (
                <Signup
                  signup={this.signup}
                  isLogin={isLogin}
                  logout={logout}
                />
              )
            }
          />
          <Route path="/login" render={() => <Login login={this.login} />} />
          <Route
            path="/secession"
            render={() =>
              redirect ? (
                <Redirect to="/login" />
              ) : (
                <Secession gotoLogin={this.gotoLogin} />
              )
            }
          />
          <Route exact path="/ranking" render={() => <Ranking />} />
          <Route
            exact
            path="/battle"
            render={() =>
              isLogin ? (
                <Battle
                  character={character}
                  monster={monster}
                  use={use}
                  toggleMenu={this.toggleMenu}
                  generateMonster={this.generateMonster}
                  heal={this.heal}
                  moveToShop={this.moveToShop}
                  quit={this.quit}
                  attackMonster={this.attackMonster}
                  nextTurn={this.nextTurn}
                  attackCharacter={this.attackCharacter}
                  clearMonster={this.clearMonster}
                  showLog={this.showLog}
                  changeBattleView={this.changeBattleView(true)}
                  email={email}
                  password={password}
                />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/"
            render={() => {
              if (isLogin && character) {
                return <Redirect to="/battle" />;
              }
              return <Redirect to="/login" />;
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
