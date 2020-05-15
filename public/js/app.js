'use strict'

import { PersonFactory } from '../js/personLib.js';
import { SchoollFactory } from '../js/school.js';

// проинициализируем фабрику
const factory = new PersonFactory();

// создадим школу (если есть для нее фабрика, то тоже через фабрику) 
const school = new SchoollFactory();

// добавим в список школы студентов используйте те данные, которые у вас есть
// Vasia и пр. тут скорее для примера
// если методы называются по другому, поменяйте
// по желанию можно добавить больше

let studentArr = [
    {
        name: 'Иванов Иван',
        birthDate: new Date(2000, 5, 2),
        university: 'МГУ',
        course: 2,
        avatar: 'ava01.jpg'
    },
    {
        name: 'Махина-Игнатова Алина',
        birthDate: new Date(1999, 8, 6),
        university: 'СПбГУ',
        course: 3,
        avatar: 'ava02.jpg'
    },
    {
        name: 'Рузавлин Павел',
        birthDate: new Date(2002, 4, 1),
        university: 'БФУ им. И.Каната',
        course: 1,
        avatar: 'ava03.jpg'
    },
    {
        name: 'Можегов Олег',
        birthDate: new Date(2002, 2, 4),
        university: 'ТГУ',
        course: 1,
        avatar: 'ava04.jpg'
    },
    {
        name: 'Крылова Кристина',
        birthDate: new Date(1998, 5, 15),
        university: 'НГУ',
        course: 4,
        avatar: 'ava05.jpg'
    },
    {
        name: 'Краснов Михаил',
        birthDate: new Date(1999, 10, 20),
        university: 'ЮФУ',
        course: 3,
        avatar: 'ava06.jpg'
    }
];
let theacherArr = [
    {
        name: 'Протасевич Михаил',
        birthDate: new Date(1980, 5, 2),
        university: 'МГУ',
        work: 'Математически анализ',
        avatar: 'ava01.jpg'
    },
    {
        name: 'Двоеглазова Татьяна',
        birthDate: new Date(1974, 8, 6),
        university: 'СПбГУ',
        work: 'Философия',
        avatar: 'ava02.jpg'
    },
    {
        name: 'Билл Гейтс',
        birthDate: new Date(1968, 4, 1),
        university: 'БФУ им. И.Каната',
        work: 'Программирование',
        avatar: 'ava03.jpg'
    }
];

studentArr.forEach((person) => {
    school.addStudent(factory.create('student', person));
});
theacherArr.forEach((person) => {
    school.addTeacher(factory.create('teacher', person));
});

// отрисуем всех студентов в dom 
const studentContainer = document.getElementById('student-container');
const teacherContainer = document.getElementById('teacher-container');
school.appendToDom('student' ,studentContainer);
school.appendToDom('teacher' ,teacherContainer);

// в итоге в на странице должны получить список студентов и учителей
// папка js будет содержать несколько файлов, минимум 3, а лучше больше