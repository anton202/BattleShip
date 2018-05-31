// fetch('http://localhost:8000/getSession')
//     .then((res) => res.json())
//     .then(data => console.log(data))


const openGamesContainer = document.querySelector('.openGamesBtn');

const socket = io();

socket.on('openRooms', (rooms) => {
    rooms.forEach(room => {
       joinRoom(room)
    })
})

socket.on('newRoomCreated',(room)=>{
    joinRoom(room);
})

openGamesContainer.addEventListener('click', (e) => {
    fetch('http://localhost:8000')
    if (e.target.className === 'join') {
        location.href = '../joinGame/index.html'
      
    }
})

function joinRoom(room){
    let joinRoomBt = document.createElement('button');
    joinRoomBt.textContent = room;
    joinRoomBt.className = 'join';
    joinRoomBt.style.display = 'block';
    openGamesContainer.appendChild(joinRoomBt)
}