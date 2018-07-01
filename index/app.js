const app = (function () {
    const openGamesContainer = document.querySelector('.openGamesBtn');
    const socket = io();

    const joinGame = function () {
        openGamesContainer.addEventListener('click', (e) => {

            if (e.target.className === 'join') {
                fetch('46.101.194.54:8081/setJoinGameRoomName', {
                    method: 'POST', body: JSON.stringify({ roomName: e.target.textContent }), headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'same-origin'
                })
                location.href = '../joinGame/index.html'

            }
        })
    }

    const ioEvents = function () {
        socket.on('openRooms', (rooms) => {
            rooms.forEach(room => {
                joinRoom(room)
            })
        })

        socket.on('newRoomCreated', (room) => {
            joinRoom(room);
        })

        socket.on('deleteRoom', (roomName) => {
            let rooms = document.querySelectorAll('button');
            rooms.forEach((room) => {
                if (room.textContent === roomName) {
                    openGamesContainer.removeChild(room);
                }
            })
        })

    }

    const joinRoom = function (room) {
        let joinRoomBt = document.createElement('button');
        joinRoomBt.textContent = room;
        joinRoomBt.className = 'join';
        joinRoomBt.style.display = 'block';
        openGamesContainer.appendChild(joinRoomBt)
    }


    return {
        init: function () {
            fetch('46.101.194.54:8081/isSession', { credentials: 'same-origin' })
                .then(() => { });
            joinGame();
            ioEvents();
        }
    }
}
    ())

app.init();








