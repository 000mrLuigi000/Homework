var express = require('express'); //добавляю модуль
var app = express(); //создаю обьект от модуля

app.use(express.static('scr')); //устанавливаю рабочую папку

app.listen(3000, function(){  //запускает сервер 
    console.log('It works!');
});