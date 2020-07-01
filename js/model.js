'use strict';

/**
 * Компонент отвечающий за хранение игровых данных
 */
export default class Model {
    constructor() {
        /**хранит элементы интерфейса*/
        this.ui = {};
        /**хранит матрицу поля*/
        this.arena = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        /**хранит номер раунда*/
        this.matchNumber = 0;
        /**хранит количество доступных ходов*/
        this.moveCout = 9;
        /**хранит счет игры*/
        this.score = 0;
        /**хранит значение того, кто ходит*/
        this.whoMove = '';
    }

    /**
     * обновление хранилища кадый раунд
     */
    default() {
        this.moveCout = 9;
        this.arena = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    }

    /**
     * обновление хранилища при новой игре
     */
    reinit() {
        this.default();
        this.matchNumber = 0;
        this.score = 0;
        this.whoMove = '';
    }
}