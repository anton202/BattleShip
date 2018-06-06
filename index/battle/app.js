const App = (function () {

    let roomName; // currently not in use
    const socket = io();
    let target;
    const checkForShip = function () {
        document.querySelector('#opponentBoard').addEventListener('click', (e) => {
            target = e.target;
            socket.emit('checkForShip', Number(e.target.dataset.row + e.target.dataset.column));
            socket.on('positionExist', () => {
                target.style.backgroundColor = '#7FFFD4';
            })
            socket.on('noPosition',()=>{
                target.style.backgroundColor = '#D0D0D0';
            })
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
    }


    const roomReady = function () {
        socket.on('roomReady', () => {
            uiCtrl.createOpponentTable();
             checkForShip();
        })
    }

    const positionRevealed = function(){
        socket.on('positionRevealed',(position)=>{
            uiCtrl.positionRevealed(position)
        })
    }

    return {
        init: function () {
            getUserPositions();
            roomReady();
            positionRevealed();
           
            
        }
    }
})()

App.init()

