class Person {
    'use strict';
    /**
     * Создает персону с тем же набором ключей и згачений, как и у входязего обьекта
     * @param { object } person Обьект с ключами и их значениями
     * @constructor 
     */
    constructor(person) {
        for (let key in person) {
            this[key] = person[key];
        }
    }
    /**
     * Возвращает дату дня рождения в виде "01 января 1999"
     * @returns { string } Дата
     */
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
    /**
     * Возвращет количество лет персоны с учетом лексики (22 года, 5 лет, 1 год)
     * @returns { string } Количество лет
     */
    get age() {
        let curDate = new Date;
        let ages = curDate.getFullYear() - this.birthDate.getFullYear();
        let before = '';
        if (ages % 10 == 1) { before = 'год' }
        else if ((ages % 10 > 1) && (ages % 10 < 5)) { before = 'года' }
        else { before = 'лет' };
        return `${ages} ${before}`;
    }
    /**
     * Возвращает данные о том в каком университете и на каком курсе студент / или что преподает (ПЕРЕОПРЕДЕЛЯЕТСЯ В ДРУГИХ КЛАССАХ)
     */
    get getUniversity() { }
}

class Student extends Person {
    'use strict';
    /**
     * Возвращает данные о том в каком университете и на каком курсе студент
     * @returns { string }
     */
    get getUniversity() {
        return `${this.university} ${this.course} курс`;
    }
    /**
     * Служит для назначения студента на новый курс
     */
    upCourse() {
        (this.course < 6) ? this.course ++ : alert('Студент и так на последнем курсе');
    }
}

class Teacher extends Person {
    'use strict';
    /**
     * Возвращает данные о том в каком университете и что преподает учитель
     * @returns { string }
     */
    get getUniversity() {
        return `${this.university} ${this._getWorkStatus()}`;
    }
    /**
     * Возвращает должность занимаемую преподователем
     * @returns { string }
     * @private
     */
    _getWorkStatus() {
        return `Преподает: ${this.work}`;
    }
}

export class PersonFactory {
    'use strict';
    /**
     * Фабрика создает персона исходя от значения tag
     * @param { object } person Данные о обьекте для создания
     * @returns { object }
     */
    createPerson(person) {
        switch (person.tag) {
            case 'student':
                return new Student(person);
            case 'teacher':
                return new Teacher(person);
        }
    }
}