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
                fetch('http://46.101.194.54:8081/setSession', {
                            method: 'POST', body: JSON.stringify({positions:shipsLocation.positions}), headers: {
                                'Content-Type': 'application/json'
                            },
                            credentials: 'same-origin'
                        })
                            .then(()=>{}) 
                            location.href = '../battle/index.html'
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

