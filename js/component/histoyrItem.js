'use strict';

let createVNode = Inferno.createVNode;
export default class HistoryItem extends Inferno.Component {
  constructor(props) {
    super(props);
    this.state = {
      whoWin: ''
    };
  }

  render() {
    return createVNode(1, "div", "main__history__item", [createVNode(1, "div", "main__history__item__matchNumber", this.props.matchNumber, 0), createVNode(1, "div", "main__history__item__playerContainer", [createVNode(1, "div", "main__history__item__player", "\u0412\u044B", 16), createVNode(1, "div", "main__history__item__player", "\u041D\u0438\u0447\u044C\u044F", 16), createVNode(1, "div", "main__history__item__player", "\u0411\u043E\u0442", 16)], 4)], 4, {
      "whoWin": this.state.whoWin
    });
  }

}