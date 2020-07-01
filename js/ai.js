'use strict';

/**
 * Компонент отвечающий за работу бота
 */
export default class Ai {
    constructor(controller, model, update) {
        /**ссылка на контроллер*/
        this.controller = controller;
        /**ссылка на хранилище*/
        this.model = model;
        /**ссылка на функцию viever.update*/
        this.update = update;
        /**Список возможных ходов */
        this.moveCout = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]];
    }

    /**
     * Проверяет данные ячейки на наличие нужных ходов
     * @param {Array} cellItems Массив координат ячеек
     * @param {Boolean} winTacticks Флаг проверки выигрыщных холов
     */
    _chek(cellItems, winTacticks) {
        //Будет ли поиск попедных ходов
        let compare;
        if (winTacticks) {
            compare = -1;
        } else {
            compare = 1;
        }
        //Идет сравнение в клетках на 011 101 110 от этого решается какие координаты вернуть
        if (
            (this.model.arena[cellItems[0][0]][cellItems[0][1]] === 0 &&
                this.model.arena[cellItems[1][0]][cellItems[1][1]] === compare &&
                this.model.arena[cellItems[2][0]][cellItems[2][1]] === compare)
        ) {
            return cellItems[0];
        }
        if (
            (this.model.arena[cellItems[0][0]][cellItems[0][1]] === compare &&
                this.model.arena[cellItems[1][0]][cellItems[1][1]] === 0 &&
                this.model.arena[cellItems[2][0]][cellItems[2][1]] === compare)
        ) {
            return cellItems[1];
        }
        if (
            (this.model.arena[cellItems[0][0]][cellItems[0][1]] === compare &&
                this.model.arena[cellItems[1][0]][cellItems[1][1]] === compare &&
                this.model.arena[cellItems[2][0]][cellItems[2][1]] === 0)
        ) {
            return cellItems[2];
        }
    }

    /**
     * Полверяет наличие возможных ходов и выбирает правельное
     * @returns {Number} возврощает позицию
     */
    chek() {
        this.model.arena.forEach((item, i) => {
            this.model.arena[i].forEach((item, j) => {
                this.moveCout.forEach((move, index) => {
                    (item === 1 && move[0] === i && move[1] === j) ? this.moveCout.splice(index, 1) : '';
                });
            });
        });
        let chekList = [
            [[0, 0], [0, 1], [0, 2]],
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],
            [[0, 0], [1, 1], [2, 2]],
            [[2, 0], [1, 1], [0, 2]],
            [[0, 0], [1, 0], [2, 0]],
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]]
        ]
        let pos;
        for (let i = 0; i < 8; i++) {
            pos = this._chek(chekList[i], true);
            if (pos) {  break; }
        }
        if (pos) return pos;
        for (let i = 0; i < 8; i++) {
            pos = this._chek(chekList[i]);
            if (pos) break;
        }
        if (pos) return pos;

        return Math.round(Math.random() * (this.moveCout.length - 1));
    }

    /**
     * Служит для сбрасывания доступных ходов
     */
    default() {
        this.moveCout = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]];
    }

    /**
     * Выполняет ход бота
     */
    move() {
        //Выбирает клетку
        let pos = this.chek();
        this.moveCout.forEach((move, index) => {
            (move[0] === pos[0] && move[1] === pos[1]) ? pos = index : '';
        });
        let cell = this.model.ui.inputTable.$LI.children[this.moveCout[pos][0] * 3 + this.moveCout[pos][1]].children;

        this.controller.delay(500).then(() => {
            //Обновляет картинку клетки (тот кто начал игру всегда ноль, дальше по очереди)
            this.update({
                component: cell,
                imageName: (this.model.moveCout % 2 === 1) ? 'zero.svg' : 'cross.svg'
            });
            this.model.whoMove = 'p';
            this.update({
                component: this.model.ui.playerContainer,
                whoMove: this.model.whoMove
            });
            //Удаляет из списка сделанный ход, вычитает количество возможных ходов, в матрице по координатам ставим значение
            this.moveCout.splice(pos, 1);
            this.model.moveCout--;
            this.model.arena[cell.props.i][cell.props.j] = -1;
            //Проверяю наличе готовых линий если есть то инициализирует новый раунд, если нет то новый раунд инициализируется когда количество ходов станет = 0
            let cellWin = this.controller.chekWin();
            if (cellWin) {
                this.controller.nextRaund(cellWin);
                return;
            } else {
                if (!this.model.moveCout) {
                    this.controller.nextRaund();
                    return;
                }
            }
        });
    }
}