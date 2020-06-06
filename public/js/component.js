'use strict';
class Header extends React.Component {
    'use strict';

    render() {
        let title = React.createElement('h1', { className: 'logo__title' }, 'Tensor Shcool');
        let subLine = React.createElement('div', { className: 'logo__subline' });
        let space = React.createElement('div', { className: 'space' });
        let logo = React.createElement('img', { className: 'logo__img', src: 'img/logo.jpg', alt: 'aatar' });
        let header = React.createElement('div', { className: 'logo container' }, logo, title, space, subLine);
        return header;
    }
}

class Content extends React.Component {
    'use strict';

    render() {
        let description = React.createElement('h2', { className: 'content__description' }, 'Это страница школы Тензор в городе Уфа. Тут вы можете познакомиться с нашими учениками и перподователями, а также посмотреть темы занятий');
        let link = React.createElement('a', { className: 'content__description', href: '/administrator/' }, 'Перейти в панель адменесрирования');
        let content = React.createElement('div', { className: 'content container' }, description, link);
        return content;
    }
}

class Person extends React.Component {
    'use strict';

    constructor(props) {
        super(props);
        this.supervisor = props.props.supervisor;
    }

    render() {
        let university;
        switch (this.props.props.tag) {
            case 'student':
                university = React.createElement('h2', { className: 'content__flex__item__univer', title: `${this.props.props.university} курс ${this.props.props.course}` }, `${this.props.props.university} курс ${this.props.props.course}`);
                break;
            case 'teacher':
                university = React.createElement('h2', { className: 'content__flex__item__univer', title: `${this.props.props.university}, ${this.props.props._getWorkStatus()}` }, `${this.props.props.university}, ${this.props.props._getWorkStatus()}`);
                break;
        }
        let name = React.createElement('h2', { className: 'content__flex__item__name', title: this.props.props.name }, this.props.props.name);
        let avatar = React.createElement('img', { className: 'content__flex__item__avatar', id: this.props.props.id + this.props.props.search + 'avatar', src: this.props.props.avatar, alt: 'avatar' });
        let container = React.createElement('div', { className: 'content__flex__item', id: this.props.props.id + this.props.props.search }, avatar, name, university);

        return container;
    }

    componentDidMount() {
        let card;
        document.getElementById(this.props.props.id + this.props.props.search + 'avatar').onmouseenter = () => {
            let props = this.props.props;
            let person = document.getElementById(this.props.props.id + this.props.props.search + 'avatar');
            let personPos = person.getBoundingClientRect();
            (personPos.x + 600 <= document.body.clientWidth) ? props.direct = 'right' : props.direct = 'left';
            card = this.supervisor.getElement('factoryElements').createElement('personCard', document.getElementById('personCard'), props);
            ReactDOM.render(card, document.getElementById('personCard'));
            let personCard = document.getElementById(this.props.props.id + this.props.props.search + '_card');
            (personPos.x + 600 <= document.body.clientWidth) ?
                personCard.setAttribute('style', `left: ${personPos.x - 10}px; top: ${personPos.y - 10 + pageYOffset}px;`) :
                personCard.setAttribute('style', `left: ${personPos.x + 10 - 300}px; top: ${personPos.y - 10 + pageYOffset}px;`);
        };
    }
}

class PersonCard extends React.Component {
    'use strict';

    constructor(props) {
        super(props);
        this.state = { props: props.props, id: props.props.id + props.props.search + '_card' };
    }

    render() {
        let value2 = React.createElement('span', { className: 'cart-person__container__value_2', title: this.props.props.name, style: { gridColumn: (this.state.props.direct === 'right') ? 2 : 1 } }, this.props.props.getUniversity);
        let value1 = React.createElement('span', { className: 'cart-person__container__value_1', title: this.props.props.name, style: { gridColumn: (this.state.props.direct === 'right') ? 2 : 1 } }, this.props.props.getBirthDateStr);
        let form2 = React.createElement('span', { className: 'cart-person__container__form_2', title: this.props.props.name, style: { gridColumn: (this.state.props.direct === 'right') ? 2 : 1 } }, 'ВУЗ:');
        let form1 = React.createElement('span', { className: 'cart-person__container__form_1', title: this.props.props.name, style: { gridColumn: (this.state.props.direct === 'right') ? 2 : 1 } }, 'День рождения:');
        let name = React.createElement('span', { className: 'cart-person__container__name', title: this.props.props.name, style: { gridColumn: (this.state.props.direct === 'right') ? 2 : 1 } }, this.props.props.name);
        let avatar = React.createElement('img', {className: 'cart-person__container__avatar', src: this.props.props.avatar, alt: 'avatar' });
        let link = React.createElement('a', { className: 'cart-person__container__avatar', style: { gridColumn: (this.state.props.direct === 'right') ? 1 : 2 }, href: `/person/?id=${this.props.props.id}&search=${this.props.props.search}` },avatar);
        let container = React.createElement('div', { className: (this.state.props.direct === 'right') ? 'cart-person__container' : 'cart-person__container__left', id: this.state.id }, link, name, form1, value1, form2, value2);

        return container;
    }

    componentDidMount() {
        document.getElementById(this.props.props.id + this.props.props.search + '_card').onmouseleave = (e) => {
            ReactDOM.render('', document.getElementById('personCard'));
        };
    }

}

class Slider extends React.Component {
    'use strict';

    constructor(props) {
        super(props);
        this.supervisor = props.props.supervisor;
        this.page = props.props.page;
        this.state = { personList: [] };
        this._loadItem = this._loadItem.bind(this);
        this._swithPage = this._swithPage.bind(this);
    }

    render() {
        let title = React.createElement('h2', { className: 'content__description_title' }, this.props.props.title);
        let button1 = React.createElement('button', { className: 'content__buttons', id: this.props.props.id + '_left' }, '<');
        let button2 = React.createElement('button', { className: 'content__buttons', id: this.props.props.id + '_right' }, '>');
        let containerButton = React.createElement('div', { style: { display: 'flex', justifyContent: 'center' } }, button1, button2);
        let containerContent = React.createElement('div', { className: 'content__flex', id: this.props.props.id });
        let container = React.createElement('div', {}, title, containerContent, containerButton);

        return container;
    }

    componentDidMount() {
        this._swithPage('right');
        document.getElementById(this.props.props.id + '_left').addEventListener('click', () => {
            this._swithPage('left');
        });
        document.getElementById(this.props.props.id + '_right').addEventListener('click', () => {
            this._swithPage('right');
        });
    }

    _loadItem(data, container) {
        this.setState({ personList: [] });
        data.forEach((item) => {
            const student = this.supervisor.getElement('personFactory').createPerson(item);
            student.search = this.props.props.search;
            student.supervisor = this.supervisor;
            let person = this.supervisor.getElement('factoryElements').createElement('person', container, student);
            this.state.personList.push(person);
        });
        ReactDOM.render(this.state.personList, container);
    }

    _swithPage(type) {
        (type === 'right') ? this.page++ : this.page--;
        this.supervisor.getElement('query').select({ search: this.props.props.search, filter: `_page=${this.page}&_limit=3` }, {})
            .then((data) => {
                if ((data.length) && (this.page > 0)) {
                    let container = document.getElementById(this.props.props.id);
                    this._loadItem(data, container);
                } else (type === 'right') ? this.page-- : this.page++;
            });
    }
}

export class FactoryElements {
    'use strict';
    /**
     * Фабрика строит элемент исходя из его element и других данных помещая его в container
     * @param { string } element Определенное название элемента header | content | person | personCard
     * @param { document } container Элемент полученный через document
     * @param { object } props Данные для построения элемента (необходим id)
     * @returns { object } Вернет построеный элемент
     */
    createElement(element, container, props) {
        switch (element) {
            case 'header':
                const header = new Header(props);
                ReactDOM.render(header.render(), container);
                return header;
            case 'content':
                const content = new Content(props);
                ReactDOM.render(content.render(), container);
                return content;
            case 'person':
                const personItem = React.createElement(Person, { props: props, key: props.id });
                return personItem;
            case 'personCard':
                const personCard = React.createElement(PersonCard, { props: props, key: props.id });
                return personCard;
            case 'slider':
                const slider = React.createElement(Slider, { props: props, key: props.id });
                ReactDOM.render(slider, container);
                return slider;
        }
    }
}