const ship1 = document.querySelector('.ship1');
const ship2 = document.querySelector('.ship2');
const ship3 = document.querySelector('.ship3');
const roomNameInput = document.querySelector('input');
const creatGame = document.querySelector('.createGameBtn');


const ui = new UI(ship1, ship2, ship3);
const positions = [];
let roomName;


ui.creatTable();


roomNameInput.addEventListener('keyup', (e) => {
    roomName = e.target.value;
})

ship1.addEventListener('click', checkPosition)
ship2.addEventListener('click', checkPosition)
ship3.addEventListener('click', checkPosition)

creatGame.addEventListener('click', () => {
    if (roomName !== '' && position.length === 8) {
        //api.createGame(roomName,position);
        console.log('game created')
    }
})


