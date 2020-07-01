'use strict';

let createVNode = Inferno.createVNode;

export default class HistoryItem extends Inferno.Component {
    constructor(props){
        super(props);
        this.state = {
            whoWin: ''
        };
    }

    render() {
        return <div className="main__history__item" whoWin={this.state.whoWin}>
            <div className="main__history__item__matchNumber">{this.props.matchNumber}</div>
            <div className="main__history__item__playerContainer">
                <div className="main__history__item__player">Вы</div>
                <div className="main__history__item__player">Ничья</div>
                <div className="main__history__item__player">Бот</div>
            </div>
        </div>
    }
}