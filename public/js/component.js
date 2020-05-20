class Component {
    'use strict';
    /**
     * Создает компанент занося в property полученный стек данных,
     * в container и root undefined, инициализирует массив активных или изменямых оьбектов
     * @param { object } property 
     */
    constructor(property) {
        this.property = property;
        this.container = undefined;
        this.elements = [];
        this.root = undefined;
    }
    /**
     * Функция срабатываемая до создания элемента, служит для создвния верстки объткта (ДЛЯ КАЖДОГО ЭЛЕМЕНТА СВОЕ ПЕРЕОПРЕДЕЛЕНИЕ)
     */
    preLoad() { }
    /**
     * Загрузка объекта в DOM, занося его в container, при этом в значение this.container заносится полученная из preload() верстка а в this.root записывается container,
     * после весь оьбект передается руководителю
     * @param { document } container Элемент полученный через document
     * @param { object } supervisor Объект руководителя 
     */
    load(container, supervisor) {
        const newComponent = this.preLoad(this.property);
        (typeof newComponent === 'string') ? container.insertAdjacentHTML(this.property.position || 'beforeend', newComponent) : container.insertAdjacentElement(this.property.position || 'beforeend', newComponent);
        this.container = container.lastChild;
        this.root = container;
        supervisor.addElement(this, this.property.id);
    };
    /**
     * Функция срабатываемая после создания элемента, служит для создвния активностей на элементах (ДЛЯ КАЖДОГО ЭЛЕМЕНТА СВОЕ ПЕРЕОПРЕДЕЛЕНИЕ)
     */
    afterLoad() { };
    /**
     * Удаления элемента из DOM и его затирка
     */
    unload() {
        this.container.remove();
        this.elements.forEach((buton) => {
            buton.removeEventLinister();
        });
        this.elements = undefined;
        this.container = undefined;
    };
    /**
     * Функция обновляет элемент (ДЛЯ КАЖДОГО ЭЛЕМЕНТА СВОЕ ПЕРЕОПРЕДЕЛЕНИЕ)
     */
    update(){};
}

class Header extends Component {
    'use strict';
    /**
     * Функция срабатываемая до создания элемента, служит для создвния верстки объткта
     * @returns { string } Возвращает html элемент
     */
    preLoad() {
        return `` +
            `<header class="logo container">` +
            `<img class="logo__img" src="img/logo.jpg" alt="avatar">` +
            `<h1 class="logo__title">Tensor Shcool</h1>` +
            `<div class="space"></div>` +
            `<div class="logo__subline"></div>` +
            `</header>`;
    }
}

class Content extends Component {
    'use strict';
    /**
     * Функция срабатываемая до создания элемента, служит для создвния верстки объткта
     * @returns { string } Возвращает html элемент
     */
    preLoad() {
        return `` +
            `<section id="main-container" class="content container">` +
            `<h2 class="content__description">Это страница школы Тензор в городе Уфа. Тут вы можете познакомиться с нашими учениками и перподователями, а также посмотреть темы занятий</h2>` +
            `<h2 class="content__description_title">Студенты</h2>` +
            `<div id="student-container" class="content__flex"></div>` +
            `<h2 class="content__description_title">Перподователи</h2>` +
            `<div id="teacher-container" class="content__flex"></div>` +
            `</section>`;
    }
}

class Person extends Component {
    'use strict';
    /**
     * Функция срабатываемая до создания элемента, служит для создвния верстки объткта
     * @param { object } property Данные для создвния верстки обьекта
     * @returns { object } Возвращает documet элемент
     */
    preLoad(property) {
        const container = document.createElement('div');
        const avatar = document.createElement('img');
        const name = document.createElement('h2');
        const university = document.createElement('h2');

        container.setAttribute('class', 'content__flex__item');

        avatar.setAttribute('class', 'content__flex__item__avatar');
        avatar.setAttribute('src', `../img/${property.avatar}`);
        avatar.setAttribute('title', `${property.name} - ${property.university} ${property.course} курс`);

        name.setAttribute('class', 'content__flex__item__name');
        name.setAttribute('title', property.name);
        name.textContent = property.name;

        university.setAttribute('class', 'content__flex__item__univer');
        switch (property.tag) {
            case 'student':
                university.setAttribute('title', `${property.university} курс ${property.course}`);
                university.textContent = `${property.university} курс ${property.course}`;
                break;
            case 'teacher':
                university.setAttribute('title', `${property.university}, ${property._getWorkStatus()}`);
                university.textContent = `${property.university}, ${property._getWorkStatus()}`;
                break;
        }
        this.elements['table'] = container;
        this.elements['university'] = university;

        container.appendChild(avatar);
        container.appendChild(name);
        container.appendChild(university);
        return container;
    }
    /**
     * Функция срабатываемая после создания элемента, служит для создвния активностей на элементах
     * Добовляет к кнопкам действия по клику: создание карточки персоны
     * @param { object } supervisor Объект руководителя
     */
    afterLoad(supervisor) {
        this.elements['table'].addEventListener('click', () => {
            supervisor.getElement('factoryElements').createElement('personCard', document.body, this.property, supervisor);
        });
    }
    /**
     * Функция обновляет элемент: значене курса/должности после его изменения
     */
    update(){
        switch (this.property.tag) {
            case 'student':
                this.elements['university'].setAttribute('title', `${this.property.university} курс ${this.property.course}`);
                this.elements['university'].textContent = `${this.property.university} курс ${this.property.course}`;
                break;
            case 'teacher':
                this.elements['university'].setAttribute('title', `${this.property.university}, ${this.property._getWorkStatus()}`);
                this.elements['university'].textContent = `${this.property.university}, ${this.property._getWorkStatus()}`;
                break;
        }
    }
}

class PersonCard extends Component {
    'use strict';
     /**
     * Создает компанент занося в property полученный стек данных,
     * в container и root undefined, инициализирует массив активных или изменямых оьбектов
     * меняет id на id персоны на которой было вызванно создание + "_card"
     * @param { object } property 
     */
    constructor(property) {
        super(property);
        this.property.id = property.id + '_card';
    }
    /**
     * Функция срабатываемая до создания элемента, служит для создвния верстки объткта
     * @param { object } property Данные для создвния верстки обьекта
     * @returns { object } Возвращает documet элемент
     */
    preLoad(property) {
        const cardPerson = document.createElement('div');
        const container = document.createElement('div');
        const cartAvatar = document.createElement('img');
        const buttonClose = document.createElement('img');
        const buttonDel = document.createElement('div');
        const buttonUp = document.createElement('div');
        const name = document.createElement('span');
        const form1 = document.createElement('span');
        const form2 = document.createElement('span');
        const value1 = document.createElement('span');
        const value2 = document.createElement('span');

        cardPerson.className = 'cart-person';

        container.className = 'cart-person__container';

        cartAvatar.src = `../img/${property.avatar}`;
        cartAvatar.className = 'cart-person__container__avatar';
        cartAvatar.alt = 'avatar';

        buttonClose.className = 'cart-person__container__close';
        buttonClose.alt = 'exit';
        buttonClose.src = '../icons/close.png'

        buttonDel.className = 'cart-person__container__delete';
        switch (property.tag) {
            case 'student':
                buttonDel.textContent = 'Исключить';
                break;
            case 'teacher':
                buttonDel.textContent = 'Уволить';
                break;
        }

        buttonUp.className = 'cart-person__container__delete';
        buttonUp.textContent = 'Перевести на следующий курс';

        name.className = 'cart-person__container__name';
        name.textContent = property.name;

        form1.className = 'cart-person__container__form_1';
        form1.textContent = 'День рождения';

        form2.className = 'cart-person__container__form_2';
        form2.textContent = 'Учится в';

        value1.className = 'cart-person__container__value_1';
        value1.textContent = property.getBirthDateStr;

        value2.className = 'cart-person__container__value_2';
        value2.textContent = property.getUniversity;

        container.appendChild(cartAvatar);
        container.appendChild(buttonClose);
        container.appendChild(buttonDel);
        switch (property.tag) {
            case 'student':
                container.appendChild(buttonUp);
                break;
        }
        container.appendChild(name);
        container.appendChild(form1);
        container.appendChild(form2);
        container.appendChild(value1);
        container.appendChild(value2);
        cardPerson.appendChild(container);

        this.elements['value2'] = value2;
        this.elements['close'] = buttonClose;
        this.elements['delete'] = buttonDel;
        this.elements['upper'] = buttonUp;
        return cardPerson;
    }
    /**
     * Функция срабатываемая после создания элемента, служит для создвния активностей на элементах
     * Добовляет к кнопкам действия по клику: удаление карточки персоны, удаление карточки персоны + удаление из списка студеноов + удаление самого студента из DOM,
     * повышение студента на курс
     * @param { object } supervisor Объект руководителя
     */
    afterLoad(supervisor) {
        this.elements['close'].addEventListener('click', () => {
            supervisor.removeElement(this.property.id);
        });
        this.elements['delete'].addEventListener('click', () => {
            supervisor.getElement('scholl').removePerson(this.property);
            supervisor.removeElement(this.property.id);
            supervisor.removeElement(this.property.id.split('_', 1));
        });
        this.elements['upper'].addEventListener('click', () => {
            supervisor.getElement(this.property.id.split('_', 1)).property.upCourse();
            supervisor.getElement(this.property.id).update();
            supervisor.getElement(this.property.id.split('_', 1)).update();
        });
    }
    /**
     * Функция обновляет элемент: значене курса/должности после его изменения
     */
    update(){
        this.elements['value2'].textContent = this.property.getUniversity;
    }
}

export class FactoryElements {
    'use strict';
    /**
     * Фабрика строит элемент исходя из его element и других данных помещая его в container
     * @param { string } element Определенное название элемента header | content | person | personCard
     * @param { document } container Элемент полученный через document
     * @param { object } property Данные для построения элемента (необходим id)
     * @param { object } supervisor Объект руководителя
     * @returns { object } Вернет построеный элемент
     */
    createElement(element, container, property, supervisor) {
        switch (element) {
            case 'header':
                const header = new Header(property);
                header.load(container, supervisor);
                return header;
            case 'content':
                const content = new Content(property);
                content.load(container, supervisor);
                return content;
            case 'person':
                const person = new Person(property);
                person.load(container, supervisor);
                person.afterLoad(supervisor);
                return person;
            case 'personCard':
                const personCard = new PersonCard(property);
                personCard.load(container, supervisor);
                personCard.afterLoad(supervisor);
                return personCard;
        }
    }
}