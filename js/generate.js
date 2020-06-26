'use strict';
/**
 * Класс делающий генерацию кораблей на поле
 */
export class Generate {

    /**
     * Служит для проверки возможности вставки каробля на поле по его координатам
     * @param {Array} arr Матрица дублирующая поле кораблей
     * @param {Number} x1
     * @param {Number} y1 
     * @param {Number} x2 
     * @param {Number} y2 
     */
    _check(arr, x1, y1, x2, y2) {
        for (let i = y1 - 1; i < y2 + 2; i++) {
            for (let j = x1 - 1; j < x2 + 2; j++) {
                //Если значение в поле не пустое тогда там другой корабль
                if (arr[i][j] > 0) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Служит для вставки каробля на поле по его координатам
     * @param {Array} arr Матрица дублирующая поле кораблей
     * @param {Number} y1 
     * @param {Number} x2 
     * @param {Number} x1 
     * @param {Number} y2 
     * @param {Number} deck Палуба коробля
     */
    _past(arr, x1, y1, x2, y2, deck) {
        for (let i = y1 - 1; i < y2 + 2; i++) {
            for (let j = x1 - 1; j < x2 + 2; j++) {
                arr[i][j] = -1;
            }
        }
        for (let i = y1; i < y2 + 1; i++) {
            for (let j = x1; j < x2 + 1; j++) {
                arr[i][j] = deck;
            }
        }
    }

    /**
     * Дублирует матрицу поля где вместо номара палубы вставляется номер коробля в массиве (остальные позиции пустые)
     * @param {Array} arr Массив хранящий список кораблей
     * @returns {Array} Новая матрица хранящая позици кораблей в списке
     */
    _fleetCoord(arr) {
        let fleet = [];
        for (let i = 0; i < 10; i++) {
            fleet.push([]);
            for (let j = 0; j < 10; j++) {
                fleet[i].push([]);
            }
        }
        arr.forEach((item, index) => {
            for (let i = item[1] - 1; i < item[3]; i++) {
                for (let j = item[0] - 1; j < item[2]; j++) {
                    fleet[i][j] = index;
                }
            }
        });
        return fleet;
    }

    /**
     * "Ресует" корабль по случайным координатам и записывает его данные в массив
     * @param {Array} arr Матрица дублироющая поле
     * @param {Number} deck Палуба коробля / Ддлина коробля
     * @returns {Array} Массив содержащий данные о корабле (Координаты начала и конца, повернут ли, палубу)
     */
    _draw(arr, deck) {
        let coord = [];
        while (true) {
            let x = Math.round(Math.random() * 9 + 1);
            let y = Math.round(Math.random() * 9 + 1);
            if (x + deck - 1 < arr[y].length - 2 && y + deck - 1 < arr.length - 2) {
                // Значение поворота
                let rotate = Math.random();
                if (rotate >= 0.5) {
                    if (this._check(arr, x, y, x + deck - 1, y)) {
                        this._past(arr, x, y, x + deck - 1, y, deck);
                        coord.push(x, y, x + deck - 1, y, true, deck);
                        break;
                    }
                } else {
                    if (this._check(arr, x, y, x, y + deck - 1)) {
                        this._past(arr, x, y, x, y + deck - 1, deck);
                        coord.push(x, y, x, y + deck - 1, false, deck);
                        break;
                    }
                }
            } else if (y + deck - 1 < arr.length - 2) {
                if (this._check(arr, x, y, x, y + deck - 1)) {
                    this._past(arr, x, y, x, y + deck - 1, deck);
                    coord.push(x, y, x, y + deck - 1, false, deck);
                    break;
                }
            } else if (x + deck - 1 < arr[y].length - 2) {
                if (this._check(arr, x, y, x + deck - 1, y)) {
                    this._past(arr, x, y, x + deck - 1, y, deck);
                    coord.push(x, y, x + deck - 1, y, true, deck);
                    break;
                }
            }
        }
        return coord;
    }

    /**
     * Отчищает матрицу от значений -1
     * @param {Array} arr Матрица дублироющая поле
     */
    _clear(arr) {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                (arr[i][j] === -1) ? arr[i][j] = 0 : '';
            }
        }
    }

    /**
     * Служит для формирования матрицы поля с раставленными короблями
     * @returns {Object} Данные с данными о короблях, матрицей поля, матрицей кораблей
     */
    spawn() {
        //Сумма всех палуб кораблец, служит флагом
        let summ = 20;
        //Инициализацтя объекта с данными о короблях, матрицей поля, матрицей кораблей
        let fleetCoord = { coord: [], arr: [], fleet: [] };
        //Список доступных кораблей по палубам и их количество
        let fleetArr = [[4], [3], [2], [1]]
        //Инициалезируется матрица поля
        for (let i = 0; i < 12; i++) {
            fleetCoord.arr.push([]);
            for (let j = 0; j < 12; j++) {
                fleetCoord.arr[i][j] = 0;
            }
        }
        //Пока не запишутся все корабли, выбираем тип палубы и отрисовываем
        while (summ > 0) {
            let deck = Math.round(Math.random() * 3);
            if (fleetArr[deck] > 0) {
                switch (deck + 1) {
                    case 1: {
                        let coord = this._draw(fleetCoord.arr, deck + 1);
                        fleetCoord.coord.push(coord);
                        summ -= 1;
                        fleetArr[deck]--;
                        break;
                    }
                    case 2: {
                        let coord = this._draw(fleetCoord.arr, deck + 1);
                        fleetCoord.coord.push(coord);
                        fleetCoord.fleet.push(coord.fleet);
                        summ -= 2;
                        fleetArr[deck]--;
                        break;
                    }
                    case 3: {
                        let coord = this._draw(fleetCoord.arr, deck + 1);
                        fleetCoord.coord.push(coord);
                        fleetCoord.fleet.push(coord.fleet);
                        summ -= 3;
                        fleetArr[deck]--;
                        break;
                    }
                    case 4: {
                        let coord = this._draw(fleetCoord.arr, deck + 1);
                        fleetCoord.coord.push(coord);
                        fleetCoord.fleet.push(coord.fleet);
                        summ -= 4;
                        fleetArr[deck]--;
                        break;
                    }
                }
            }
        }
        //Записываем матрицу флота и отчищаем поле
        fleetCoord.fleet = this._fleetCoord(fleetCoord.coord);
        this._clear(fleetCoord.arr);
        return fleetCoord;
    }
}