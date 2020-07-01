'use strict';

import Viewer from './viewer.js';
import Model from './model.js';
import Ai from './ai.js';



export default class Controller {
    constructor() {
        this.viewer = new Viewer();
        this.model = new Model();
        this.ai = new Ai(this, this.model, this.viewer.update);
    }

    delay(time) {
        return new Promise((r) => {
            setTimeout(() => { r() }, time);
        });
    }

    newGame() {
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
                imageName: ''
            });
        });
        this.viewer.update({
            component: this.model.ui.endGame,
            whoWin: '',
            message: ''
        });
        (this.model.whoMove === 'e') ? this.ai.move() : undefined;
    }

    win(win) {
        const players = ['e', 'n', 'p'];
        this.viewer.update({
            component: this.model.ui.history.$LI.children[this.model.ui.history.$LI.children.length - 1].children,
            whoWin: players[win + 1]
        });
        this.model.score += win;
    }

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

    nextRaund(cellWin) {
        this.ai.default();
        let winNumber;
        if (cellWin) {
            winNumber = (this.model.whoMove === 'p') ? 1 : -1;
            this.model.ui.inputTable.$LI.children.forEach((cell, index) => {
                if (index === cellWin[0] || index === cellWin[1] || index === cellWin[2]) {
                    this.viewer.update({
                        component: cell.children,
                        whoWin: '#55a339',
                        imageName: cell.children.state.imageName
                    });
                };
            });
        } else {
            winNumber = 0;
        }
        if (this.model.matchNumber < 4) {
            this.win(winNumber);
            this.model.whoMove = this.swapPlayer();
            this.delay(1000).then(() => {
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
                        imageName: ''
                    });
                });
                this.model.matchNumber++;
                this.model.default();
                (this.model.whoMove === 'e') ? this.ai.move() : undefined;
            });
        } else {
            this.win(winNumber);
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
            this.viewer.update({
                component: this.model.ui.endGame,
                whoWin: whoWin,
                message: message
            });
            this.delay(1000).then(() => {
                if (confirm('Хотите повторить')) {
                    this.newGame();
                }
            });
        }
    }

    swapPlayer() {
        let x = Math.random();
        return (x >= 0.5) ? 'p' : 'e';
    }

    move(cell) {
        if (!cell.state.imageName && this.model.whoMove === 'p') {
            this.viewer.update({
                component: cell,
                imageName: (this.model.moveCout % 2 === 1) ? 'zero.svg' : 'cross.svg'
            });
            this.viewer.update({
                component: this.model.ui.playerContainer,
                whoMove: this.model.whoMove
            });
            this.model.arena[cell.props.i][cell.props.j] = 1;
            this.model.moveCout--;
            let cellWin = this.chekWin();
            if (cellWin) {
                this.nextRaund(cellWin);
            } else {
                (!this.model.moveCout) ? this.nextRaund() : this.ai.move();
            }
            this.model.whoMove = 'e';
        }
    }
}

const controller = new Controller();

controller.model.whoMove = controller.swapPlayer();
controller.model.ui = controller.viewer.init({ click: (cell) => { controller.move(cell) }, whoMove: controller.model.whoMove });
(controller.model.whoMove === 'e') ? controller.ai.move() : undefined;

console.log(controller.model.ui);