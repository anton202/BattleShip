
function checkPosition(event) {

    const table = document.querySelector('table');
    table.addEventListener('click', check);

    let click = 0;
    const ui = new UI();
    function check(e) {


        if (positions.length === 0 || event.target.className !== positions[positions.length - 1].shipName) {
            click++
            ui.selectShip(e);
            return positions.push({
                shipName: event.target.className,
                position1: {
                    pos: 1,
                    row: e.target.dataset.row,
                    column: e.target.dataset.column
                }

            })
        }

        console.log(event.target.className, positions[positions.length - 1].shipName)

        if (positions.length !== 0 && event.target.className === positions[positions.length - 1].shipName) {


            console.log(positions[positions.length - 1])
            let currentPosition = positions[positions.length - 1].position2 ?
                positions[positions.length - 1].position2 : positions[positions.length - 1].position1;

            //same position check
            if(+e.target.dataset.row === +currentPosition.row && +e.target.dataset.column === +currentPosition.column){
                return;
            }

            //diagonal check
            if ((+e.target.dataset.row - (+currentPosition.row) === 1 &&
                +e.target.dataset.column - (+currentPosition.column) === 1) ||
                (+e.target.dataset.row - (+currentPosition.row) === -1 &&
                    +e.target.dataset.column - (+currentPosition.column) === -1) ||
                (+e.target.dataset.row - (+currentPosition.row) === -1 &&
                    +e.target.dataset.column - (+currentPosition.column) === 1) ||
                (+e.target.dataset.row - (+currentPosition.row) === 1 &&
                    +e.target.dataset.column - (+currentPosition.column) === -1)) {
                return;
            }
             
            // only vertical & horizontal positions
            if (+e.target.dataset.row - (+currentPosition.row) === 1 ||
                +e.target.dataset.row - (+currentPosition.row) === -1 ||
                +e.target.dataset.row - (+currentPosition.row) === 0) {

                if (+e.target.dataset.column - (+currentPosition.column) === 0 ||
                    +e.target.dataset.column - (+currentPosition.column) === 1 ||
                    +e.target.dataset.column - (+currentPosition.column) === -1) {

                    click++

                    ui.selectShip(e)

                    if (click === +event.target.dataset.clicks) {
                        ui.unDisable(event);
                        table.removeEventListener('click', check);
                        
                        console.log('event removed')
                    }

                    positions.push({ shipName: event.target.className })

                    if (currentPosition.pos === 2) {

                        return positions[positions.length - 1].position3 = {
                            pos: 3,
                            row: e.target.dataset.row,
                            column: e.target.dataset.column
                        }
                    }
                    positions[positions.length - 1].position2 = {
                        pos: 2,
                        row: e.target.dataset.row,
                        column: e.target.dataset.column
                    }

                }
            }
        }


       
        console.log(positions)
    }
}