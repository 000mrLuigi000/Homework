export class DataBase {
    'use strict'
    constructor() {
        /*
        Хранит список студентов.
        */
        this.studentArr = [
            {
                tag: 'student',
                id: Math.floor(Math.random() * 10000000),
                name: 'Иванов Иван',
                birthDate: new Date(2000, 5, 2),
                university: 'МГУ',
                course: 2,
                avatar: 'ava01.jpg'
            },
            {
                tag: 'student',
                id: Math.floor(Math.random() * 10000000),
                name: 'Махина-Игнатова Алина',
                birthDate: new Date(1999, 8, 6),
                university: 'СПбГУ',
                course: 3,
                avatar: 'ava02.jpg'
            },
            {
                tag: 'student',
                id: Math.floor(Math.random() * 10000000),
                name: 'Рузавлин Павел',
                birthDate: new Date(2002, 4, 1),
                university: 'БФУ им. И.Каната',
                course: 1,
                avatar: 'ava03.jpg'
            },
            {
                tag: 'student',
                id: Math.floor(Math.random() * 10000000),
                name: 'Можегов Олег',
                birthDate: new Date(2002, 2, 4),
                university: 'ТГУ',
                course: 1,
                avatar: 'ava04.jpg'
            },
            {
                tag: 'student',
                id: Math.floor(Math.random() * 10000000),
                name: 'Крылова Кристина',
                birthDate: new Date(1998, 5, 15),
                university: 'НГУ',
                course: 4,
                avatar: 'ava05.jpg'
            },
            {
                tag: 'student',
                id: Math.floor(Math.random() * 10000000),
                name: 'Краснов Михаил',
                birthDate: new Date(1999, 10, 20),
                university: 'ЮФУ',
                course: 3,
                avatar: 'ava06.jpg'
            }
        ];
        /*
        Хранит список преподователей.
        */
        this.teacherArr = [
            {
                tag: 'teacher',
                id: Math.floor(Math.random() * 10000000),
                name: 'Протасевич Михаил',
                birthDate: new Date(1980, 5, 2),
                university: 'МГУ',
                work: 'Математически анализ',
                avatar: 'ava01.jpg'
            },
            {
                tag: 'teacher',
                id: Math.floor(Math.random() * 10000000),
                name: 'Двоеглазова Татьяна',
                birthDate: new Date(1974, 8, 6),
                university: 'СПбГУ',
                work: 'Философия',
                avatar: 'ava02.jpg'
            },
            {
                tag: 'teacher',
                id: Math.floor(Math.random() * 10000000),
                name: 'Билл Гейтс',
                birthDate: new Date(1968, 4, 1),
                university: 'БФУ им. И.Каната',
                work: 'Программирование',
                avatar: 'ava03.jpg'
            }
        ];
    }
    /**
    * Возврашает список студентов (если нужно можно ограничеть ответ, как это сделано на сереверах, и отдовать партиями)
    * @returns { Array } studentArray
    */
    get getStudentList() {
        return this.studentArr;
    }
    /**
    * Возврашает список преподователей (если нужно можно ограничеть ответ, как это сделано на сереверах, и отдовать партиями)
    *   @returns { Array } teacherArray
    */
    get getTeacherList() {
        return this.teacherArr;
    }
}