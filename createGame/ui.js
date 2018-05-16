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

    selectShip(e) {
        const buttons = document.querySelectorAll('button');

        buttons.forEach(button => {
            if (button.className !== event.target.className) {
                button.disabled = true;
            }
        });
        e.target.style.backgroundColor = '#ccffcc';
    }

    unDisable(event) {
        const buttons = document.querySelectorAll('button');

        event.target.style.backgroundColor = '#ccffcc'

        buttons.forEach(button => {
            if (button.className !== event.target.className) {
                button.disabled = false;
            }
        });

    }






}