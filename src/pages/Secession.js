/* eslint-disable global-require */
import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

class Secession extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(key) {
    return e => {
      this.setState({ [key]: e.target.value });
    };
  }

  render() {
    const { gotoLogin } = this.props;
    const intro = require('../images/character.gif');
    const logo = require('../images/zemix_LOGO.png');
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
        <div
          style={{
            position: 'absolute',
            right: '15%',
            top: '40%'
          }}
        >
          {/* <img className="intro" src="character.gif" alt="" /> */}
          <img src={intro} alt="" />
          <div>규동몬으로부터</div>
          <div>세상을 구하자!</div>
        </div>
        <div
          style={{
            position: 'absolute',
            left: '15%',
            top: '40%'
          }}
        >
          <img src={logo} alt="" />
        </div>
        <h2>Zeminia</h2>

        <form
          onSubmit={e => {
            if (window.confirm('계정을 정말로 지우시겠습니까?')) {
              e.preventDefault();
              fetch('http://13.209.6.41:5001/users/secession', {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(this.state)
              })
                .then(res => {
                  return res.json();
                })
                .then(data => {
                  console.log(data);
                  if (data.secessionCheck === 'success') {
                    window.confirm('탈퇴가 완료되었습니다.');
                  }
                  gotoLogin();
                });
            }
          }}
        >
          <p>회원탈퇴</p>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <label htmlFor="email">
              이메일
              <input
                onChange={this.handleInput('email')}
                type="text"
                name="email"
                id="email"
              />
            </label>

            <label htmlFor="password">
              비밀번호
              <input
                onChange={this.handleInput('password')}
                type="password"
                name="password"
                id="password"
              />
            </label>

            <button type="submit">탈퇴</button>
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
          <Link to="/login">로그인 하기?</Link>
          <Link to="/signup">아이디가 없으신가요?</Link>
          <Link to="/ranking">랭킹보기</Link>
        </div>
        {/* <h4>Team Zemix </h4> */}
        <Link
          style={{
            color: 'black'
          }}
          to="/about"
        >
          Team Zemix{' '}
        </Link>
      </div>
    );
  }
}

Secession.propTypes = {
  gotoLogin: PropTypes.func.isRequired
};

export default Secession;
