'use strict';
/*
Импортирую модули: фабрика елементов, фабрика персон, база данных, фабрику школы, руководителя.
 */
import { FactoryElements } from '../js/component.js';
import { PersonFactory } from '../js/personLib.js';
import { SuperVisor } from '../js/supervisor.js';
import { Query } from './query.js';
/*
Создаю экзкмляры.
*/
const factoryElements = new FactoryElements();
const personFactory = new PersonFactory();
const supervisor = new SuperVisor();
const query = new Query();
/*
Отдаю руководителю  фабрику елементв,  фабрику школы, базу данных, для дальнейшей работы с ними.
*/
supervisor.addElement(factoryElements, 'factoryElements');
supervisor.addElement(personFactory, 'personFactory');
supervisor.addElement(query, 'query');
/*
Создаю элементы шапку и хранилище контента.
*/
factoryElements.createElement('header', document.getElementById('header'), {});
factoryElements.createElement('content', document.getElementById('main-container'), {});
factoryElements.createElement('slider', document.getElementById('student'), { id: 'container-student', page: 0, search: 'student', title: 'Студенты', supervisor: supervisor  });
factoryElements.createElement('slider', document.getElementById('teacher'), { id: 'container-teacher', page: 0, search: 'teacher', title: 'Преподователи', supervisor: supervisor });