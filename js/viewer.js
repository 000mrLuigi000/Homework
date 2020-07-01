'use strict';

import HistoryTable from './component/historyTable.js';
import PlayerContainer from './component/playerContainer.js';
import EndGame from './component/endGame.js';
import InputTable from './component/inputTable.js';

export default class Viewer {
    /**
     * 
     */
    init({click,whoMove}) {
        let playerContainer = Inferno.createElement(PlayerContainer,{whoMove: whoMove});
        let history = Inferno.createElement(HistoryTable);
        let endGame = Inferno.createElement(EndGame);
        let inputTable = Inferno.createElement(InputTable, {click: click});
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
     * 
     * @param {Inferno.Component} component 
     */
    update({component,whoMove,whoWin,matchItems,message,imageName}) {
        component.setState({
            whoMove: whoMove,
            whoWin: whoWin,
            matchItems: matchItems,
            message: message,
            imageName: imageName
        });
    }
}