import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Chats from '../components/Chats';

class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          id: 1,
          item: 'NormalBlade',
          att: 3,
          cost: 20
        },
        {
          id: 2,
          item: 'UniqAxe',
          att: 15,
          cost: 50
        },
        {
          id: 3,
          item: 'HeroLongSword',
          att: 30,
          cost: 100
        },
        {
          id: 4,
          item: 'AncientSpear',
          att: 50,
          cost: 200
        },
        {
          id: 5,
          item: 'LegendZemixSword',
          att: 1000,
          cost: 5000
        }
      ]
    };
  }

  componentDidMount() {
    fetch('http://13.209.6.41:5001/items/info')
      .then(user => {
        return user.json();
      })
      .then(info => {
        this.setState({
          items: info
        });
      });
  }

  render() {
    const { items } = this.state;
    const { buyItem } = this.props;
    // items;
    return (
      <div>
        <h2
          style={{
            position: 'absolute',
            left: '9%'
          }}
        >
          무기상점
        </h2>
        <table
          style={{
            position: 'absolute',
            top: '10%'
          }}
        >
          <tbody>
            <tr>
              <th>무기</th>
              <th>이름</th>
              <th>공격력</th>
              <th>가격</th>
            </tr>
            {items.map((a, ind) => {
              return (
                <tr key={a.id}>
                  <th>{ind + 1}</th>
                  <th>{a.item}</th>
                  <th>{a.att}</th>
                  <th>{a.cost}</th>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div
          style={{
            position: 'absolute',
            top: '16%',
            left: '30%'
          }}
        >
          {items.map(a => {
            return (
              <div key={a.id}>
                <button
                  type="button"
                  onClick={e => buyItem(items[e.target.innerHTML[0] - 1])}
                >
                  {a.id}번 구매하기
                </button>
                <br />
              </div>
            );
          })}
        </div>
        <Link
          style={{
            position: 'absolute',
            left: '11%',
            top: '45%',
            border: '1px solid black'
          }}
          to="/battle"
        >
          뒤로가기
        </Link>
        <Chats />
      </div>
    );
  }
}

Shop.propTypes = {
  buyItem: PropTypes.func.isRequired
};

export default Shop;
