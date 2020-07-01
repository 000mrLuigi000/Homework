'use strict';
import HistoryItem from './histoyrItem.js';

let createVNode = Inferno.createVNode;
let createComponentVNode = Inferno.createComponentVNode;
let createFragment = Inferno.createFragment;

/**
 * Элемент отображающий историю раундов
 */
export default class HistoryTable extends Inferno.Component {
    constructor(props) {
        super(props);
        this.state = {
            //список элементов раундов
            matchItems: props.matchItems ?? [] 
        }
    }
    /**
     * Создает список элементов раундов присваивая каждому номер раунда
     */
    _spawnItems() {
        let items = this.state.matchItems;
        items.push(<HistoryItem matchNumber={this.state.matchItems.length + 1}></HistoryItem>);
        return items;
    }

    render() {
        return <>
            {this._spawnItems()}
        </>;
    }
}