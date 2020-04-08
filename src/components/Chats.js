/* eslint-disable*/
import React from 'react';
import io from 'socket.io-client';

import './Chats.css';

// const hostDev = 'http://localhost:5001';
const hostDev = 'http://13.209.6.41:5001';
const hostProd = 'http://13.209.6.41:5001';
// let socket = null;
let socket = true;

class Chats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elTextMessage: '',
      elInputRoomName: '',
      elSelectValue: 'info',
      elInputRoomNameDisplay: 'inline-block',
      elInputRoomNameRequired: true,
      elSpanRefreshText: '',

      // 중복 없는 options 에 방 이름들
      uinqRoomsData: [],

      // 선택한 option 방 이름에 해당하는 데이터들
      selectedRoomData: []
    };

    this.onChangeMessage = this.onChangeMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.onChangeSelectOption = this.onChangeSelectOption.bind(this);
    this.onChangeRoomName = this.onChangeRoomName.bind(this);
    this.emitChatsDataFilterRoom = this.emitChatsDataFilterRoom.bind(this);
    this.onChageSelectRoom = this.onChageSelectRoom.bind(this);
    this.onChangeAllMessages = this.onChangeAllMessages.bind(this);
    // 테스트를 위해 만들어 놓은 메서드 (추후에 지워야 함)
    // this.testSession = this.testSession.bind(this);
  }

  componentDidMount() {
    socket = io.connect(hostDev, { path: '/socket.io' });
    // 실제 서비스할 때는
    // (!this.props.isLogin) ===> this.props.isLogin 으로 바꾸어야 함
    socket = io.connect(hostDev, { path: '/socket.io' });

    socket.emit('uniqRoomInit').on('uniqRoomInit', data => {
      this.setState({ uinqRoomsData: data });
    });

    this.onChangeAllMessages();

    socket.on('filterRoom', data => {
      this.setState({ selectedRoomData: data });
    });

    socket.on('uniqRooms', data => {
      console.log(data);
      this.setState({ uinqRoomsData: data });
    });

    socket.on('messageSuccess', data => {
      console.log(data);
    });

    socket.on('notSession', data => {
      console.log(data);
    });

    socket.on('notCharacter', data => {
      console.log(data);
    });

    socket.on('emptyData', data => {
      console.log(data);
    });
  }

  onChangeSelectOption(e) {
    this.setState({ elSelectValue: e.target.value });
  }

  onChangeAllMessages() {
    socket.emit('allMessages').on('allMessages', data => {
      this.setState({ selectedRoomData: data });
    });
  }

  onChangeMessage(e) {
    this.setState({ elTextMessage: e.target.value });
  }

  onChangeRoomName(e) {
    this.setState({ elInputRoomName: e.target.value });
  }

  emitChatsDataFilterRoom(e) {
    if (socket !== null) {
      const roomname = e.target.value;
      socket.emit('filterRoom', roomname);
    }
  }

  sendMessage(selectedValue, roomnameValue, messageValue) {
    if (socket !== null) {
      if (roomnameValue === 'info') {
        alert('죄송합니다, 방 이름으로 info 는 사용할 수 없습니다~');
        return;
      }
      socket.emit('sendMessage', {
        message: messageValue,
        roomname: roomnameValue || selectedValue
      });
    } else {
      console.log('login이 되어 있지 않습니다');
    }
  }

  onChageSelectRoom(roomname) {
    if (this.state.elSelectValue === 'info') {
      this.setState({ elSelectValue: roomname });
    }
  }

  // testSession() {
  //   const { email, password } = this.props;
  //   // fetch(hostDev + '/users/signin', {
  //   fetch('http://13.209.6.41:5001/users/signin', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       email: 'Zeminia@co.kr',
  //       password: '!1zeminia'
  //     }),
  //     headers: { 'Content-Type': 'application/json' },
  //     credentials: 'include'
  //   })
  //     .then(res => res.json())
  //     .then(json => {
  //       console.log(json);
  //     });
  // }

  render() {
    return (
      <div className="Chats">
        <div
          className="ChatsTitle"
          // style={{
          //   fontSize: '20px',
          //   textAlign: 'center'
          // }}
        >
          Chats~ 실시간 채팅
        </div>
        {/* <button onClick={this.testSession}>
          테스트를 위한 세션 연결 (클릭 후 리로딩을 해야 해요)
        </button> */}
        {/* <hr /> */}
        <form
          // style={{
          //   border: '1px solid black'
          // }}
          onSubmit={e => {
            e.preventDefault();
            this.sendMessage(
              this.state.elSelectValue,
              this.state.elInputRoomName,
              this.state.elTextMessage
            );
            this.onChageSelectRoom(this.state.elInputRoomName);
            this.setState({ elTextMessage: '', elInputRoomName: '' });
          }}
        >
          <fieldset
            className="ChatsForm"
            // style={{
            //   position: 'absolute',
            //   bottom: '0%',
            //   border: '1px solid black',
            //   width: '220px'
            // }}
          >
            <legend>Chats</legend>
            <div>
              <span>Channel: </span>
              <select
                value={this.state.elSelectValue}
                onChange={e => {
                  this.onChangeSelectOption(e);
                  this.emitChatsDataFilterRoom(e);
                }}
              >
                <option value="info">---채널을 선택하세요---</option>
                <option value="Zeminia">Zeminia</option>
                {this.state.uinqRoomsData.map((room, idx) => {
                  if (room !== 'Zeminia') {
                    return (
                      <option key={idx} value={room}>
                        {room}
                      </option>
                    );
                  }
                  return null;
                })}
              </select>
              <button onClick={this.onChangeAllMessages}>All Messages</button>
              <span className="refresh_Word"></span>
            </div>
            {/* <hr></hr> */}
            <div>
              <input
                type="text"
                value={this.state.elInputRoomName}
                onChange={e => {
                  this.onChangeRoomName(e);
                }}
                style={{
                  display:
                    // this.state.elSelectValue === 'info'
                    //   ? 'inline-block'
                    //   : 'none'
                    'none'
                }}
                required={this.state.elSelectValue !== 'info' ? false : true}
                placeholder="방 이름을 적어주세요"
              />
              {/* <br /> */}
              <p>
                <label htmlFor="chats_text">Message</label>
              </p>
              <input
                className="ChatsInput"
                id="chats_text"
                type="text"
                // style={{ width: '200px' }}
                value={this.state.elTextMessage}
                onChange={e => {
                  this.onChangeMessage(e);
                }}
              />
            </div>
            <input type="submit" value="전송" />
          </fieldset>
        </form>
        <div
          className="ChatsView"
          // style={{
          //   display: 'flex',
          //   flexDirection: 'column-reverse',
          //   borderTop: '1px solid black',
          //   borderBottom: '1px solid black',
          //   height: '375px',
          //   overflow: 'hidden'
          // }}
        >
          {this.state.selectedRoomData
            .sort((a, b) => {
              return b.id - a.id;
              // return a.id - b.id;
            })
            // .reverse()
            .map(item => {
              let split = item.createdAt.split('T');
              let date = split[0].split('-');
              let time = split[1].split(':');
              let format = `${date[0]}년 ${date[1]}월 ${date[2]}일 ${time[0]}시 ${time[1]}분`;
              return (
                <div key={item.id}>
                  <div>character: {item.character}</div>
                  <div>message: {item.message}</div>
                  <div style={{ fontSize: '5px' }}>{format}</div>
                  <hr />
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default Chats;
