
const roomNameInput = document.querySelector('input');
const creatGame = document.querySelector('.createGameBtn');

const ui = new UI;
let roomName;

ui.creatTable();

roomNameInput.addEventListener('keyup', (e) => {
    roomName = e.target.value;
})

document.querySelector('table').addEventListener('click',shipsLocation.selectShip)

creatGame.addEventListener('click', () => {
    if (roomName !== '' && positions.length === 8) {
        //api.createGame(roomName,position);
        console.log('game created')
    }
})


