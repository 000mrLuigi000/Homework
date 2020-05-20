'use strict';
/*
Импортирую модули: фабрика елементов, фабрика персон, база данных, фабрику школы, руководителя.
 */
import { FactoryElements } from '../js/component.js';
import { PersonFactory } from '../js/personLib.js';
import { DataBase } from '../js/db.js';
import { SchoollFactory } from '../js/school.js';
import { SuperVisor } from '../js/supervisor.js';
/*
Создаю экзкмляры.
*/
const factoryElements = new FactoryElements();
const personFactory = new PersonFactory();
const schoollFactory = new SchoollFactory();
const db = new DataBase();
const supervisor = new SuperVisor();
/*
Отдаю руководителю  фабрику елементв,  фабрику школы, базу данных, для дальнейшей работы с ними.
*/
supervisor.addElement(schoollFactory, 'scholl');
supervisor.addElement(db, 'db');
supervisor.addElement(factoryElements, 'factoryElements');
/*
Создаю элементы шапку и хранилище контента.
*/
factoryElements.createElement('header', document.body, { id: 'header' }, supervisor);
factoryElements.createElement('content', document.body, { id: 'content' }, supervisor);
/*
Подгружая данные с базы данных создаю карточки персон.
*/
db.getStudentList.forEach((property) => {
    const student = personFactory.createPerson(property);
    schoollFactory.addStudent(student);
    factoryElements.createElement('person', document.getElementById('student-container'), student, supervisor);
});
db.getTeacherList.forEach((property) => {
    const teacher = personFactory.createPerson(property);
    schoollFactory.addTeacher(teacher);
    factoryElements.createElement('person', document.getElementById('teacher-container'), teacher, supervisor);
});