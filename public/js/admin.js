'use strict';
import { Query } from './query.js';

const buttonCerate = document.getElementById('buttonCerate');
const buttonUpdate = document.getElementById('buttonUpdate');
const buttonDelete = document.getElementById('buttonDelete');

const table = document.getElementById('table');

const formConatainer = document.getElementById('formConatainer');
const form = document.getElementById('form');
const buttonExit = document.getElementById('exit');
const inputTag = document.getElementsByName('tag');
const inputName = document.getElementsByName('name');
const inputBirth = document.getElementsByName('birthDate');
const inputUniver = document.getElementsByName('university');
const inputCourse = document.getElementsByName('course');
const inputWork = document.getElementsByName('work');
const inputAvatar = document.getElementsByName('avatar');
const avatarPreview = document.getElementsByName('avatarPreview');

const query = new Query();

function requare(event, method, property) {
    event.preventDefault();
    let blob = new Blob([inputAvatar[0].files[0]], { type: 'image/jpg' });
    let reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => {
        let json = JSON.stringify({
            'tag': inputTag[0].value,
            'name': inputName[0].value,
            'birthDate': inputBirth[0].value,
            'university': inputUniver[0].value,
            'course': inputCourse[0].value || '',
            'work': inputWork[0].value || '',
            'avatar': (blob.size > 9) ? reader.result : avatarPreview.src
        });
        if (method === 'create') {
            query.create({
                search: inputTag[0].value
            },
                {
                    body: json,
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    }
                }).then(r => alert(`${inputTag[0].options[inputTag[0].selectedIndex].textContent} добавлен`));
        } else {
            query.update({
                search: `${inputTag[0].value}/${property.id}`
            },
                {
                    body: json,
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    }
                }).then(r => alert(`${inputTag[0].options[inputTag[0].selectedIndex].textContent} изменен`));
        }
    };
}

function delet(property, container) {
    query.delete({ search: `${property.tag}/${property.id}` }, {}).then(resolve => {
        alert(`${inputTag[0].options[inputTag[0].selectedIndex].textContent} удален`);
        container.remove();
    });
}

buttonCerate.addEventListener('click', () => {
    formConatainer.style.display = 'flex';
    form.onsubmit = (event) => requare(event);
});

inputAvatar[0].addEventListener('change', () => {
    let blob = new Blob([inputAvatar[0].files[0]], { type: 'image/jpg' });
    avatarPreview[0].src = URL.createObjectURL(blob);
});

inputTag[0].addEventListener('change', () => {
    if (inputTag[0].value === 'student') {
        inputCourse[0].disabled = false;
        inputWork[0].disabled = true;
    } else {
        inputCourse[0].disabled = true;
        inputWork[0].disabled = false;
    }
});

buttonExit.addEventListener('click', () => {
    inputTag[0].disabled = false;
    inputName[0].value = '';
    inputBirth[0].value = '';
    inputCourse[0].value = '';
    inputUniver[0].value = '';
    inputWork[0].value = '';
    avatarPreview[0].src = '';
    inputAvatar[0].value = '';
    formConatainer.style.display = 'none';
});

class Item {
    constructor() {
        this.container = undefined;
    }
    create(container, property, query) {
        const row = document.createElement('tr');
        const id = document.createElement('td');
        const name = document.createElement('td');
        const tag = document.createElement('td');
        const avatar = document.createElement('td');
        const image = document.createElement('img');
        const birthDate = document.createElement('td');
        const univer = document.createElement('td');
        const couWor = document.createElement('td');

        this.property = property;

        row.className = 'containerConetnt__table__item';
        row.id = property.id;
        this.query = query;

        id.className = 'containerConetnt__table__elem';
        id.textContent = property.id;
        name.className = 'containerConetnt__table__elem';
        name.textContent = property.name;
        tag.className = 'containerConetnt__table__elem';
        tag.textContent = (property.tag === 'student') ? 'Студент' : 'Преподователь';
        avatar.className = 'containerConetnt__table__elem';
        image.style = 'width: 50px;height: 50px;object-fit: cover';
        image.src = property.avatar;
        birthDate.className = 'containerConetnt__table__elem';
        birthDate.textContent = property.birthDate;
        univer.className = 'containerConetnt__table__elem';
        univer.textContent = property.university;
        couWor.className = 'containerConetnt__table__elem';
        couWor.textContent = property.course || property.work || '';

        avatar.appendChild(image);

        row.appendChild(id);
        row.appendChild(name);
        row.appendChild(tag);
        row.appendChild(avatar);
        row.appendChild(birthDate);
        row.appendChild(univer);
        row.appendChild(couWor);

        container.appendChild(row);

        this.container = row;

        row.onclick = () => {
            if (this.property.tag === 'student') {
                inputTag[0].options[0].selected = 'true';
                inputTag[0].value = 'student';
            } else {
                inputTag[0].options[1].selected = 'true';
                inputTag[0].value = 'teacher';
            }
            if (this.query === 'update') {
                inputTag[0].disabled = true;
                if (inputTag[0].value === 'student') {
                    inputCourse[0].disabled = false;
                    inputWork[0].disabled = true;
                } else {
                    inputCourse[0].disabled = true;
                    inputWork[0].disabled = false;
                }
                inputName[0].value = this.property.name;
                inputBirth[0].value = this.property.birthDate;
                inputCourse[0].value = this.property.course || '';
                inputUniver[0].value = this.property.university;
                inputWork[0].value = this.property.work || '';
                avatarPreview[0].src = this.property.avatar;
                formConatainer.style.display = 'flex';

                form.onsubmit = (event) => {
                    requare(event, 'update', this.property);
                };
            } else {
                delet(this.property, this.container);
            }
        };
    }
}

function creaateItem(method){
    buttonUpdate.disabled = true;
    table.innerHTML = '';
    query.select({ search: 'student' }, {}).then(r => r.forEach((item) => {
        const Element = new Item();
        Element.create(table, item, method);
    })).then(r => {
        const row = document.createElement('h1');
        row.textContent = ' ';
        table.appendChild(row);
        query.select({ search: 'teacher' }, {}).then(r => r.forEach((item) => {
            const Element = new Item();
            Element.create(table, item, method);
        })).then(r => {
            table.style.display = 'table';
            buttonUpdate.disabled = false;
        });
    });
}

buttonUpdate.addEventListener('click', () => {
    creaateItem('update');
});

buttonDelete.addEventListener('click', () => {
    creaateItem('delete');
});