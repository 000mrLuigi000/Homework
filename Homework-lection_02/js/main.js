let page_Fut_eng_prog = document.getElementById("page_Future_engineer-programmer");
let page_Pyth_dev = document.getElementById("page_Python_developer");
let but_Fut_eng_prog = document.getElementById("but_Future_engineer-programmer");
let but_Pyth_dev = document.getElementById("but_Python_developer");
let status_Page = "";

function swapPage(name_page){
    switch(name_page){
        case "Future_engineer-programmer":
            page_Pyth_dev.style.display = "none";
            page_Fut_eng_prog.style.display = "flex";
            but_Fut_eng_prog.style.backgroundColor = "#DCDCDC";
            but_Pyth_dev.style.backgroundColor = "#EDEDED";
            status_Page = "Future_engineer-programmer";
            console.log("swap Future_engineer-programmer");
            break;
        case "Python_developer":
            page_Fut_eng_prog.style.display = "none";
            page_Pyth_dev.style.display = "flex";
            but_Fut_eng_prog.style.backgroundColor = "#EDEDED";
            but_Pyth_dev.style.backgroundColor = "#DCDCDC";
            status_Page = "Python_developer";
            console.log("swap Python_developer");
            break;
    }
}

function showmore(length){
    switch(status_Page){
        case "Future_engineer-programmer":
            for(i=0;i<length;i++){
                page_Fut_eng_prog.innerHTML = page_Fut_eng_prog.innerHTML + '<div class="container-flex__container-item"><img src="img/' + ((Math.floor(Math.random()*100)%4)+1) + '.jpg" alt="intro" class="container-flex__container-item_intro"><div class="container-flex__container-item_container-text"><h2 class="container-flex__container-item_title">00 - Введение</h2><div class="container-flex__container-item_date">20 апреля 2020</div><p class="container-flex__container-item_description">Привет! <br><br>Рад приветствовать тебя на нулевом, вводном занятии. Почему нулевом? Настоящий программист считает с нуля! 😄</p></div><a href="#" class="container-flex__container-item_link">Перейти</a></div>';
            }
            break;
        case "Python_developer":
            for(i=0;i<length;i++){
                page_Pyth_dev.innerHTML = page_Pyth_dev.innerHTML + '<div class="container-flex__container-item"><img src="img/' + ((Math.floor(Math.random()*100)%4)+1) + '.jpg" alt="intro" class="container-flex__container-item_intro"><div class="container-flex__container-item_container-text"><h2 class="container-flex__container-item_title">00 - Введение</h2><div class="container-flex__container-item_date">20 апреля 2020</div><p class="container-flex__container-item_description">Привет! <br><br>Рад приветствовать тебя на нулевом, вводном занятии. Почему нулевом? Настоящий программист считает с нуля! 😄</p></div><a href="#" class="container-flex__container-item_link">Перейти</a></div>';
            }
            break;
    }
}