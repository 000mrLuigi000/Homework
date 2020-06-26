'use strict';
import { Page1 } from './component/page_1.js';
import { Page2 } from './component/page_2.js';
import { Ships } from './component/ships.js';
import { Table } from './component/table.js';
import { TableSVG } from './component/tableSVG.js';
import { Generate } from './generate.js';
//Инициалезируем класс генератора
const generate = new Generate();
/**
 * Ксласс отвтчающии за отрисовку окуружения
 */
export class GUI {
    /**
     * Создает элемкнты кораблей по их координатам
     * @param {Array} coord Координаты короблей
     * @param {Number} visible Виден ли 0/1
     * @returns {Array} Созданные элементы кораблей
     */
    _spawnFleet(coord, visible) {
        let fleet = [];
        coord.forEach((item) => {
            fleet.push(Inferno.createElement(Ships, {
                x1: item[0],
                y1: item[1],
                x2: item[2] + 1,
                y2: item[3] + 1,
                rotate: item[4],
                deck: item[5],
                visible: visible
            }));
        });
        return fleet;
    }

    /**
     * Отрисовывает страницы
     * @param {Number} page Номер страницы
     * @param  {...any} props Параметры такие как имена и функция по клику
     */
    create(page, ...props) {
        switch (page) {
            case 1: {
                //Отрисовывает первую страницу
                Inferno.render(Inferno.createElement(Page1), document.getElementById('body'));
                break;
            }
            case 2: {

                //Объект возвращаемых данных
                const out = {};
                //Массив элемнтов в контейнере main
                let main = [];
                //Отрисовывает вторую страницу и возвращает объекты с именами
                let player = Inferno.createElement(Page2, { name: props[0] });
                Inferno.render(player, document.getElementById('body'));
                //Генерирует поля игрока и бота
                out.fleetPCoord = generate.spawn();
                out.fleetAiCoord = generate.spawn();
                //Создание шапок полей
                for (let i = 0; i < 2; i++) {
                    main.push(Inferno.createElement(Table, {
                        row: 1,
                        classTable: 'tableHead',
                        classCell: 'tableHead__cell',
                        props: [10, 'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К']
                    }));
                    main.push(Inferno.createElement(Table, {
                        row: 10,
                        classTable: 'tableHead',
                        classCell: 'tableHead__cell',
                        props: [1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                    }));
                    main.push(Inferno.createElement(TableSVG));
                }
                //Создание поля иргрока
                main.push(Inferno.createElement('div', { className: 'fleetContainer' },
                    this._spawnFleet(out.fleetPCoord.coord)
                ));
                //Создание поля бота
                main.push(Inferno.createElement('div', { className: 'fleetContainer' },
                    this._spawnFleet(out.fleetAiCoord.coord, 0)
                ));
                //Создание интерактивных полей
                main.push(Inferno.createElement(Table, {
                    row: 10,
                    classTable: 'inputControl',
                    classCell: 'inputControl__cell',
                    props: [10],
                    coord: true
                }));
                main.push(Inferno.createElement(Table, {
                    row: 10,
                    classTable: 'inputControl',
                    classCell: 'inputControl__cell',
                    props: [10],
                    coord: true,
                    func: props[1]
                }));
                Inferno.render(Inferno.createElement('div', { className: 'main' }, main), document.getElementById('main'));
                out.player = player; //Объект с именами
                out.fleetPTable = main[6]; //Корабли игрока
                out.fleetAiTable = main[7]; //Корабли бота
                out.fleetPInput = main[8];  //Интерактивное поле игрока
                out.fleetAiInput = main[9]; //Интерактивное поле бота
                return out;
            }
        }
    }
}