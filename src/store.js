import { createStore } from 'redux';

function reducer(state, action) {
    if(state === undefined) {
        return {
            islogin: false,
            monster: false,
            dummyMob: 
            [{
                name: '쥐',
                level: 1,
                hp: 15,
                power: 1,
                exp: 1
            },
            {
                name: '좀비',
                level: 3,
                hp: 50,
                power: 2,
                exp: 3
            },
            {
                name: '늑대인간[보스]',
                level: 10,
                hp: 150,
                power: 7,
                exp: 10
            }],
        toggleMenu: function(time) {
            if(time === "monster") {
              document.querySelector('.menuBar').style.display = 'none'
              document.querySelector('.battleBar').style.display = 'block'
            } else
            if(document.querySelector('.menuBar').style.display === 'none') {
              document.querySelector('.menuBar').style.display = 'block'
              document.querySelector('.battleBar').style.display = 'none'
            }
          },
        }
    }
}

const store = createStore(reducer)

export default store;