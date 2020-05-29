export class SuperVisor {
    'use strict';
    /*
    Создает список всех обьектов программы.
    */
    constructor() {
        this.listElement = [];
    }
    /**
     * Добавояет опредеоенный элемент по определенному индексу.
     * @param { object } element Сам элемент.
     * @param { string } id Его индекс.
     */
    addElement(element, id) {
        this.listElement[id] = element;
    }
    /**
     * Удаляет элемент по определенному индексу.
     * @param { string } id Его индекс.
     */
    removeElement(id) {
        this.listElement[id].unload();
        this.listElement[id] = undefined;
    }
    /**
     * Возвращает элемент по определенному индексу.
     * @param { string } id Его индекс.
     * @returns { object } Элемент. 
     */
    getElement(id) {
        return this.listElement[id];
    }
}