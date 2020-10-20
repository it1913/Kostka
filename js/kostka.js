const kostka = document.getElementById('kostka');
const statistika = document.getElementById('statistika');
const tlacitko = document.getElementById('tlacitko');
const historie = document.getElementById('historieHodu');
const reset = document.getElementById('reset');
let hod = 1;
let hody = [];
let timer = false;

function animace(){
    hod = Math.ceil(Math.random() * 6);
    kostka.src = 'img/kostka' + hod + '.png';
}

function stop(){
    /*tlacitko.hidden=false;*/
    clearInterval(timer);
    timer = false;
    tlacitko.innerText = 'Hoď';
    hody.push(hod);
    console.log(hod);
    vypisStatistiky();
    pridejDoHistorie(hod);
}

tlacitko.addEventListener('click', function () {
    if(!timer){
        audio();
        timer = setInterval(animace, 50);
        tlacitko.innerText = 'Čekej';
        /*tlacitko.hidden=true;*/
        setTimeout(function(){stop();}, 3000);
    }else{
        
    }
})


function suma() {
    let sum = 0;
    for (let i = 0; i < hody.length; i++) {
        sum += hody[i];
    }
    return sum;
}

function min() {
    let minimum = 6;
    hody.forEach(function (value, index) {
        if (value < minimum) minimum = value;
    })
    return minimum;
}

function max() {
    let maximum = 1;
    hody.forEach(function (value, index) {
        if (value > maximum) maximum = value;
    })
    return maximum;
}

function radek(text, hodnota) {
    return `<tr><th>${text}</th><td>${hodnota}</td></tr>`; 
}

function vypisStatistiky() {
    var innerHTML;
    innerHTML = `<table>`;
    innerHTML += radek("Poslední hod", hod);
    innerHTML += radek("Počet hodů",hody.length);
    innerHTML += radek("Součet", suma());
    innerHTML += radek("Průměr", (suma() / hody.length).toFixed(2));
    innerHTML += radek("Maximum", max());
    innerHTML += radek("Minimum", min());
    innerHTML += `</table>`;
    statistika.innerHTML = innerHTML;
}

function audio(){
    var zvuk = document.getElementById('kostkaZvuk');
    zvuk.play();
    window.setTimeout(function(){
        zvuk.pause()
        audio.currentTime = 0;
    },3000);
}

function pridejDoHistorie(number){
   historie.innerHTML += `<img class="kostkaHistorie" src="img/kostka${number}.png"> `;
}

function clear(){
    historie.innerHTML =``;
    statistika.innerHTML = ``;
    hod = 1;
    hody = [];
}

reset.addEventListener('click', function () {
    clear();
})
