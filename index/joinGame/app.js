const App = (function () {
   
    const joinGame = document.querySelector('.joinGame');
    const table = document.querySelector('table');
    

    const loadEventListeners = function () {
        
        table.addEventListener('click', shipsLocation.selectShip);
        table.addEventListener('click', uiCtrl.positionColor);
        table.addEventListener('click', uiCtrl.shipSelected);

        document.querySelector('#resetSelection').addEventListener('click', () => {
            location.reload();
        })

        joinGame.addEventListener('click', (e) => {
            if(shipsLocation.positions.length === 3){
                fetch('http://localhost:8000/setSession', {
                            method: 'POST', body: JSON.stringify({positions:shipsLocation.positions}), headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                            .then(()=>{}) 
                            location.href = '../battle/index.html'
            }


            // if (roomName !== undefined && shipsLocation.positions.length === 3) {
            //     location.href = '../battle/index.html'
            //     //api.createGame(roomName,position);
            //     fetch('http://localhost:8000/setSession', {
            //         method: 'POST', body: JSON.stringify({positions:shipsLocation.positions,roomName:roomName}), headers: {
            //             'Content-Type': 'application/json'
            //         }
            //     })
            //         .then(()=>{})
                 
            // }
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

