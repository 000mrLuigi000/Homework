'use strict';

let createVNode = Inferno.createVNode;
let createFragment = Inferno.createFragment;

/**
 * Элемент отображающий чей сейчас ход
 */
export default class PlayerContainer extends Inferno.Component {
    constructor(props) {
        super(props);
        this.state = {
            //кто ходит
            whoMove: props.whoMove
        };
    }

    render() {
        //отображение кто ходит устанавливается из css используя whoMove
        return <>
            <div className="main__history__playerContainer__player" whoMove={this.state.whoMove}>Вы</div>
            <div className="main__history__playerContainer__player" whoMove={this.state.whoMove}>Бот</div>
        </>
    }
}

