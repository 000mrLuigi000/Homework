'use strict';
import InputCell from './inputCell.js';

let createVNode = Inferno.createVNode;
let createComponentVNode = Inferno.createComponentVNode;
let createFragment = Inferno.createFragment;

/**
 * Элемент отображающий поле активных ячеек
 */
export default class InputTable extends Inferno.Component {
    constructor(props) {
        super(props);
    }

    /**
     * Создает список ячеек присваивая им их координаты и функцию при слике
     */
    _spawnCell() {
        let items = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                items.push(<InputCell i={i} j={j} click={this.props.click}></InputCell>);
            }
        }
        return items;
    }

    render() {
        return <>
            {this._spawnCell()}
        </>;
    }
}