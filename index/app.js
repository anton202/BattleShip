// fetch('http://localhost:8000/getSession')
//     .then((res) => res.json())
//     .then(data => console.log(data))


const openGamesContainer = document.querySelector('.openGamesBtn');

const socket = io();

socket.on('roomAdded',(roomName)=>{
let joinRoomBt = document.createElement('button');
joinRoomBt.textContent = roomName;
openGamesContainer.appendChild(joinRoomBt)
})