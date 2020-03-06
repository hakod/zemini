/* eslint-disable global-require */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Login extends React.Component {
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
    const { login } = this.props;
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
        <div
          style={{
            position: 'absolute',
            left: '15%',
            top: '40%'
            // width: '100px',
            // height: '100px'
          }}
        >
          {/* <img className="intro" src="character.gif" alt="" /> */}
          {/* <img src={logo} alt="" /> */}
        </div>
        <h2>Zeminia</h2>

        <form
          onSubmit={e => {
            e.preventDefault();
            fetch('http://13.209.6.41:5001/users/signin', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              credentials: 'include',
              body: JSON.stringify(this.state)
            })
              .then(user => {
                return user.json();
              })
              .then(data => {
                if (data.signinCheck === 'success') {
                  window.confirm('로그인에 성공하였습니다.');
                  login();
                } else {
                  window.confirm(`${data.signinInfo}`);
                }
              });
            // login();
          }}
        >
          <p>로그인을 해주세요</p>
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

            <button type="submit">로그인</button>
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
          <Link to="/secession">회원탈퇴</Link>
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

Login.propTypes = {
  login: PropTypes.func.isRequired
};

export default Login;
