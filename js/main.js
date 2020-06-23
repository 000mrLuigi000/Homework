'use strict';
import { Sort } from './sort.js';
import { Bubles } from './bubles.js';
import { Root } from './root.js';

//Создаем экземпляр класса сортировка
const sort = new Sort();
//Массив значений
const arr = [];
//Масиив пузыриков
let arrComp = [];
//Длина arr
const length = 10;
//Хранилище промисов
let promise = [];
//Время выполнения создания и анимации
const time = 1500;
/**
 * Таймер.
 * Возвращает законченый промис после определенного времени 
 * @param {Number} time Время задержки
 */
function delay(time) {
    return new Promise((r, e) => {
        setTimeout(() => { return r(); }, time);
    });
}
/**
 * Спавнер компонентов bubles.
 * @param {Number} i Позиция пузырика в массиве (также служит для создания задержек)
 * @param {Document} container  Контейнер в который происходит создание компонентов
 */
function spawn(i, container) {
    //Ставится задержка в 1/10 от time
    promise.push(delay(time / 10 * i)
        .then(() => {
            //В arrComp помещаются экземпляры bubles
            arrComp.push(Inferno.createElement(Bubles, {
                number: arr[i],
                style: { 'animation-name': 'spawn' }
            }));
            //Происходит отрисовка на странице
            Inferno.render(
                Inferno.createElement('div', { className: 'bublesContainer' }, arrComp),
                container
            );
        }));
}

/**
 * Обмен.
 * Меняет местами два соседних пузырика
 * @param {Number} time Время выполнения
 * @param {Number} i Позиция первого объекта
 * @param {Number} j Позиция второго объекта
 * @param {Boolean} isSwap Условие обмена
 * @param {Number} end Позиция элемента для "замораживания"
 */
function swap(time, i, j, isSwap, end) {
    //Ставится задержка длиной time
    return delay(time).then(() => {
        //Если isSwap = true то выполняется набор анимации обмена
        if (isSwap) {
            arrComp[i].children.setState({
                animParent: 'swapR',
                animChild: 'ok',
                animDuration: 1.5
            });
            arrComp[j].children.setState({
                animParent: 'swapL',
                animChild: 'ok',
                animDuration: 1.5
            });
        }
        //Если isSwap = false то выполняется набор анимации простоя 
        else {
            arrComp[i].children.setState({
                animParent: 'idle',
                animChild: 'err',
                animDuration: 1.5
            });
            arrComp[j].children.setState({
                animParent: 'idle',
                animChild: 'err',
                animDuration: 1.5
            });
        }
        //Ставится задержка длиной 900ms (безопасное время обновления элементов, с расчетом => время выполниения - 100)
        delay(1450).then(() => {
            //Если isSwap = true то элементы обновляются и анимция обнуляется
            if (isSwap) {
                let x = arrComp[i].children.state.number;
                arrComp[i].children.setState({
                    animParent: 'none',
                    animChild: 'none',
                    animDuration: 1.5,
                    number: arrComp[j].children.state.number
                });
                arrComp[j].children.setState({
                    animParent: 'none',
                    animChild: 'none',
                    animDuration: 1.5,
                    number: x
                });
            }
            //Если isSwap = false то анимция обнуляется 
            else {
                arrComp[i].children.setState({
                    animParent: 'none',
                    animChild: 'none'
                });
                arrComp[j].children.setState({
                    animParent: 'none',
                    animChild: 'none'
                });
            }
            // //Если end = true то данный элемент "замораживается"
            (end) ? arrComp[end].children.setState((prevState) => ({
                className: prevState.className + ' bublesContainer__bubles__content_freez'
            })) : undefined;
        });
    });
}

//Происходит отрисовка родительских объектов на странице
Inferno.render(Inferno.createElement(Root), document.getElementById('body'));
//arr заполняется случайными значениями length штук и происходит их отрисовка
for (let i = 0; i < length; i++) {
    arr.push(Math.round(Math.random() * 9 + 1));
    spawn(i, document.getElementById('oldContainer'));
}
//Когда первый стек промисов выполнится (тоесть отрисуется старый массив)
Promise.all(promise).then(() => {
    //Обнуляется хранище промисов и пузырьков
    promise = [];
    arrComp = [];
    //Записывается полученный объект с новым массивом и стеком вызовов
    let newArr = sort.buble(arr);
    //Происходит отрисовка второго ряда
    arr.forEach((item, i) => {
        spawn(i, document.getElementById('newContainer'));
    });
    //Задержка перед анимацией сортировкой
    promise.push(delay((time / 10 * length) + 500));
    //Когда второй стек промисов выполнится (тоесть отрисуется новый массив)
    Promise.all(promise).then(() => {
        //Обнуляется хранище промисов
        promise = [];
        //Запустится механизм обмена
        newArr.callback.forEach((item, i) => {
            promise.push(swap(time * i, item[0], item[1], item[2], item[3]));
        });
        //Когда третий стек промисов выполнится (тоесть закончится последняя анимация обмена)
        Promise.all(promise).then(() => {
            //Ставится задержка длиной в time где все оставшиеся элементы "заморозятся"
            delay(time).then(() => {
                arrComp.forEach((item) => {
                    item.children.setState((prevState) => ({
                        className: prevState.className + ' bublesContainer__bubles__content_freez'
                    }));
                });
            });
        });
    });
});