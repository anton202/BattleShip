const App = (function () {

    let roomName; // currently not in use
    const socket = io();

    const checkForShip = function () {
        document.querySelector('#rivalBoard').addEventListener('click', (e) => {
            socket.emit('checkForShip', +e.target.dataset.x + (+e.target.dataset.y))
        })
    }


    const getUserPositions = function () {
        fetch('http://localhost:8000/getSession')
            .then((res) => res.json())
            .then(data => {
                console.log(data)
                roomName = data.roomName;
                uiCtrl.creatTable(data.positions)
                uiCtrl.roomName(data.roomName)
                isRoom({ roomName: data.roomName, positions: data.positions });
            })

    }


    const isRoom = function (userData) {
        socket.emit('isRoomExist', userData);
       
    }

    return {
        init: function () {
            getUserPositions();
        }
    }
})()

App.init()

