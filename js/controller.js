'use strict';

import Viewer from './viewer.js';
import Model from './model.js';
import Ai from './ai.js';

/**
 * Компонет отвечающий за связь хранилища, обработку данныйх, связь с отрисовщиком
 */
export default class Controller {
    constructor() {
        this.viewer = new Viewer();
        this.model = new Model();
        this.ai = new Ai(this, this.model, this.viewer.update);
    }

    /**
     * Таймер
     * @param {Number} time время ожидания
     * @returns {Promise} 
     */
    delay(time) {
        return new Promise((r) => {
            setTimeout(() => { r() }, time);
        });
    }

    /**
     * Случауно выбирает кому начать игру
     * @returns {String} 'p' - player / 'e' - enemy
     */
    swapPlayer() {
        let x = Math.random();
        return (x >= 0.5) ? 'p' : 'e';
    }

    /**
     * Инициализирует новую игру
     */
    newGame() {
        //Просто все возврощает в начальное состояние
        this.model.reinit();
        this.model.whoMove = this.swapPlayer();
        this.viewer.update({
            component: this.model.ui.playerContainer,
            whoMove: this.model.whoMove
        });
        this.viewer.update({
            component: this.model.ui.history,
            matchItems: []
        });
        this.viewer.update({
            component: this.model.ui.history.$LI.children[this.model.ui.history.$LI.children.length - 1].children,
            whoWin: ''
        });
        this.model.ui.inputTable.$LI.children.forEach((cell) => {
            this.viewer.update({
                component: cell.children,
                imageName: '',
                color: ''
            });
        });
        this.viewer.update({
            component: this.model.ui.endGame,
            whoWin: '',
            message: ''
        });
        //Если в новой игре начинает бот то запускаем его
        (this.model.whoMove === 'e') ? this.ai.move() : undefined;
    }

    /**
     * Закрашивает попедителя в элементе раунда
     * @param {Number} win значение того кто попедил 1 - вы, -1 - бот, 0 - ничья 
     */
    choiseWinner(win) {
        const players = ['e', 'n', 'p'];
        this.viewer.update({
            component: this.model.ui.history.$LI.children[this.model.ui.history.$LI.children.length - 1].children,
            whoWin: players[win + 1]
        });
        this.model.score += win;
    }

    /**
     * Проверяет сошлась ли линия для попеды если да то возвращает позици клеток на поле
     * @returns {Array} позийии клеток на поле
     */
    chekWin() {
        if (this.model.arena[0][0] !== 0) {
            if (
                this.model.arena[0][0] === this.model.arena[0][1] &&
                this.model.arena[0][0] === this.model.arena[0][2]
            ) return [0, 1, 2];
            if (
                this.model.arena[0][0] === this.model.arena[1][0] &&
                this.model.arena[0][0] === this.model.arena[2][0]
            ) return [0, 3, 6];
            if (
                this.model.arena[0][0] === this.model.arena[1][1] &&
                this.model.arena[0][0] === this.model.arena[2][2]
            ) return [0, 4, 8];
        }
        if (this.model.arena[2][0] !== 0) {
            if (
                this.model.arena[2][0] === this.model.arena[1][1] &&
                this.model.arena[2][0] === this.model.arena[0][2]
            ) return [2, 4, 6];
            if (
                this.model.arena[2][0] === this.model.arena[2][1] &&
                this.model.arena[2][0] === this.model.arena[2][2]
            ) return [6, 7, 8];
        }
        if (
            this.model.arena[1][0] !== 0 &&
            this.model.arena[1][0] === this.model.arena[1][1] &&
            this.model.arena[1][0] === this.model.arena[1][2]
        ) return [3, 4, 5];
        if (
            this.model.arena[0][1] !== 0 &&
            this.model.arena[0][1] === this.model.arena[1][1] &&
            this.model.arena[0][1] === this.model.arena[2][1]
        ) return [1, 4, 7];
        if (
            this.model.arena[0][2] !== 0 &&
            this.model.arena[0][2] === this.model.arena[1][2] &&
            this.model.arena[0][2] === this.model.arena[2][2]
        ) return [2, 5, 8];
    }

    /**
     * Инициализирует новый раунд
     * @param {Array} cellWin позийии выигравших клеток на поле
     */
    nextRaund(cellWin) {
        //Обнуляет значения бота
        this.ai.default();
        /**Номер попедителя 1 - вы, -1 - бот, 0 - ничья  */
        let winNumber;
        //Если позици существуют то закрашиваем их и устанавливаем номер того кто попедил 
        if (cellWin) {
            winNumber = (this.model.whoMove === 'p') ? -1 : 1;
            this.model.ui.inputTable.$LI.children.forEach((cell, index) => {
                if (index === cellWin[0] || index === cellWin[1] || index === cellWin[2]) {
                    this.viewer.update({
                        component: cell.children,
                        color: '#55a339',
                        imageName: cell.children.state.imageName
                    });
                };
            });
        } else {
            winNumber = 0;
        }
        //Если еще не последний раунд
        if (this.model.matchNumber < 4) {
            //Закращиваем ячейки
            this.choiseWinner(winNumber);
            //Обнуляем хранилище
            this.model.default();
            //Флаг блакируещий ход игроку
            this.model.whoMove = 'e';
            //После добовляем новый элемент раунда, обновляем отображение того кто ходит по новому значению, обнуляем клетки и прибовляем номер раунда
            this.delay(500).then(() => {
                this.model.whoMove = this.swapPlayer();

                this.viewer.update({
                    component: this.model.ui.history,
                    matchItems: this.model.ui.history.state.matchItems
                });
                this.viewer.update({
                    component: this.model.ui.playerContainer,
                    whoMove: this.model.whoMove
                });
                this.model.ui.inputTable.$LI.children.forEach((cell) => {
                    this.viewer.update({
                        component: cell.children,
                        imageName: '',
                        color: ''
                    });
                });
                this.model.matchNumber++;
                //Если в новом раунде начинает бот то запускаем его
                (this.model.whoMove === 'e') ? this.ai.move() : undefined;
            });
        } else {
            //Закращиваем ячейки
            this.choiseWinner(winNumber);
            //В зависимости от счета выбираем попедителя и сообщение для него
            let whoWin;
            let message;
            if (this.model.score > 0) {
                whoWin = 'p';
                message = 'Вы попедили';
            } else if (this.model.score < 0) {
                whoWin = 'e';
                message = 'Бот попедил';
            } else {
                whoWin = 'n';
                message = 'Ничья';
            }
            //Отрисовываем сообщение
            this.viewer.update({
                component: this.model.ui.endGame,
                whoWin: whoWin,
                message: message
            });
            //Флаг блакируещий ход игроку
            this.model.whoMove = 'e';
            //Предлогаем повторить
            this.delay(500).then(() => {
                if (confirm('Хотите повторить')) {
                    this.newGame();
                }
            });
        }
    }

    /**
     * Выполняет ход игрока по клику на ячейке
     * @param {InfernoComponent} cell элемент клетки
     */
    move(cell) {
        //Проверяет пуста ли клетка и чей ход
        if (!cell.state.imageName && this.model.whoMove === 'p') {
            //Обновляет картинку клетки (тот кто начал игру всегда ноль, дальше по очереди)
            this.viewer.update({
                component: cell,
                imageName: (this.model.moveCout % 2 === 1) ? 'zero.svg' : 'cross.svg'
            });
            this.model.whoMove = 'e';
            this.viewer.update({
                component: this.model.ui.playerContainer,
                whoMove: this.model.whoMove
            });
            //Вычитает количество возможных ходов, в матрице по координатам ставим значение
            this.model.arena[cell.props.i][cell.props.j] = 1;
            this.model.moveCout--;
            //Проверяю наличе готовых линий если есть то инициализирует новый раунд, если нет то новый раунд инициализируется когда количество ходов станет = 0, если опять нет то запускается ход бота
            let cellWin = this.chekWin();
            if (cellWin) {
                this.nextRaund(cellWin);
                return;
            } else {
                if (!this.model.moveCout) {
                    this.nextRaund();
                    return;
                } else {
                    this.ai.move();
                }
            }
        }
    }
}

const controller = new Controller();

controller.model.whoMove = controller.swapPlayer();
controller.model.ui = controller.viewer.init({ click: (cell) => { controller.move(cell) }, whoMove: controller.model.whoMove });
(controller.model.whoMove === 'e') ? controller.ai.move() : undefined;

console.log(controller.model.ui);