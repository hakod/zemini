/* eslint-disable global-require */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: ''
    };
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(key) {
    return e => {
      this.setState({ [key]: e.target.value });
    };
  }

  render() {
    const { signup } = this.props;
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
            e.preventDefault();
            const { password } = this.state;
            if (
              password.match(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
              )
            ) {
              fetch('http://13.209.6.41:5001/users/signup', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state)
              }).then(data => {
                if (data.statusText === 'Conflict') {
                  window.confirm('이미 사용중인 이메일입니다.');
                }
                if (data.statusText === 'OK') {
                  window.confirm('회원가입에 성공했습니다.');
                  signup();
                }
              });
            } else {
              alert(
                '비밀번호 양식대로 작성해주세요. 8자 이상에 영어와 숫자 특수문자가 들어가야합니다.'
              );
            }
          }}
        >
          <p>회원가입을 해주세요</p>
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

            <button type="submit">회원가입</button>
          </div>
        </form>
        <Link to="/login">로그인 하기?</Link>
        <Link to="/secession">회원탈퇴</Link>
        <Link to="/ranking">랭킹보기</Link>
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

Signup.propTypes = {
  signup: PropTypes.func.isRequired
};

export default Signup;
