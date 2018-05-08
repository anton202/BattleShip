class UI {
    creatTable() {
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

    selectShip(event) {
        let click = 0;
        const table = document.querySelector('table');
        table.style.backgroundColor = '#cce0ff';

        table.addEventListener('click', (e) => {
            click++
            if (click <= 3) {
                e.target.style.backgroundColor = '#ccffcc';
                position.push({
                    ship: event.target.className,
                    row: e.target.dataset.row,
                    column: e.target.dataset.column
                })
            }
            if (click === 3) {
                event.target.style.backgroundColor = '#ccffcc'
            }
            console.log(position)
        })

    }

    selectShip2(event) {
        let click = 0;
        const table = document.querySelector('table');
        table.style.backgroundColor = '#cce0ff';

        table.addEventListener('click', (e) => {
            click++

            if (click <= 2) {
                e.target.style.backgroundColor = '#ccffcc';
                position.push({
                    ship: event.target.className,
                    row: e.target.dataset.row,
                    column: e.target.dataset.column
                })
            }
            if (click === 2) {
                 event.target.style.backgroundColor = '#ccffcc'
            }

        })
}

}