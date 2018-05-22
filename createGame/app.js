
const roomNameInput = document.querySelector('input');
const creatGame = document.querySelector('.createGameBtn');
const table = document.querySelector('table');
let roomName;

uiCtrl.creatTable();

roomNameInput.addEventListener('keyup', (e) => {
    roomName = e.target.value;
})

table.addEventListener('click',shipsLocation.selectShip);
table.addEventListener('click',uiCtrl.positionColor);
table.addEventListener('click',uiCtrl.shipSelected);

document.querySelector('#resetSelection').addEventListener('click',()=>{
    location.reload();
})

creatGame.addEventListener('click', (e) => {
    if (roomName !== '' && shipsLocation.positions.length === 8) {
        //api.createGame(roomName,position);
        console.log('game created')
        
    }
})


