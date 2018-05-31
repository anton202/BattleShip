const App = (function () {

    const checkForShip = function () {
        document.querySelector('#rivalBoard').addEventListener('click', (e) => {
            socket.emit('checkForShip', +e.target.dataset.x + (+e.target.dataset.y))
        })
    }

    return {
        init: function () {
            let roomName;
            fetch('http://localhost:8000/getSession')
                .then((res) => res.json())
                .then(data => {
                    uiCtrl.creatTable(data.positions)
                    uiCtrl.roomName(data.roomName)
                    socket.emit('openRoom', {
                        roomName: data.roomName,
                        positions: data.positions
                    });
                    fetch('http://localhost:8000/inRoom')
                        .then(res => res.json())
                        .then(data =>{
                            console.log(data)
                            if (!data.inRoom) {
                                socket.emit('joinRoom', {
                                    roomName: data.roomName,
                                    positions: data.positions
                                })
                                uiCtrl.createOpponentTable();
                            }
                        })
                })

                // fetch('http://localhost:8000/inRoom')
                //         .then(res => res.json())
                //         .then(data =>{
                //             console.log(data)
                //             if (!data.inRoom) {
                //                 socket.emit('joinRoom', {
                //                     roomName: data.roomName,
                //                     positions: data.positions
                //                 })
                //                 uiCtrl.createOpponentTable();
                //             }
                //         })

            const socket = io();
            socket.on('roomReady',(data)=>{
                if(data){
                    uiCtrl.createOpponentTable()
                }
            })
        }
    }
})()

App.init()

// socket.on('connect', function socketConnected() {

//     typeof console !== 'undefined' &&
//     console.log(
//       'Socket is now connected and globally accessible as `socket`.\n' +
//       'e.g. to send a GET request to Sails via Socket.io, try: \n' +
//       '`socket.get("/foo", function (response) { console.log(response); })`'
//     );