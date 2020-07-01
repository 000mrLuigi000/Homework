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
    return createFragment([createVNode(1, "div", "main__history__playerContainer__player", "\u0412\u044B", 16, {
      "whoMove": this.state.whoMove
    }), createVNode(1, "div", "main__history__playerContainer__player", "\u0411\u043E\u0442", 16, {
      "whoMove": this.state.whoMove
    })], 4);
  }

}