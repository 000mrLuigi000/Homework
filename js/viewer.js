'use strict';

import HistoryTable from './component/historyTable.js';
import PlayerContainer from './component/playerContainer.js';
import EndGame from './component/endGame.js';
import InputTable from './component/inputTable.js';

/**
 * Компонент отвечающий за отрисовку интерфейса
 */
export default class Viewer {
    /**
     * Инициализирует интерфейс
     * принимает click - функция при нажатии на клетку, whoMove - тот кто начинает игру
     * @param {{Function, String}} 
     * @returns {{}} возвращает элементы интерфейса
     */
    init({ click, whoMove }) {
        let playerContainer = Inferno.createElement(PlayerContainer, { whoMove: whoMove });
        let history = Inferno.createElement(HistoryTable);
        let endGame = Inferno.createElement(EndGame);
        let inputTable = Inferno.createElement(InputTable, { click: click });
        Inferno.render(playerContainer, document.getElementById('playerContainer'));
        Inferno.render(history, document.getElementById('history'));
        Inferno.render(endGame, document.getElementById('endGame'));
        Inferno.render(inputTable, document.getElementById('inputTable'));
        return {
            playerContainer: playerContainer.children,
            history: history.children,
            endGame: endGame.children,
            inputTable: inputTable.children
        }
    }
    /**
     * Обновляет определенный элемент
     * принимает component - обновляемый компонент, whoMove - тот кто начинает игру, whoWin - кто попедил, 
     * matchItems - список элементов раунда, message - сообщение о попеде, imageName - картинка клетки, 
     * color - цвет клетки при попеде
     * @param {{InfernoComponent, String, String, Array, String, String, String}}  
     */
    update({ component, whoMove, whoWin, matchItems, message, imageName, color }) {
        let state = {};
        (whoMove) ? state.whoMove = whoMove : undefined;
        (whoWin) ? state.whoWin = whoWin : undefined;
        (matchItems) ? state.matchItems = matchItems : undefined;
        (message) ? state.message = message : undefined;
        (imageName || imageName === '') ? state.imageName = imageName : undefined;
        (color || color === '') ? state.color = color : undefined;
        component.setState(state);
    }
}