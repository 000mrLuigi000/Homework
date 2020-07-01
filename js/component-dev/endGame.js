'use strict';

let createVNode = Inferno.createVNode;
let createFragment = Inferno.createFragment;
/**
 * Элемент отображающий подведения итогового счета
 */
export default class EndGame extends Inferno.Component {
    constructor(props) {
        super(props);
        this.state = {
            //кто попебил
            whoWin: '',
            //финальнок сооьщение 
            message: ''
        };
    }

    render() {
        return <>
            <h3 className="main__history__subTitle">{(this.state.whoWin) ? 'Итог:' : ""}</h3>
            <div className="main__history__final" whoWin={this.state.whoWin}>{this.state.message}</div>
        </>
    }
}