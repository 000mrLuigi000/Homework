'use strict';
import { InputCell } from './inputCell.js';
/**
 * Класс компонента Table.
 * Служит созданию таблиц.
 */
export class Table extends Inferno.Component {
    constructor(props) {
        super(props);
    }

    /**
     * Создает таблицу размером rowCount и props[0]
     * @param {Number} rowCount Количество строк в таблице
     * @param {String} className Класс ячейки
     * @param {Object} props Набор пораметров где props[0] - количество столбцов таблицы
     * @returns {Array} 
     */
    _createTable(rowCount, className, props) {
        //Создается новая таблица
        let row = [];
        for (let i = 0; i < rowCount; i++) {
            //Создается набор ячеек в строке
            let cell = [];
            for (let j = 0; j < props[0]; j++) {
                //Создаются ячейки и записываются в массив
                cell.push(Inferno.createElement(InputCell, {
                    clas: className,
                    i: (this.props.coord) ? i : '', //Координаты ячеки
                    j: (this.props.coord) ? j : '',
                    func: (this.props.coord) ? this.props.func : '', //Фунция которая будет срабатывать при нажатии
                    cont: props[1] ?? '' //Значение в ячейке
                }));
                props.splice(1, 1);
            }
            row.push(Inferno.createElement('tr', {}, cell));
        }
        return row;
    }

    render() {
        /**
         * Создается таблица с определенными ячейками
         */
        return Inferno.createElement('table', { className: this.props.classTable },
            this._createTable(this.props.row, this.props.classCell, this.props.props)
        );
    }
}