class UI {
    constructor(ship1, ship2, ship3) {
        this.ships = [ship1, ship2, ship3];
        console.log(this.ships)
    }

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

        this.ships.forEach(button => {
            if (button.className !== event.target.className) {
                button.disabled = true;
            }
        });

        table.addEventListener('click', (e) => {
            click++
            if (click <= +event.target.dataset.clicks) {
                e.target.style.backgroundColor = '#ccffcc';
                position.push({
                    ship: event.target.className,
                    row: e.target.dataset.row,
                    column: e.target.dataset.column
                })
            }
            if (click === +event.target.dataset.clicks) {
                event.target.style.backgroundColor = '#ccffcc'
                this.ships.forEach(button => {
                    if (button.className !== event.target.className) {
                        button.disabled = false;
                    }
                });
            }
            console.log(+event.target.dataset.clicks)
        })

    }


    
}