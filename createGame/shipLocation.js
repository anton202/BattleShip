const shipsLocation = (function () {

    let currentShip = 1;
    const shipLength = [3, 2, 3];
    let positions = [];
    let position = [];


    const getPosition = () => {
        return position;
    }

    const selectShip = (e) => {

        if (positions.length === 3) {
            return
        }
        if (position.length === 0) {
            return position.push(Number(e.target.dataset.row + e.target.dataset.column));
        }
        if (position.length !== shipLength[currentShip - 1]) {
            checkPosition(e);
        }
        if (position.length === shipLength[currentShip - 1]) {
            positions.push({ shipPosition: position });
            currentShip++;
            position = [];
        }
    }

    const checkPosition = function (e) {
        const currentPosition = Number(e.target.dataset.row + e.target.dataset.column);
        const previousPosition = position[position.length - 1];

        if (position.length === 2) {
            const horOrVer = position[1] - position[0];
            if (currentPosition - previousPosition !== horOrVer) {
                return
            }
        }

        if (currentPosition - previousPosition === 1 || currentPosition - previousPosition === -1) {
            return position.push(currentPosition);
        }

        if (currentPosition - previousPosition === 10 || currentPosition - previousPosition === -10) {
            return position.push(currentPosition);
        }
    }


    return {
        selectShip,
        positions,
        getPosition

    }

})()