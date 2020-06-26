'use strict';
import { GUI } from './gui.js';
import { Ai } from './ai.js';
//Создаем экземпляр класса интерфейс
const gui = new GUI();
//Создаем экземпляр класса интилект
const ai = new Ai();
//Передоваемая пременная - контейнер для "глобальных" переменных
let fleetElem = {};
//Отрисовываем первую страницу
gui.create(1);

document.getElementById('form').addEventListener('submit', (event) => {
    event.preventDefault();
    //Отрисовываем вторую страницу и записываем полученныйе дынные
    fleetElem = gui.create(
        2,
        [event.srcElement.nameP.value, event.srcElement.nameAi.value || 'Бот'],
        (coord) => { ai.moveP(coord); } //Функция срабатываемая при нажатии на ячейку
    );
    //Запоминаем данные формы
    fleetElem['form'] = [event.srcElement.nameP.value, event.srcElement.nameAi.value || 'Бот'];
    //Передаем все данные в главный оброботчик
    ai.init(fleetElem);
});
