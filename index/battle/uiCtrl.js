const uiCtrl = (function () {

    const creatTable = function (positions) {

        let tempArr = positions.map((position) => position.shipPosition)

        let shipsPositions = [].concat(...tempArr);

        
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

    const createOpponentTable = function(){
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
            document.querySelector('#opponentBoard').appendChild(tr);
            document.querySelector('img').style.display = 'none';
        }
    }

        const positionRevealed = function(position){
            let table = document.querySelector('.battleBoard');
            let rows = Array.from(table.rows);

            for(let i = 0; i < rows.length; i++){
                console.dir(rows[i])
                for(let x = 0; x < 5; x++){
                    
                    let cells = Array.from(rows[i].cells);
                    console.log(cells)
                    let positionToNum = Number(cells[x].dataset.row + cells[x].dataset.column);
                    console.log(positionToNum)
                    if(position === positionToNum){
                        cells[x].style.backgroundColor = 'red';
                        return;
                    }
                }
            }
        }

        const roomName = function(roomName){
            const h1 = document.querySelector('h1');
            h1.textContent = roomName;
        }


    return {
        creatTable,
        roomName,
        createOpponentTable,
        positionRevealed
    }
})();