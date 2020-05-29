'use strict';

import { PersonFactory } from '../js/personLib.js'

describe('Тест модуля personLib', () => {
    const factory = new PersonFactory();
    describe('Тест обьекта Student', () => {
        describe('Тест функции getBirthDateStr()', () => {
            it('Дата = undefindet', () => {
                // arrange
                const student = factory.createPerson({tag: 'student', birthDate: undefined});
                // act
                const birtdate = student.getBirthDateStr;
                //assert
                assert.strictEqual(birtdate, 'NaN undefined, NaN лет');
            })
            it('Дата = 2000-05-01T00:00:00.000Z', () => {
                // arrange
                const student = factory.createPerson({tag: 'student', birthDate: '2000-05-01T00:00:00.000Z'});
                // act
                const birtdate = student.getBirthDateStr;
                //assert
                assert.strictEqual(birtdate, '1 Мая, 20 лет');
            })
        });
        describe('Тест функции age()', () => {
            it('Год = undefindet', () => {
                // arrange
                const student = factory.createPerson({tag: 'student', birthDate: undefined});
                // act
                const age = student.age;
                //assert
                assert.strictEqual(age, 'NaN лет');
            })
            it('Год = 2000, ответ "20 лет"', () => {
                // arrange
                const student = factory.createPerson({tag: 'student', birthDate: '2000-01-01T00:00:00.000Z'});
                // act
                const age = student.age;
                //assert
                assert.strictEqual(age, '20 лет');
            })
            it('Год = 2016, ответ "4 года"', () => {
                // arrange
                const student = factory.createPerson({tag: 'student', birthDate: '2016-01-01T00:00:00.000Z'});
                // act
                const age = student.age;
                //assert
                assert.strictEqual(age, '4 года');
            })
            it('Год = 1999, ответ "21 год"', () => {
                // arrange
                const student = factory.createPerson({tag: 'student', birthDate: '1999-01-01T00:00:00.000Z'});
                // act
                const age = student.age;
                //assert
                assert.strictEqual(age, '21 год');
            })
        });
        describe('Тест функции getUniversity()', () => {
            it('Университет = undefined, курс = undefined | ответ = undefined undefined курс', () => {
                // arrange
                const student = factory.createPerson({tag: 'student', university: undefined, course: undefined });
                // act
                const univer = student.getUniversity;
                //assert
                assert.strictEqual(univer, 'undefined undefined курс');
            })
            it('Университет = КГТУ, курс = undefined | ответ = КГТУ undefined курс', () => {
                // arrange
                const student = factory.createPerson({tag: 'student', university: 'КГТУ', course: undefined });
                // act
                const univer = student.getUniversity;
                //assert
                assert.strictEqual(univer, 'КГТУ undefined курс');
            })
            it('Университет = КГТУ, курс = 5 | ответ = КГТУ 5 курс', () => {
                // arrange
                const student = factory.createPerson({tag: 'student', university: 'КГТУ', course: 5 });
                // act
                const univer = student.getUniversity;
                //assert
                assert.strictEqual(univer, 'КГТУ 5 курс');
            })
        });
    });
    describe('Тест обьекта Teacher', () => {
        describe('Тест функции getBirthDateStr()', () => {
            it('Дата = undefindet', () => {
                // arrange
                const student = factory.createPerson({tag: 'teacher', birthDate: undefined});
                // act
                const birtdate = student.getBirthDateStr;
                //assert
                assert.strictEqual(birtdate, 'NaN undefined, NaN лет');
            })
            it('Дата = 2000-05-01T00:00:00.000Z', () => {
                // arrange
                const student = factory.createPerson({tag: 'teacher', birthDate: '2000-05-01T00:00:00.000Z'});
                // act
                const birtdate = student.getBirthDateStr;
                //assert
                assert.strictEqual(birtdate, '1 Мая, 20 лет');
            })
        });
        describe('Тест функции age()', () => {
            it('Год = undefindet', () => {
                // arrange
                const student = factory.createPerson({tag: 'teacher', birthDate: undefined});
                // act
                const age = student.age;
                //assert
                assert.strictEqual(age, 'NaN лет');
            })
            it('Год = 2000, ответ "20 лет"', () => {
                // arrange
                const student = factory.createPerson({tag: 'teacher', birthDate: '2000-01-01T00:00:00.000Z'});
                // act
                const age = student.age;
                //assert
                assert.strictEqual(age, '20 лет');
            })
            it('Год = 2016, ответ "4 года"', () => {
                // arrange
                const student = factory.createPerson({tag: 'teacher', birthDate: '2016-01-01T00:00:00.000Z'});
                // act
                const age = student.age;
                //assert
                assert.strictEqual(age, '4 года');
            })
            it('Год = 1999, ответ "21 год"', () => {
                // arrange
                const student = factory.createPerson({tag: 'teacher', birthDate: '1999-01-01T00:00:00.000Z'});
                // act
                const age = student.age;
                //assert
                assert.strictEqual(age, '21 год');
            })
        });
        describe('Тест функции getUniversity()', () => {
            it('Университет = undefined, преподает = undefined | ответ = undefined Преподает: undefined', () => {
                // arrange
                const student = factory.createPerson({tag: 'teacher', university: undefined, work: undefined });
                // act
                const univer = student.getUniversity;
                //assert
                assert.strictEqual(univer, 'undefined Преподает: undefined');
            })
            it('Университет = МГУ, преподает = undefined | ответ = МГУ Преподает: undefined', () => {
                // arrange
                const student = factory.createPerson({tag: 'teacher', university: 'МГУ', work: undefined });
                // act
                const univer = student.getUniversity;
                //assert
                assert.strictEqual(univer, 'МГУ Преподает: undefined');
            })
            it('Университет = МГУ, преподает = Алгебра | ответ = МГУ Преподает: Алгебра', () => {
                // arrange
                const student = factory.createPerson({tag: 'teacher', university: 'МГУ', work: 'Алгебра' });
                // act
                const univer = student.getUniversity;
                //assert
                assert.strictEqual(univer, 'МГУ Преподает: Алгебра');
            })
        });
    });
});

mocha.run();
