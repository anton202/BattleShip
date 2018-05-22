const uiCtrl = (function () {
    let shipsCount = shipsLocation.positions;
    const shipLength = [3, 2, 3];
    let currentShip = 1;
    let currentPositionLength = 0;
    let shipsSelected = 0;

    const creatTable = function () {
        const battleBoard = document.querySelector('table');

        for (let x = 0; x < 5; x++) {
            const tr = document.createElement('tr');
            tr.className = 'boardBorders';

            for (let y = 0; y < 5; y++) {
                const td = document.createElement('td');
                td.dataset.row = x;
                td.dataset.column = y;
                td.className = 'boardBorders';
                tr.appendChild(td);
            }
            battleBoard.appendChild(tr);
        }

    }

    const shipSelected = function () {
        const ships = document.querySelectorAll('.ship');
        if (shipsCount.length === currentShip) {
            ships[currentShip - 1].style.backgroundColor = '#c6ecc6';
            currentShip++;
        }
    }

    const positionColor = function (e) {
        const positionLength = shipsLocation.getPosition().length;
        
        if (positionLength - currentPositionLength === 1) {
            e.target.style.backgroundColor = '#cce6ff';
            currentPositionLength++;
        }
        if (shipsCount.length === currentShip) {
            e.target.style.backgroundColor =  '#cce6ff';
            currentPositionLength = 0;
        }

    }

    return {
        creatTable,
        shipSelected,
        positionColor
    }
})()






