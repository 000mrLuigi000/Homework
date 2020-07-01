'use strict';

import InputCell from './inputCell.js';
let createVNode = Inferno.createVNode;
let createComponentVNode = Inferno.createComponentVNode;
let createFragment = Inferno.createFragment;
export default class InputTable extends Inferno.Component {
  constructor(props) {
    super(props);
  }

  _spawnCell() {
    let items = [];

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        items.push(createComponentVNode(2, InputCell, {
          "i": i,
          "j": j,
          "click": this.props.click,
          "imageName": '',
          "whoWin": ''
        }));
      }
    }

    return items;
  }

  render() {
    return createFragment(this._spawnCell(), 0);
  }

}