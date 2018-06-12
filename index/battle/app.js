const App = (function () {

    const socket = io();
    let target;
    let opponentBoard = document.querySelector('#opponentBoard');


    const checkPosition = function (e) {
        target = e.target;
        socket.emit('checkForShip', Number(e.target.dataset.row + e.target.dataset.column));
        document.querySelector('.yourTurn').style.color = '#F0F0F0';
        socket.on('positionExist', () => {
            target.style.backgroundColor = '#7FFFD4';
            document.querySelector('#opponentBoard').removeEventListener('click',checkPosition);
            socket.emit('turnFinish');
        })
        socket.on('noPosition', () => {
            target.style.backgroundColor = '#D0D0D0';
            document.querySelector('#opponentBoard').removeEventListener('click',checkPosition);
            socket.emit('turnFinish');
        })
        
    }


    const getUserPositions = function () {
        fetch('http://localhost:8000/getSession')
            .then((res) => res.json())
            .then(data => {
                uiCtrl.creatTable(data.positions)
                uiCtrl.roomName(data.roomName)
                isRoom({ roomName: data.roomName, positions: data.positions });
            })

    }


    const isRoom = function (userData) {
        socket.emit('isRoomExist', userData);
        console.log(socket.id)
    }


    const roomReady = function () {
        socket.on('roomReady', () => {
            uiCtrl.createOpponentTable();
            whosTurn()
        })
    }

    const positionRevealed = function () {
        socket.on('positionRevealed', (position) => {
            uiCtrl.positionRevealed(position)
        })
    }

    const whosTurn = function () {
        socket.on('adminTurn', () => {
            document.querySelector('#opponentBoard').addEventListener('click',checkPosition)
            document.querySelector('.yourTurn').style.color = 'green';
           
        })
        socket.on('opponentTurn',()=>{
            document.querySelector('#opponentBoard').addEventListener('click',checkPosition);
            document.querySelector('.yourTurn').style.color = 'green';
            document.querySelector('.opponent').style.color = '#F0F0F0';
        })
        socket.on('changeOpponentColor',()=>{
            document.querySelector('.opponent').style.color = 'red';
        })
    }

    const winLose = function(){
        socket.on('youWin',()=>{
            alert('YOU WIN!!!')
        })
        socket.on('youLose',()=>{
            alert('YOU LOSE !!!!!')
        })
    }

    const leftRoom = function(){
        socket.on('leftRoom',()=>{
            uiCtrl.playerLeftRoom();
        })
    }

    return {
        init: function () {
            getUserPositions();
            roomReady();
            positionRevealed();
            winLose();
            leftRoom();
        }
    }
})()

App.init()

