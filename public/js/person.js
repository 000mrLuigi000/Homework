'use strict';
import { Query } from './query.js';

const queryFabric = new Query();

class CardPerson extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let imagine = React.createElement('img', {
            className: 'containerConetnt__form__avatar',
            name: 'avatarPreview',
            src: (this.props.props.avatar) ? this.props.props.avatar : '#',
            alt: ''
        });
        let work = React.createElement('span', { style: { margin: '5px 0' } }, `Что преподает: ${(this.props.props.work) ? this.props.props.work : ''}`);
        let course = React.createElement('span', { style: { margin: '5px 0' } }, `На каком курсе: ${(this.props.props.course) ? this.props.props.course : ''}`);
        let univer = React.createElement('span', { style: { margin: '5px 0' } }, `Университет: ${this.props.props.university}`);
        let birthDate = React.createElement('span', { style: { margin: '5px 0' } }, `Дaта рождения: ${this.props.props.birthDate}`);
        let name = React.createElement('span', { style: { margin: '5px 0' } }, `ФИО: ${this.props.props.name}`);
        let who = React.createElement('span', { style: { margin: '5px 0' } }, `Кто: ${(this.props.props.tag === 'student') ? 'Студент' : 'Преподователь'}`);
        let link = React.createElement('a', { href: '/' }, 'Назад');
        let form = React.createElement('div', { className: 'containerConetnt__form__person' },
            link, who, name, birthDate, univer, course, work, imagine);
        let container = React.createElement('div', { className: 'containerConetnt__form' }, form);

        return container;
    }
}

let params = new URLSearchParams(document.location.search);

queryFabric.select({ search: `${params.get('search')}/${params.get('id')}` }, {}).then(r => ReactDOM.render(React.createElement(CardPerson, { props: r }), body));