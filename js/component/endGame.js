'use strict';

let createVNode = Inferno.createVNode;
let createFragment = Inferno.createFragment;
export default class EndGame extends Inferno.Component {
  constructor(props) {
    super(props);
    this.state = {
      whoWin: '',
      message: ''
    };
  }

  render() {
    return createFragment([createVNode(1, "h3", "main__history__subTitle", this.state.whoWin ? 'Итог:' : "", 0), createVNode(1, "div", "main__history__final", this.state.message, 0, {
      "whoWin": this.state.whoWin
    })], 4);
  }

}