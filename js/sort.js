export class Sort {
    /**
     * Сортировка пузырьком.
     * Принимает массив значений, сортирует по возрастанию
     * и возвращает обьект с отсортированным массивом и списком позиций сравниваемых элементов 
     * @param {Array} arr массив значений
     * @returns {Object{newArr,caallback[i, j, swap, freez]} 
     */
    buble(arr) {
        const props = { newArr: arr.map((item) => { return item }), callback: [] };
        for (let i = 0; i < props.newArr.length - 1; i++) {
            //Флаг нужен для досрочного выхода из сортировки
            let flag = true;
            let j = 0;
            while (j < props.newArr.length - i - 1) {
                //Запоминаются позиции взятых элементов
                props.callback.push([j, j + 1]);
                if (props.newArr[j] > props.newArr[j + 1]) {
                    //Устанавливается флаг swap = true если условие верно
                    props.callback[props.callback.length - 1].push(true);
                    //Сама сортировка
                    let t = props.newArr[j];
                    props.newArr[j] = props.newArr[j + 1];
                    props.newArr[j + 1] = t;
                    flag = false;
                } else {
                    //Устанавливается флаг swap = false
                    props.callback[props.callback.length - 1].push(false);
                }
                j++;
            }
            //Запоминает позицию последнего элемента для "заморозки"
            props.callback[props.callback.length - 1].push(j);
            //Если цикл прошел по массиву и не изменил его то выходим из сортировки 
            if (flag) {
                break;
            }
        }
        return props;
    }
}