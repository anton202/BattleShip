
const openGamesContainer = document.querySelector('.openGamesBtn');
const socket = io();

openGamesContainer.addEventListener('click', (e) => {
    
    if (e.target.className === 'join') {
        fetch('http://localhost:8000/setJoinGameRoomName', {
            method: 'POST', body: JSON.stringify({roomName:e.target.textContent}), headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        })
        location.href = '../joinGame/index.html'
      
    }
})


socket.on('openRooms', (rooms) => {
    rooms.forEach(room => {
       joinRoom(room)
    })
})

socket.on('newRoomCreated',(room)=>{
    joinRoom(room);
})

socket.on('deleteRoom',(roomName)=>{
    let rooms = document.querySelectorAll('button');
    rooms.forEach((room)=>{
        if(room.textContent === roomName){
            openGamesContainer.removeChild(room);
        }
    })
})

function joinRoom(room){
    let joinRoomBt = document.createElement('button');
    joinRoomBt.textContent = room;
    joinRoomBt.className = 'join';
    joinRoomBt.style.display = 'block';
    openGamesContainer.appendChild(joinRoomBt)
}