/* eslint-disable global-require */
import React from 'react';
import { Link } from 'react-router-dom';

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const player = require('../images/playeridle.gif');
    const monsters = {
      쥐: require('../images/ratidle.gif'),
      좀비: require('../images/zombieidle.gif'),
      슬라임: require('../images/moveslime.gif'),
      늑대인간: require('../images/wolfidle.gif'),
      규동몬: require('../images/gyudongmon.gif'),
      제믹스팀: require('../images/zemixTeam.gif')
    };

    return (
      <div
        style={{
          // backgroundColor: 'black',
          height: '600px'
        }}
      >
        <h4
          style={{
            // position: 'absolute',
            textAlign: 'center'
          }}
        >
          게임 소개
        </h4>
        <div
          style={{
            // color: 'white',
            textAlign: 'center'
          }}
        >
          [마왕] 규동몬의 횡포로 세계가 위험에 빠졌습니다. 전설의 제미소드를
          완성하고 규동몬을 처치해주세요!
        </div>
        <h4
          style={{
            // position: 'absolute',
            textAlign: 'center'
          }}
        >
          등장인물 소개
        </h4>
        <div
          style={{
            position: 'absolute',
            top: '20%'
            // left: '10%'
          }}
        >
          <img src={player} alt="" />
          <img src={monsters['쥐']} alt="" />
          <img src={monsters['좀비']} alt="" />
          <img src={monsters['슬라임']} alt="" />
          <img src={monsters['늑대인간']} alt="" />
          <img src={monsters['규동몬']} alt="" />
          <div />
        </div>
        <h4
          style={{
            position: 'absolute',
            textAlign: 'center',
            top: '70%',
            left: '45%'
          }}
        >
          제작자의 말
        </h4>
        <div
          style={{
            position: 'absolute',
            // left: '%',

            bottom: '-3%'
            // color: 'white'
          }}
        >
          <img src={monsters['제믹스팀']} alt="" />
        </div>
        <div
          style={{
            position: 'absolute',
            top: '80%',
            left: '20%'
          }}
        >
          안녕하세요, 팀 Zemix입니다.
        </div>
        <div
          style={{
            position: 'absolute',
            top: '85%',
            left: '20%'
          }}
        >
          재밌는~ 게임을 만들고자 이 게임을 만들게 되었습니다.
        </div>
        <div
          style={{
            position: 'absolute',
            top: '90%',
            left: '20%'
          }}
        >
          첫 작품이므로 부족함이 많지만 재밌게~ 플레이해주세요!
        </div>
        <Link
          style={{
            // color: 'white',
            position: 'absolute',
            top: '90%',
            left: '85%',
            border: '1px solid black'
          }}
          to="/"
        >
          뒤로가기
        </Link>
      </div>
    );
  }
}

export default About;
