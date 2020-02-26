import React from 'react';

import store from '../store'

import './Menu.css';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            turn: true,
            monster: false
        }
    }
    quit() {
        if (window.confirm('그만하게습니까?')) {
            // fetch("http://localhost:5001/logout", {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         credentials: 'include',
            //         body: JSON.stringify(this.props.user)
            //     }
            // })
            this.props.logout();
        } else {
            
        }
    }

    render() { 
        var turn = this.state.turn
        var monster = this.state.monster
        let state = store.getState()

        return ( 
            <div>
                <div className="menuBar">
                    <div
                    onClick={()=>{
                        state.toggleMenu("monster")
                    }}
                    >모험한다</div>
                    <div>휴식한다</div>
                    <div onClick={()=>this.quit()}>그만한다</div>
                </div>

                <div className="battleBar">
                    <div>공격한다</div>
                    <div>회복한다</div>
                    <div
                    onClick={()=>{
                        state.toggleMenu()
                    }}
                    >도망친다</div>
                </div>
            </div>     
        );
    }
}
 
export default Menu;