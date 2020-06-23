'use strict';
/**
 * Класс компонента root.
 * Служит созданию ядра контента.
 */
export class Root extends Inferno.Component {
    constructor(props) {
        super(props);
    }

    render() {
        /**
         * В пустышку помещается:
         *  текст приветствия,
         *  контейнер старого массива
         *  вспомогательный текст
         *  контейнер отсортированного массива
         */
        return Inferno.createElement('div', {},
            Inferno.createElement('h1', { className: 'title' }, 'Наглядная сортировка пузырьком\n\nИсходный массив:'),
            Inferno.createElement('div', { id: 'oldContainer'}),
            Inferno.createElement('h1', { className: 'title' }, 'Отсортированный массив:'),
            Inferno.createElement('div', { id: 'newContainer'}),
        );
    }
}