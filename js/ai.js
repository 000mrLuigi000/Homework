'use strict';

export default class Ai {
    constructor(controller, model, update) {
        this.controller = controller;
        this.model = model;
        this.update = update;
        this.moveCout = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]];
    }

    chek() {
        this.model.arena.forEach((item, i) => {
            this.model.arena[i].forEach((item, j) => {
                this.moveCout.forEach((move, index) => {
                    (item === 1 && move[0] === i && move[1] === j) ? this.moveCout.splice(index, 1) : '';
                });
            });
        });
    }

    default() {
        this.moveCout = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]];
    }

    move() {
        this.chek();
        let pos = Math.round(Math.random() * (this.moveCout.length - 1));
        let cell = this.model.ui.inputTable.$LI.children[this.moveCout[pos][0] * 3 + this.moveCout[pos][1]].children;
        this.controller.delay(500).then(() => {
            this.update({
                component: this.model.ui.playerContainer,
                whoMove: this.model.whoMove
            });
            this.update({
                component: cell,
                imageName: (this.model.moveCout % 2 === 1) ? 'zero.svg' : 'cross.svg'
            });
            this.moveCout.splice(pos, 1);
            this.model.moveCout--;
            this.model.arena[cell.props.i][cell.props.j] = -1;
            let cellWin = this.controller.chekWin();
            if (cellWin) {
                this.controller.nextRaund(cellWin);
            } else {
                (!this.model.moveCout) ? this.controller.nextRaund() : undefined;
            }
            this.model.whoMove = 'p';
        });
    }
}