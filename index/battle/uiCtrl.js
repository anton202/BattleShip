const uiCtrl = (function () {

    const creatTable = function (positions) {

        let tempArr = positions.map((position) => position.shipPosition)

        let shipsPositions = [].concat(...tempArr);

        console.log(shipsPositions)
        const battleBoard = document.querySelector('table');

        for (let x = 0; x < 5; x++) {
            const tr = document.createElement('tr');
            tr.className = 'boardBorders';

            for (let y = 0; y < 5; y++) {
                const td = document.createElement('td');
                td.dataset.row = x;
                td.dataset.column = y;
                if(shipsPositions.includes(Number(x+''+y))){
                    console.log(x+y)
                    td.style.backgroundColor = '#cce6ff';
                }
                td.className = 'boardBorders';
                tr.appendChild(td);
            }
            battleBoard.appendChild(tr);
        }

    }


        const roomName = function(roomName){
            const h1 = document.querySelector('h1');
            h1.textContent = roomName;
        }


    return {
        creatTable,
        roomName
    }
})();