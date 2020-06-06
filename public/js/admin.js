'use strict';
import { Query } from './query.js';

const queryFabric = new Query();

class Table {

    constructor() {
        this.rows = [];
        this.root = undefined;
    }

    create(data, method, container) {
        this.rows = [];
        ReactDOM.render(React.createElement('tbody'), container);
        let couWor = React.createElement('th', {}, 'Курс/преподает');
        let univer = React.createElement('th', {}, 'Университет');
        let birthDate = React.createElement('th', {}, 'Дата рождения');
        let avatar = React.createElement('th', {}, 'Фото');
        let tag = React.createElement('th', {}, 'Статус');
        let name = React.createElement('th', {}, 'ФИО');
        let id = React.createElement('th', {}, 'id');
        let row = React.createElement('tr', { key: 'headers' }, id, name, tag, avatar, birthDate, univer, couWor);
        data.forEach((item) => {
            item.method = method;
            let person = React.createElement(Item, { props: item, key: item.id + '_' + item.tag });
            this.rows.push(person);
        });
        this.container = React.createElement('tbody', {}, row, this.rows);
        ReactDOM.render(this.container, container);
    }
}

const Element = new Table();

class Root extends React.Component {

    render() {
        let cardPerson = React.createElement('div', { id: 'cardPerson', key: 'cardPerson' });
        let titleTeacher = React.createElement('h2', { style: { textAlign: 'center' } }, 'Преподователи');
        let titleStudent = React.createElement('h2', { style: { textAlign: 'center' } }, 'Студенты');
        let tableTeacher = React.createElement('table', { className: 'containerConetnt__table', id: 'tableTeacher' }, 'Пока пусто');
        let tableStudent = React.createElement('table', { className: 'containerConetnt__table', id: 'tableStudent' }, 'Пока пусто');
        let containerConetnt = React.createElement('div', { className: 'containerConetnt', key: 'content' }, titleStudent, tableStudent, titleTeacher, tableTeacher);
        let back = React.createElement('div', { style: { display: 'flex' }, key: 'back' }, React.createElement('a', { style: { margin: '10px auto' }, href: "/" }, 'Вернутся'));
        let buttonDelete = React.createElement('button', { className: 'containerButton__button', id: 'buttonDelete' }, 'Удалить персону');
        let buttonUpdate = React.createElement('button', { className: 'containerButton__button', id: 'buttonUpdate' }, 'Редактировать персону');
        let buttonCerate = React.createElement('button', { className: 'containerButton__button', id: 'buttonCerate' }, 'Добавить персону');
        let containerButton = React.createElement('div', { className: 'containerButton', key: 'buttons' }, buttonCerate, buttonUpdate, buttonDelete);
        let container = [containerButton, back, containerConetnt, cardPerson];
        return container;
    }

    componentDidMount() {
        document.getElementById('buttonCerate').onclick = () => {
            ReactDOM.render(React.createElement(CardPerson, { props: {} }), document.getElementById('cardPerson'));
        };
        document.getElementById('buttonUpdate').onclick = () => {
            buttonUpdate.disabled = true;
            buttonDelete.disabled = false;
            creaateItem('update');
        };
        document.getElementById('buttonDelete').onclick = () => {
            buttonUpdate.disabled = false;
            buttonDelete.disabled = true;
            creaateItem('delete');
        };
    }
}

ReactDOM.render(React.createElement(Root), document.getElementById('body'));

class CardPerson extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let submit = React.createElement('input', { value: 'Сохранить', type: 'submit' });
        let imagine = React.createElement('img', {
            className: 'containerConetnt__form__avatar',
            name: 'avatarPreview',
            src: (this.props.props.avatar) ? this.props.props.avatar : '#',
            alt: ''
        });
        let inputAvatar = React.createElement('input', { name: 'avatar', type: 'file', required: (!this.props.props.avatar) ? true : false });
        let inputWork = React.createElement('input', {
            disabled: (this.props.props.tag === 'teacher') ? false : true,
            name: 'work',
            type: 'text',
            defaultValue: (this.props.props.work) ? this.props.props.work : '',
            required: true
        });
        let inputCourse = React.createElement('input', {
            disabled: (this.props.props.tag === 'teacher') ? true : false,
            name: 'course',
            type: 'text',
            defaultValue: (this.props.props.course) ? this.props.props.course : '',
            required: true
        });
        let inputUniver = React.createElement('input', { name: 'univer', type: 'text', defaultValue: (this.props.props.university) ? this.props.props.university : '', required: true });
        let inputBirthDate = React.createElement('input', { name: 'birthDate', type: 'date', defaultValue: (this.props.props.birthDate) ? this.props.props.birthDate : '', required: true });
        let inputName = React.createElement('input', { name: 'name', type: 'text', defaultValue: (this.props.props.name) ? this.props.props.name : '', required: true });
        let select2 = React.createElement('option', { value: 'teacher' }, 'Преподователь');
        let select1 = React.createElement('option', { value: 'student' }, 'Студент');
        let inputWho = React.createElement('select', {
            name: 'who',
            defaultValue: (this.props.props.tag === 'teacher') ? 'teacher' : 'student',
            disabled: (this.props.props.tag) ? true : false
        }, select1, select2);
        let avatar = React.createElement('span', { style: { margin: '5px 0' } }, 'Аватарка:');
        let work = React.createElement('span', { style: { margin: '5px 0' } }, 'Что преподает:');
        let course = React.createElement('span', { style: { margin: '5px 0' } }, 'На каком курсе:');
        let univer = React.createElement('span', { style: { margin: '5px 0' } }, 'Университет:');
        let birthDate = React.createElement('span', { style: { margin: '5px 0' } }, 'Дата рождения:');
        let name = React.createElement('span', { style: { margin: '5px 0' } }, 'ФИО:');
        let who = React.createElement('span', { style: { margin: '5px 0' } }, 'Кто:');
        let close = React.createElement('img', { className: 'exit', id: 'close', src: '../icons/close.png' });
        let form = React.createElement('form', { className: 'containerConetnt__form__person', id: 'form' },
            close, who, inputWho, name, inputName, birthDate, inputBirthDate, univer, inputUniver, course, inputCourse, work, inputWork, avatar, inputAvatar, imagine, submit);
        let container = React.createElement('div', { className: 'containerConetnt__form' }, form);

        return container;
    }

    componentDidMount() {
        let form = document.getElementById('form');
        document.getElementById('form').onsubmit = (event) => {
            event.preventDefault();
            let blob = new Blob([form.avatar.files[0]], { type: 'image/jpg' });
            let reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = () => {
                let json = {
                    'id': this.props.props.id,
                    'tag': form.who.value,
                    'name': form.name.value,
                    'birthDate': form.birthDate.value,
                    'university': form.univer.value,
                    'course': form.course.value || '',
                    'work': form.work.value || '',
                    'avatar': (blob.size > 9) ? reader.result : this.props.props.avatar
                };
                requare(this.props.props.method || 'create', json);
                ReactDOM.render(React.createElement('div'), document.getElementById('cardPerson'));
            }
        };
        document.getElementById('close').onclick = () => {
            ReactDOM.render(React.createElement('div'), document.getElementById('cardPerson'));
        };
        form.who.onchange = () => {
            switch (form.who.value) {
                case 'student':
                    form.course.disabled = false;
                    form.work.disabled = true;
                    break;
                case 'teacher':
                    form.course.disabled = true;
                    form.work.disabled = false;
                    break;
            }
        };
        form.avatar.onchange = () => {
            let blob = new Blob([form.avatar.files[0]], { type: 'image/jpg' });
            form.avatarPreview.src = URL.createObjectURL(blob);
        };
    }
}

class Item extends React.Component {

    constructor(props) {
        super(props);
        this.method = props.props.method;
        this.id = props.props.id + '_' + props.props.tag;
    }

    render() {
        let couWor = React.createElement('td', { className: 'containerConetnt__table__elem' }, this.props.props.course || this.props.props.work || '');
        let univer = React.createElement('td', { className: 'containerConetnt__table__elem' }, this.props.props.university);
        let birthDate = React.createElement('td', { className: 'containerConetnt__table__elem' }, this.props.props.birthDate);
        let image = React.createElement('img', { style: { width: '50px', height: '50px', objectFit: 'cover' }, src: this.props.props.avatar });
        let avatar = React.createElement('td', { className: 'containerConetnt__table__elem' }, image);
        let tag = React.createElement('td', { className: 'containerConetnt__table__elem' }, (this.props.props.tag === 'student') ? 'Студент' : 'Преподователь');
        let name = React.createElement('td', { className: 'containerConetnt__table__elem' }, this.props.props.name);
        let id = React.createElement('td', { className: 'containerConetnt__table__elem' }, this.props.props.id);
        let container = React.createElement('tr', { className: 'containerConetnt__table__item', id: this.id, key: this.id }, id, name, tag, avatar, birthDate, univer, couWor);
        return container;
    }

    componentDidMount() {
        document.getElementById(this.id).onclick = () => {
            if (this.method === 'update') {
                ReactDOM.render(React.createElement(CardPerson, { props: this.props.props }), document.getElementById('cardPerson'));
            } else {
                delet(this.props.props, this.method);
            }
        };
    }
}

function requare(method, json) {
    if (method === 'create') {
        queryFabric.create({
            search: json.tag
        },
            {
                body: JSON.stringify(json),
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }).then(r => {
                alert(`Персона добавлена`); 
                creaateItem('update');
            });
    } else {
        queryFabric.update({
            search: `${json.tag}/${json.id}`
        },
            {
                body: JSON.stringify(json),
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            }).then(r => {
                alert(`Персона изменена`); 
                creaateItem('update');
            });
    }
};

function delet(property, method) {
    queryFabric.delete({ search: `${property.tag}/${property.id}` }, {}).then(resolve => {
        alert(`Персона удалена`);
        if (property.tag === 'student') {
            queryFabric.select({ search: 'student' }, {}).then(r => Element.create(r, method, document.getElementById('tableStudent')));
        } else {
            queryFabric.select({ search: 'teacher' }, {}).then(r => Element.create(r, method, document.getElementById('tableTeacher')));
        }
    });
}

function creaateItem(method) {
    queryFabric.select({ search: 'student' }, {}).then(r => Element.create(r, method, document.getElementById('tableStudent'))).then(r => {
        queryFabric.select({ search: 'teacher' }, {}).then(r => Element.create(r, method, document.getElementById('tableTeacher')));
    });
}