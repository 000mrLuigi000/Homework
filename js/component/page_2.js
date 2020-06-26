'use strict';
/**
 * Класс компонента Page2.
 * Служит созданию второй страницы.
 */
export class Page2 extends Inferno.Component {
    constructor(props) {
        super(props);
        this.state = {
            animP: 'play', //анимация для имени игрока
            animAi: ''     //анимация для имени противника
        };
    }

    render() {
        /**
         * Создается два имени и контейнер для самой игры
         */
        return Inferno.createElement('div', {},
            Inferno.createElement('div', { className: 'nameContainer' },
                Inferno.createElement('h3', {
                    className: 'nameContainer__name',
                    style: { 'animation-name': this.state.animP }
                },this.props.name[0]),
                Inferno.createElement('h3', { 
                    className: 'nameContainer__name',
                    style: { 'animation-name': this.state.animAi }
                }, this.props.name[1])
            ),
            Inferno.createElement('div', { id: 'main' })
        );
    }
}