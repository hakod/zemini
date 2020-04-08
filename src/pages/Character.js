import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Character extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(key) {
    return e => {
      this.setState({ [key]: e.target.value });
    };
  }

  render() {
    const { name } = this.state;
    const { isCharacter, quit } = this.props;
    // const { createCharacter } = this.props;
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          flexDirection: 'column',
          height: '550px'
        }}
      >
        <h2>Zeminia</h2>
        <form
          onSubmit={e => {
            e.preventDefault();
            // if (name.match(/^(?=.*[A-Za-z])[A-Za-z\d]{8,}$/)) {
            if (window.confirm(`${name}으로 하시겠습니까?`)) {
              fetch('http://13.209.6.41:5001/characters/newcharacter', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ character_name: name })
              })
                .then(user => {
                  return user.json();
                })
                .then(info => {
                  isCharacter(info);
                });
            }
            // } else {
            // alert('8자 이상에 영어 문자가 들어가야합니다.');
            // }
            // createCharacter(name);
          }}
        >
          <p>캐릭터가 없습니다 캐릭터의 이름을 지어주세요</p>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <input onChange={this.handleInput('name')} type="text" />
            <button type="submit">확인</button>
          </div>
        </form>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            height: '70px'
          }}
        >
          <Link to="/signup">아이디가 없으신가요?</Link>
          <Link to="/ranking">랭킹보기</Link>
        </div>
        <button
          type="button"
          style={{
            border: '1px solid black'
          }}
          onClick={() => {
            quit();
          }}
        >
          로그아웃하기
        </button>
        <h4>Team Zemix </h4>
      </div>
    );
  }
}

Character.propTypes = {
  // createCharacter: PropTypes.func.isRequired
  isCharacter: PropTypes.func.isRequired,
  quit: PropTypes.func.isRequired
};

export default Character;
