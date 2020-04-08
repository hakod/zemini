import React from 'react';
import { Link } from 'react-router-dom';
import './Ranking.css';

class Ranking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    fetch('http://13.209.6.41:5001/characters/rank', {})
      .then(user => {
        return user.json();
      })
      .then(info => {
        this.setState({
          data: info
        });
      });
  }

  render() {
    const { data } = this.state;
    const tstyle = {
      width: '100%',
      height: '100%',
      textAlign: 'left'
    };
    return (
      <div
        style={{
          padding: '30px',
          height: '300px'
        }}
      >
        <h2
          style={{
            background: 'navy',
            fontSize: '2em',
            textAlign: 'center',
            color: 'gold',
            fontWeight: 'bold',
            padding: '5px',
            marginBottom: '5px',
            marginTop: '5px'
          }}
        >
          캐릭터 랭킹
        </h2>
        <table style={tstyle}>
          <tbody>
            <tr className="label">
              <th>순위</th>
              <th>캐릭터</th>
              <th>레벨</th>
              <th>HP</th>
              <th>공격력</th>
              <th>점수</th>
              <th>마지막 접속</th>
            </tr>
            {data.slice(0, 10).map((a, ind) => {
              const split = a.updatedAt.split('T');
              const date = split[0].split('-');
              const time = split[1].split(':');
              const format = `${date[0]}년 ${date[1]}월 ${date[2]}일 ${time[0]}시 ${time[1]}분`;
              return (
                <tr className="values" key={a.id}>
                  <th>{ind + 1}</th>
                  <th>{a.character_name}</th>
                  <th>{a.level}</th>
                  <th>{a.hp}</th>
                  <th>{a.att}</th>
                  <th>{a.rankScore}</th>
                  <th>{format}</th>
                </tr>
              );
            })}
          </tbody>
        </table>

        <Link style={{ all: 'unset', padding: '10px' }} to="/">
          <button style={{ width: 'auto' }} type="button">
            뒤로가기
          </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
