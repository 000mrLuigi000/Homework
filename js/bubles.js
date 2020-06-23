/**
 * Класс компонента bubles.
 * Служит для создания пузырика
 */
export class Bubles extends Inferno.Component {
    constructor(props) {
        super(props);
        this.state = {
            /*
            Сюда записывается:
                название анимации
                номер в пузырике
                имя стандартного класса (впоследствии изменяется при "замораживании")
            */
            animParent: props.style['animation-name'] || 'up',
            animChild: props.style['animation-name'] || '',
            animDuration: 0.5,
            number: props.number || 0,
            className: 'bublesContainer__bubles__content'
        }
    }

    render() {
        return Inferno.createElement('div', {
            className: 'bublesContainer__bubles',
            style: { 'animation-name': this.state.animParent, 'animation-duration': this.state.animDuration + 's' }
        }, Inferno.createElement('div', {
            className: this.state.className,
            style: { 'animation-name': this.state.animChild, 'animation-duration': this.state.animDuration + 's' }
        }, this.state.number));
    }
}