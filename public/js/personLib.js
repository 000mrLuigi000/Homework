'use strict'

class Person {

    constructor(person) {
        this.name = person.name;
        this.birthDate = person.birthDate;
        this.university = person.university;
        this.course = person.course;
        this.avatar = person.avatar;
        this.status;
    }

    get getBirthDateStr() {
        const month = [
            'Января', 'Февраля',
            'Марта', 'Апреля', 'Мая',
            'Июня', 'Июля', 'Августа',
            'Сентября', 'Октября', 'Ноября',
            'Декабря'
        ];
        return `${this.birthDate.getDate()} ${month[this.birthDate.getMonth()]}, ${this.age}`;
    }

    get age() {
        let curDate = new Date;
        let ages = curDate.getFullYear() - this.birthDate.getFullYear();
        let before = '';
        if (ages % 10 == 1) { before = 'год' }
        else if ((ages % 10 > 1) && (ages % 10 < 5)) { before = 'года' }
        else { before = 'лет' };
        return `${ages} ${before}`;
    }

    get getUniversity() { }

    createCart(tag, url, school) {
        const div = document.createElement('div');
        const avatar = document.createElement('img');
        const name = document.createElement('h2');
        const university = document.createElement('h2');

        div.setAttribute('class', 'content__flex__item');

        avatar.setAttribute('class', 'content__flex__item__avatar');
        avatar.setAttribute('src', `../img/${this.avatar}`);
        avatar.setAttribute('title', `${this.name} - ${this.university} ${this.course} курс`);

        name.setAttribute('class', 'content__flex__item__name');
        name.setAttribute('title', this.name);
        name.innerHTML = this.name;

        university.setAttribute('class', 'content__flex__item__univer');
        switch(tag){
            case 'student':
                university.setAttribute('title', `${this.university} курс ${this.course}`);
                university.innerHTML = `${this.university} курс ${this.course}`;
                break;
            case 'teacher':
                university.setAttribute('title' ,`${this.university}, ${this._getWorkStatus()}`);
                university.innerHTML = `${this.university}, ${this._getWorkStatus()}`;
                break;
        }

        div.appendChild(avatar);
        div.appendChild(name);
        div.appendChild(university);

        div.addEventListener('click', () => {
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
            
            cartAvatar.src = `../img/${this.avatar}`;
            cartAvatar.className = 'cart-person__container__avatar';
            cartAvatar.alt = 'avatar';

            buttonClose.className = 'cart-person__container__close';
            buttonClose.alt = 'exit';
            buttonClose.src = '../icons/close.png'

            buttonDel.className = 'cart-person__container__delete';
            switch(tag){
                case 'student':
                    buttonDel.innerHTML = 'Исключить';
                    break;
                case 'teacher':
                    buttonDel.innerHTML = 'Уволить';
                    break;
            }

            buttonUp.className = 'cart-person__container__delete';
            buttonUp.innerHTML = 'Перевести на следующий курс';

            name.className = 'cart-person__container__name';
            name.innerHTML = this.name;
            
            form1.className = 'cart-person__container__form_1';
            form1.innerHTML = 'День рождения';

            form2.className = 'cart-person__container__form_2';
            form2.innerHTML = 'Учится в';

            value2.className = 'cart-person__container__value_2';
            value2.innerHTML = this.getUniversity;

            value1.className = 'cart-person__container__value_1';
            value1.innerHTML = this.getBirthDateStr;

            container.appendChild(cartAvatar);
            container.appendChild(buttonClose);
            container.appendChild(buttonDel);
            switch(tag){
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
            url.appendChild(cardPerson);

            buttonClose.addEventListener('click', () => {
                url.removeChild(cardPerson);
            });

            buttonDel.addEventListener('click', () => {
                url.removeChild(cardPerson);
                url.removeChild(div);
                school.removePerson(tag,this);
            });

            buttonUp.addEventListener('click', () => {
                if (this.course < 6){
                    this.choseCourse(1);
                    value2.innerHTML = this.getUniversity;
                    university.innerHTML = `${this.university} курс ${this.course}`;
                } else alert("Студент и так на последнем курсе")
            });
        });
        url.appendChild(div);
    }
}

class Student extends Person {
    constructor(person) {
        super(person);
        this.course = person.course;
        this.status = 'live';
    }
    get getUniversity() {
        console.log(`${this.university} ${this.course} курс`);
        return `${this.university} ${this.course} курс`;
    }
    choseCourse(up) {
        this.course += up;
    }
}

class Teacher extends Person {
    constructor(person) {
        super(person);
        this.work = person.work;
        this.status = 'live';
    }
    get getUniversity() {
        console.log(`${this.university} ${this._getWorkStatus()}`);
        return `${this.university} \n ${this._getWorkStatus()}`;
    }
    _getWorkStatus() {
        return `Преподает: ${this.work}`;
    }
}

export class PersonFactory {
    create(tag, person) {
        switch (tag) {
            case 'student':
                return new Student(person);
            case 'teacher':
                return new Teacher(person);
        }
    }
}