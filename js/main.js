'use strict'

class Person {
    constructor(person) {
        this.name = person.name;
        this.birthDate = person.birthDate;
        this.university = person.university;
        this.course = person.course;
        this.avatar = person.photoDerect;
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
    get getUniversity() {
        return `${this.university}, ${this.course} курс`;
    }
    createCart() {
        const div = document.createElement('div');
        const avatar = document.createElement('img');
        const name = document.createElement('h2');
        const university = document.createElement('h2');

        div.setAttribute('class', 'content__flex__item');

        avatar.setAttribute('class', 'content__flex__item__avatar');
        avatar.setAttribute('src', `img/${this.avatar}`);
        avatar.setAttribute('title', `${this.name} - ${this.university} ${this.course} курс`);

        name.setAttribute('class', 'content__flex__item__name');
        name.setAttribute('title', this.name);
        name.innerHTML = this.name;

        university.setAttribute('class', 'content__flex__item__univer');
        university.setAttribute('title', `${this.university} курс ${this.course}`);
        university.innerHTML = `${this.university} курс ${this.course}`;

        div.appendChild(avatar);
        div.appendChild(name);
        div.appendChild(university);

        div.addEventListener('click', () => {
            let personCart = document.getElementById('cart-person');
            let buttonClose = document.getElementById('close');
            let cartAvatar = document.getElementById('cart-avatar');
            let name = document.getElementById('cart-name');
            let value1 = document.getElementById('cart-value-2');
            let value2 = document.getElementById('cart-value-1');
            cartAvatar.setAttribute('src', `img/${this.avatar}`);
            name.innerHTML = this.name;
            value1.innerHTML = this.getUniversity;
            value2.innerHTML = this.getBirthDateStr;
            personCart.style.display = 'flex';
            buttonClose.addEventListener('click', () => {
                personCart.style.display = 'none';
            });
        });
        return div;
    }
}

let studentArr = [
    {
        name: 'Иванов Иван',
        birthDate: new Date(2000, 5, 2),
        university: 'МГУ',
        course: 2,
        photoDerect: 'ava01.jpg'
    },
    {
        name: 'Махина-Игнатова Алина',
        birthDate: new Date(1999, 8, 6),
        university: 'СПбГУ',
        course: 3,
        photoDerect: 'ava02.jpg'
    },
    {
        name: 'Рузавлин Павел ',
        birthDate: new Date(2002, 4, 1),
        university: 'БФУ им. И.Каната',
        course: 1,
        photoDerect: 'ava03.jpg'
    },
    {
        name: 'Можегов Олег',
        birthDate: new Date(2002, 2, 4),
        university: 'ТГУ',
        course: 1,
        photoDerect: 'ava04.jpg'
    },
    {
        name: 'Крылова Кристина',
        birthDate: new Date(1998, 5, 15),
        university: 'НГУ',
        course: 4,
        photoDerect: 'ava05.jpg'
    },
    {
        name: 'Краснов Михаил',
        birthDate: new Date(1999, 10, 20),
        university: 'ЮФУ',
        course: 3,
        photoDerect: 'ava06.jpg'
    }
];

let personContainer = document.getElementById('person-container');

studentArr.forEach((person) => {
    const student = new Person(person);
    const studentCart = student.createCart();
    personContainer.appendChild(studentCart);
});