const App = (function () {
    const roomNameInput = document.querySelector('input');
    const creatGame = document.querySelector('.createGameBtn');
    const table = document.querySelector('table');
    let roomName;

    const loadEventListeners = function () {
        roomNameInput.addEventListener('keyup', (e) => {
            roomName = e.target.value;
        })
        table.addEventListener('click', shipsLocation.selectShip);
        table.addEventListener('click', uiCtrl.positionColor);
        table.addEventListener('click', uiCtrl.shipSelected);

        document.querySelector('.resetSelection').addEventListener('click', () => {
            location.reload();
        })

        creatGame.addEventListener('click', (e) => {
            if (roomName !== undefined && shipsLocation.positions.length === 3) {
                location.href = '../battle/index.html'
                
                fetch('http://localhost:8000/setSession', {
                    method: 'POST', body: JSON.stringify({positions:shipsLocation.positions,roomName:roomName}), headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'same-origin'
                })
                    .then(()=> {})
                 
            }
        })
    }

    return {
        init: function () {
            uiCtrl.creatTable();
            loadEventListeners();
            

        }
    }
})()

App.init();

