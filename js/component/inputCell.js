'use strict';

let createVNode = Inferno.createVNode;
let createFragment = Inferno.createFragment;
export default class InputCell extends Inferno.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageName: props.imageName ?? '',
      whoWin: props.whoWin ?? ''
    };
  }

  render() {
    return createVNode(1, "div", "main__arena__inputCell", null, 1, {
      "onClick": () => {
        this.props.click(this);
      },
      "style": `background-image: url(./img/${this.state.imageName}); background-color: ${this.state.whoWin};`
    });
  }

}