'use strict'

export class SchoollFactory {

    constructor() {
        this.studentList = [];
        this.teacherList = [];
    }

    addStudent(student) {
        this.studentList.push(student);
        console.log(`Студент ${student.name} зачислен на ${student.course} курс`);
    }

    addTeacher(teacher) {
        this.teacherList.push(teacher);
        console.log(`Преподователь ${teacher.name} назначен на предмет: ${teacher.work}`);
    }

    removePerson(tag, args) {
        switch (tag) {
            case 'student':
                this.studentList.forEach((person, id) => {
                    if ((person.name === args.name) && (person.course === args.course)) {
                        this.studentList.splice(id, 1);
                        alert(`Студент ${person.name} отчислен`);
                        return 0;
                    }
                });
                break;
            case 'teacher':
                this.teacherList.forEach((person, id) => {
                    if ((person.name === args.name) && (person.work === args.work)) {
                        this.teacherList.splice(id, 1);
                        alert(`Преподователь ${person.name} уволен`);
                        return 0;
                    }
                });
                break;
            default:
                console.log('Не все поля введены верно.');
        }
    }

    getPerson(tag, args) {
        let searchPerson = null;
        switch (tag) {
            case 'student':
                this.studentList.forEach((person) => {
                    if ((person.name === args.name) && (person.course === args.course)) {
                        console.log(`обнаружен ${person.name}`);
                        searchPerson = person;
                    }
                });
                break;
            case 'teacher':
                this.teacherList.forEach((person) => {
                    if ((person.name === args.name) && (person.work === args.work)) {
                        console.log(`обнаружен ${person.name}`);
                        searchPerson = person;
                    }
                });
                break;
            default:
                console.log('Не все поля введены верно.');
        }
        return searchPerson;
    }

    appendToDom(tag ,url) {
        switch(tag){
            case 'student':
                this.studentList.forEach((person) => {
                    person.createCart('student' ,url, this);
                });
                break;
            case 'teacher':
                this.teacherList.forEach((person) => {
                    person.createCart('teacher' ,url, this);
                });
                break;
        }
    }
}