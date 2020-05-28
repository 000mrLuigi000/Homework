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
factoryElements.createElement('header', document.body, { id: 'header' }, supervisor);
factoryElements.createElement('content', document.body, { id: 'content' }, supervisor);
factoryElements.createElement('slider', document.getElementById('content'), { id: 'container-student', page: 0, search: 'student', title: 'Студенты' }, supervisor);
factoryElements.createElement('slider', document.getElementById('content'), { id: 'container-teacher', page: 0, search: 'teacher', title: 'Преподователи' }, supervisor);

/* function first(page){
    const answer = query.select({ search: 'person', filter: `_page=$1&_limit=3` }, {});
    page['page']++;
    answer.then((data) => {
        if ((data.length) && (page['page'] > 0)) {
            data.forEach((property, i) => {
                setTimeout(() => {
                    const student = personFactory.createPerson(property);
                    factoryElements.createElement('person', document.getElementById('student-container'), student, supervisor);
                    document.getElementById(property.id).classList.add('content__flex__item_active');
                }, 100 * i);
            });
        }
    });
}

function swithPage(page, type, container) {
    (type === 'right') ? page['page']++ : page['page']--;
    const answer = query.select({ search: 'person', filter: `_page=${page['page']}&_limit=3` }, {});
    answer.then((data) => {
        if ((data.length) && (page['page'] > 0)) {
            let child = document.getElementById(container).childNodes;
            let length =  child.length;
            for (let i = 0; i < length; i++) {
                child[i].style.animationName = 'dawn';
                if (i==child.length - 1){
                    child[child.length - 1].addEventListener('animationend', ()=>{
                        document.getElementById(container).innerHTML='';
                        data.forEach((property, i) => {
                            setTimeout(() => {
                                const student = personFactory.createPerson(property);
                                factoryElements.createElement('person', document.getElementById(container), student, supervisor);
                                document.getElementById(property.id).classList.add('content__flex__item_active');
                            }, 50 * i);
                        });
                    });
                }
            }
        } else (type === 'right') ? page['page']-- : page['page']++;
    });
}

first(page);
 */
/* left.addEventListener('click', () => {
    swithPage(page, 'left', 'student-container');
});
right.addEventListener('click', () => {
    swithPage(page, 'right', 'student-container');
}); */