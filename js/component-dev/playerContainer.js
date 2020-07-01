'use strict';

let createVNode = Inferno.createVNode;
let createFragment = Inferno.createFragment;
export default class PlayerContainer extends Inferno.Component {
    constructor(props) {
        super(props);
        this.state = {
            whoMove: props.whoMove
        };
    }

    render() {
        return <>
            <div className="main__history__playerContainer__player" whoMove={this.state.whoMove}>Вы</div>
            <div className="main__history__playerContainer__player" whoMove={this.state.whoMove}>Бот</div>
        </>
    }
}

