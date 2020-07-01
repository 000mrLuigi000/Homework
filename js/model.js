'use strict';

export default class Model {
    constructor() {
        this.ui = {};
        this.arena = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        this.matchNumber = 0;
        this.moveCout = 9;
        this.score = 0;
        this.whoMove = '';
    }

    default() {
        this.moveCout = 9;
        this.arena = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    }

    reinit() {
        this.default();
        this.matchNumber = 0;
        this.score = 0;
        this.whoMove = '';
    }
}