'use strict'
import { GUI } from './gui.js';
//Создаем экземпляр класса интерфейс
const gui = new GUI();
/**
 * Класс интерактивности (сама миханика игры)
 */
export class Ai {
    /**
     * Таймер
     * @param {Number} time Время задержки
     */
    _dealy(time) {
        return new Promise((r) => {
            setTimeout(() => { r() }, time);
        });
    }

    /**
     * Создает список возможных ходов
     * @returns {Array} Возвращает этот список
     */
    _moveList() {
        let arr = [];
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                arr.push({ i, j });
            }
        }
        return arr;
    }

    /**
     * Ищет позицию в списке ходов определенный набор координат
     * @param {Object} coord Набор координат
     * @returns {Number} Возвращает его позицию
     */
    _find(coord) {
        for (let i = 0; i < (this.moveListAi.length - 1); i++) {
            if (this.moveListAi[i].i === coord.i && this.moveListAi[i].j === coord.j) {
                return i;
            }
        }
    }

    /**
     * Закрашивает ячейки вокруг коробля
     * @param {Array} arr Матрица поля
     * @param {} input Интерактивное поле
     * @param {Number} shipNumber Номер коробля в массиве
     * @param {*} ships Массив еороблей
     * @param {Boolean} movelist Флаг для AI
     */
    _losePast(arr, input, shipNumber, ships, movelist) {
        //Запоминаем props нужного корабля
        let props = ships.children[shipNumber].children.props;
        for (let i = props.y1 - 2; i < props.y2; i++) {
            for (let j = props.x1 - 2; j < props.x2; j++) {
                //Условие границ коробля
                if (i >= 0 &&
                    i <= 9 &&
                    j >= 0 &&
                    j <= 9 &&
                    ((i < props.y1 - 1 || i > props.y2 - 2) ||
                        (j < props.x1 - 1 || j > props.x2 - 2))
                ) {
                    //Если точка еще не закрашена, то закрашиваем ее, вычеркиваем из матрицы поля и удаляем из списка ходов
                    if (arr[i + 1][j + 1] !== -1) {
                        input.children.$LI.children[i].children[j].children.setState({ img: 'lose.svg' });
                        arr[i + 1][j + 1] = -1;
                        if (movelist) {
                            this.moveListAi.splice(this._find({ i, j }), 1);
                        }
                    }
                }

            }
        }
        //Отображаем потанувший корабль
        ships.children[shipNumber].children.setState({ visible: 1 });
    }

    /**
     * Устанавливает:
     * Объект с именами,
     * Корабли игрока,
     * Корабли бота,
     * Интерактивное поле игрока,
     * Интерактивное поле бота,
     * Жизни игрока,
     * Жизни бота,
     * Кто ходитБ,
     * Список ходов бота
     * @param {Object} fleet 
     */
    init(fleet) {
        this.fleet = fleet;
        this.lifeP = 20;
        this.lifeAi = 20;
        this.player = 'p';
        this.moveListAi = this._moveList();
    }

    /**
     * Ход игрока
     * @param {Array} coord Координаты поподания
     */
    moveP(coord) {
        //Проверка кто ходит
        if (this.player === 'p') {
            //Проверка что все еще живы
            (this.lifeAi > 0 && this.lifeP > 0) ? this._dealy(0).then(() => {
                //Получаем значение клетки в матрице поля
                let deck = this.fleet.fleetAiCoord.arr[coord[0] + 1][coord[1] + 1];
                //Если не закрашено
                if (deck !== -1) {
                    //Если пустое, то меняем ходящего, закращикаем клетку, запускаем анимацию перехода ходящего, из списка ходов выбираем один и вызываем ход бота
                    if (deck === 0) {
                        this.player = 'ai';

                        this.fleet.fleetAiCoord.arr[coord[0] + 1][coord[1] + 1] = -1;
                        this.fleet.fleetAiInput.children.$LI.children[coord[0]].children[coord[1]].children.setState({ img: 'lose.svg' });

                        this.fleet.player.children.setState({
                            animP: 'stay',
                            animAi: 'play'
                        });

                        let pos = Math.round(Math.random() * (this.moveListAi.length - 1));
                        coord = this.moveListAi[pos];
                        this.moveAi(coord, pos);
                    }
                    //Если попали, закращикаем клетку, отнимаем жизнь бота, меняем взыв на крестик по координатам i j, получаем позицию корабля из списка и отнимаем у него жизнь
                    else {
                        this.fleet.fleetAiCoord.arr[coord[0] + 1][coord[1] + 1] = -1;
                        this.fleet.fleetAiInput.children.$LI.children[coord[0]].children[coord[1]].children.setState({ img: 'explosion.gif' });

                        this.lifeAi--;

                        let i = coord[0];
                        let j = coord[1];
                        setTimeout(() => {
                            this.fleet.fleetAiInput.children.$LI.children[i].children[j].children.setState({ img: 'dead.svg' });
                        }, 400);
                        //Если жизни бота кончились то предлогаем переиграть, если да то перерисовываем страницу и обновляем AI
                        if (!this.lifeAi) {
                            this._dealy(510).then(() => {
                                if (confirm('Ура вы попедили, хотите повторить?')) {
                                    Inferno.render(Inferno.createElement('div'), document.getElementById('body'));
                                    let fleetElement = gui.create(2, [this.fleet.form[0], this.fleet.form[1] || 'Бот'], (coord) => { this.moveP(coord); });

                                    fleetElement['form'] = this.fleet.form;
                                    this.init(fleetElement);
                                }
                            });
                        }

                        let ship = this.fleet.fleetAiCoord.fleet[coord[0]][coord[1]];
                        this.fleet.fleetAiTable.children[ship].children.life--;
                        //Если жизни корабля кончились, то закрашиваем границы
                        (!this.fleet.fleetAiTable.children[ship].children.life) ?
                            this._losePast(
                                this.fleet.fleetAiCoord.arr,
                                this.fleet.fleetAiInput,
                                ship,
                                this.fleet.fleetAiTable) :
                            '';
                    }
                }
            }) : '';
            ;
        }
    }

    /**
     * Ход бота
     * @param {Object} coord Координаты поподания
     * @param {Number} pos Позиция в списке ходов
     */
    moveAi(coord, pos) {
        //Почти все тоже что и в moveP поэтому напишу только отличия

        (this.lifeAi > 0 && this.lifeP > 0) ? this._dealy(400).then(() => {
            let deck = this.fleet.fleetPCoord.arr[coord.i + 1][coord.j + 1];
            if (deck === 0) {
                //Удаляет набор координат из списка ходов по позиции
                this.moveListAi.splice(pos, 1);

                this.player = 'p';
                this.fleet.fleetPCoord.arr[coord.i + 1][coord.j + 1] = -1;
                this.fleet.fleetPInput.children.$LI.children[coord.i].children[coord.j].children.setState({ img: 'lose.svg' });

                this.fleet.player.children.setState({
                    animP: 'play',
                    animAi: 'stay'
                });
            } else {
                //Удаляет набор координат из списка ходов по позиции
                this.moveListAi.splice(pos, 1);

                this.fleet.fleetPCoord.arr[coord.i + 1][coord.j + 1] = -1;
                this.fleet.fleetPInput.children.$LI.children[coord.i].children[coord.j].children.setState({ img: 'explosion.gif' });

                this.lifeP--;

                let i = coord.i;
                let j = coord.j;
                setTimeout(() => {
                    this.fleet.fleetPInput.children.$LI.children[i].children[j].children.setState({ img: 'dead.svg' });
                }, 400);
               
                if (!this.lifeP) {
                    this._dealy(510).then(() => {
                        if (confirm('Увы вы проиграли, хотите повторить?')) {
                            Inferno.render(Inferno.createElement('div'), document.getElementById('body'));
                            let fleetElement = gui.create(2, [this.fleet.form[0], this.fleet.form[1] || 'Бот'], (coord) => { this.moveP(coord); });
                            fleetElement['form'] = this.fleet.form;
                            this.init(fleetElement);
                        }
                    });
                }

                let ship = this.fleet.fleetPCoord.fleet[coord.i][coord.j];
                this.fleet.fleetPTable.children[ship].children.life--;

                (!this.fleet.fleetPTable.children[ship].children.life) ?
                    this._losePast(
                        this.fleet.fleetPCoord.arr,
                        this.fleet.fleetPInput,
                        ship,
                        this.fleet.fleetPTable,
                        true
                    ) :
                    '';
                //Из списка ходов выбирае один и вызываем ход бота
                pos = Math.round(Math.random() * (this.moveListAi.length - 1));
                coord = this.moveListAi[pos];
                this.moveAi(coord, pos);
            }
        }) : '';
    }
}