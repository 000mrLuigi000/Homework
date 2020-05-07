function createArray() {
    let kolvo = 100;
    let arr = [Math.floor(Math.random() * 1000) % (kolvo - 1) + 2];
    id = 1;
    schet = 5050 - arr[0];
    while (schet > 1) {
        let short_id;
        while (true) {
            if (!arr[arr[id - 1] - 1]) {
                short_id = Math.floor(Math.random() * 1000) % kolvo + 1;
                arr[arr[id - 1] - 1] = short_id;
                id = arr[id - 1];
                while (arr[arr[id - 1] - 1]) {
                    short_id = Math.floor(Math.random() * 1000) % kolvo + 1;
                    arr[id - 1] = short_id;
                }
                break;
            } else {
                short_id = Math.floor(Math.random() * 1000) % kolvo + 1;
                arr[id - 1] = short_id;
            }
        }
        schet -= short_id;
    }
    arr[arr[id - 1] - 1] = schet;
    return arr;
}

let arr1 = createArray();
console.log(arr1);

let arr2 = arr1.slice().reverse();
console.log(arr2);

let arr3 = [];
arr1.forEach((value,index)=>{
    arr3[index] = arr1[index] - arr2[index];
});
console.log(arr3);

let sum = arr3.reduce((summ,value)=>{
    return summ += value;
});
console.log(sum/arr3.length);