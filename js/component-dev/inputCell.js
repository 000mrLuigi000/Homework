'use strict';

let createVNode = Inferno.createVNode;
let createFragment = Inferno.createFragment;

/**
 * Элемент отображающий ячейку на поле
 */
export default class InputCell extends Inferno.Component {
    constructor(props) {
        super(props);
        this.state = {
            //картинка в клетке
            imageName: props.imageName ?? '',
            //цвет ячейки когда собралась линия
            color: props.color ?? ''
        }
    }

    render() {
        //this.props.click - функция срабатываемая при нажатии
        return <div className="main__arena__inputCell" onClick={
            ()=>{this.props.click(this)}
        } style={
            (this.state.imageName) ? `background-image: url(./img/${this.state.imageName}); background-color: ${this.state.color};` : ''
        }></div>
    }
}