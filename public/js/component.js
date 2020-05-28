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
    generate() { }
    /**
     * Загрузка объекта в DOM, занося его в container, при этом в значение this.container заносится полученная из preload() верстка а в this.root записывается container,
     * после весь оьбект передается руководителю
     * @param { document } container Элемент полученный через document
     * @param { object } supervisor Объект руководителя 
     */
    load(container, supervisor) {
        const newComponent = this.generate();
       (typeof newComponent === 'string') ? container.insertAdjacentHTML(this.property.position || 'beforeend', newComponent) : container.insertAdjacentElement(this.property.position || 'beforeend', newComponent);
      //  (typeof newComponent === 'string') ? container.innerHTML = newComponent : container.appendChild(newComponent);   
        this.container = container.lastChild;
        this.root = container;
        supervisor.addElement(this, this.property.id);
    }
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
    }
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
    generate() {
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
    generate() {
        return `` +
            `<section id=${this.property.id} class="content container">` +
            `<h2 class="content__description">Это страница школы Тензор в городе Уфа. Тут вы можете познакомиться с нашими учениками и перподователями, а также посмотреть темы занятий</h2>` +
            `<a class="content__description" href="/administrator/">Перейти в панель адменесрирования </a>` +
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
    generate() {
        const container = document.createElement('div');
        const avatar = document.createElement('img');
        const name = document.createElement('h2');
        const university = document.createElement('h2');

        container.setAttribute('class', 'content__flex__item');

        avatar.setAttribute('class', 'content__flex__item__avatar');
        avatar.setAttribute('src', this.property.avatar);
        avatar.setAttribute('title', `${this.property.name} - ${this.property.university} ${this.property.course} курс`);

        name.setAttribute('class', 'content__flex__item__name');
        name.setAttribute('title', this.property.name);
        name.textContent = this.property.name;

        university.setAttribute('class', 'content__flex__item__univer');
        switch (this.property.tag) {
            case 'student':
                university.setAttribute('title', `${this.property.university} курс ${this.property.course}`);
                university.textContent = `${this.property.university} курс ${this.property.course}`;
                break;
            case 'teacher':
                university.setAttribute('title', `${this.property.university}, ${this.property._getWorkStatus()}`);
                university.textContent = `${this.property.university}, ${this.property._getWorkStatus()}`;
                break;
        }
        this.elements['table'] = container;
        this.elements['university'] = university;

        container.id = this.property.id;
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
    generate() {
        const cardPerson = document.createElement('div');
        const container = document.createElement('div');
        const cartAvatar = document.createElement('img');
        const buttonClose = document.createElement('img');
        const name = document.createElement('span');
        const form1 = document.createElement('span');
        const form2 = document.createElement('span');
        const value1 = document.createElement('span');
        const value2 = document.createElement('span');

        cardPerson.className = 'cart-person';

        container.className = 'cart-person__container';

        cartAvatar.src = this.property.avatar;
        cartAvatar.className = 'cart-person__container__avatar';
        cartAvatar.alt = 'avatar';

        buttonClose.className = 'cart-person__container__close';
        buttonClose.alt = 'exit';
        buttonClose.src = '../icons/close.png'

        name.className = 'cart-person__container__name';
        name.textContent = this.property.name;

        form1.className = 'cart-person__container__form_1';
        form1.textContent = 'День рождения';

        form2.className = 'cart-person__container__form_2';
        form2.textContent = 'Учится в';

        value1.className = 'cart-person__container__value_1';
        value1.textContent = this.property.getBirthDateStr;

        value2.className = 'cart-person__container__value_2';
        value2.textContent = this.property.getUniversity;

        container.appendChild(cartAvatar);
        container.appendChild(buttonClose);
        container.appendChild(name);
        container.appendChild(form1);
        container.appendChild(form2);
        container.appendChild(value1);
        container.appendChild(value2);
        cardPerson.appendChild(container);

        this.elements['close'] = buttonClose;
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
    }
}

class Slider extends Component {
    generate(){
        const container = document.createElement('div');
        const title = document.createElement('h2');
        const containerContent = document.createElement('div');
        const containerButton = document.createElement('div');
        const button1 = document.createElement('button');
        const button2 = document.createElement('button');

        containerContent.id = this.property.id;
        containerContent.className = 'content__flex';

        title.className = 'content__description_title';
        title.textContent = this.property.title;

        containerButton.style = `display: flex; justify-content: center;`;

        button1.className = 'content__buttons';
        button1.textContent = '<';

        button2.className = 'content__buttons';
        button2.textContent = '>';

        this.elements['container'] = containerContent;
        this.elements['left'] = button1;
        this.elements['right'] = button2;

        containerButton.appendChild(button1);
        containerButton.appendChild(button2);

        container.appendChild(title);
        container.appendChild(containerContent);
        container.appendChild(containerButton);

        return container;
    }
    afterLoad(supervisor){
        this._swithPage('right', supervisor);
        this.elements['left'].addEventListener('click', ()=>{
            this._swithPage('left', supervisor);
        });
        this.elements['right'].addEventListener('click', ()=>{
            this._swithPage('right', supervisor);
        });
    }

    _loadItem(data, supervisor, container) {
        data.forEach((property, i) => {
            setTimeout(() => {
                const student = supervisor.getElement('personFactory').createPerson(property);
                student.search = this.property.search;
                let item = supervisor.getElement('factoryElements').createElement('person', container, student, supervisor);
                item.container.classList.add('content__flex__item_active');
            }, 50 * i);
        });
    }

    _swithPage(type, supervisor){
        (type === 'right') ? this.property.page++ : this.property.page--;
        supervisor.getElement('query').select({ search: this.property.search, filter: `_page=${this.property.page}&_limit=3` }, {})
        .then((data) => {
            if ((data.length) && (this.property.page > 0)) {
                let container = document.getElementById(this.property.id);
                let child = container.childNodes;
                let length =  child.length;
                if (length) {
                    for (let i = 0; i < length; i++) {
                        child[i].style.animationName = 'dawn';
                        if (i==child.length - 1){
                            child[child.length - 1].addEventListener('animationend', ()=>{
                                container.innerHTML='';
                                this._loadItem(data, supervisor, container);
                            });
                        }
                    }
                } else {
                    this._loadItem(data, supervisor, container);
                }
            } else (type === 'right') ? this.property.page-- : this.property.page++;
        });
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
            case 'slider':
                const slider = new Slider(property);
                slider.load(container, supervisor);
                slider.afterLoad(supervisor);
                return slider;
        }
    }
}