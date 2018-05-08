const ui = new UI;
const position = [];

ui.creatTable();

const ship1 = document.querySelector('.ship1');
const ship2 = document.querySelector('.ship2');
const ship3 = document.querySelector('.ship3');

ship1.addEventListener('click', ui.selectShip);
ship2.addEventListener('click', ui.selectShip2);
ship3.addEventListener('click', ui.selectShip);
