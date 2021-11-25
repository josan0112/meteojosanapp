//DOM VARIABLES
const formulario = document.querySelector(".form");
const btn_search = document.querySelector(".form__search");
let search_text = document.querySelector(".form__text");
let titulo_ciudad = document.querySelector(".main__h2");
let UTC_date = document.querySelector(".main__h3");
let icono = document.querySelector(".weather__icon");
let temp_text = document.querySelector(".info__temp");
let desc_text = document.querySelector(".info__description");
let humidity_text = document.querySelector(".info__humidity");
let speed_text = document.querySelector(".info__speed");
let dias = document.querySelector(".extra__grid");
var diaSemana = ["Lunes", "Martes","Miércoles","Jueves","Viernes","Sabado","Domingo"];
var tiempo = new Array;

//FUNCIONES BASICAS
function toCelsius(t){
    let temp= t-273;
    return temp.toFixed(2);
}


//CLASES
class Tiempo {
    constructor(data){
        this.icon =`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        this.temp = data.temp;
        this.temp = (typeof this.temp === 'number')? toCelsius(this.temp) : toCelsius(this.temp.day) ;
        this.desc =data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1) ;
        this.humidity = data.humidity;
        this.speed = data.wind_speed;
        this.fecha = new Date(data.dt * 1000);
    }
}

//FUNCIONES API
function get_api(ciudad){
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${ciudad}&key=425e5c271ab04469813d230891ea1ed8&pretty=1`)
        .then(response => response.json())
        .then((data)=>{
            titulo_ciudad.innerText = data.results[0].formatted;
            let lat= data.results[0].bounds.northeast.lat;
            let long=data.results[0].bounds.northeast.lng;
            console.log(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat.toFixed(2)}&lon=${long.toFixed(2)}&exclude=minutely&appid=cbb30bfd6c4fa4fe10d2f528df2060c3`);
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat.toFixed(2)}&lon=${long.toFixed(2)}&lang=es&exclude=minutely&appid=cbb30bfd6c4fa4fe10d2f528df2060c3`)
                .then(response => response.json())
                .then(data => {
                    let tiempoActual = new Tiempo(data.current);
                    for(i=0; i<7; i++){
                        tiempo[i] =new Tiempo(data.daily[i]);  
                    }
                   escribirMain(tiempoActual);
                   escribirSemana(tiempo);
                });
        });
}
//FUNCIONES VISTA
function escribirMain(tiempoHoy){
    icono.setAttribute("src",tiempoHoy.icon);
    temp_text.innerText=`${tiempoHoy.temp} ºC`;
    desc_text.innerText=tiempoHoy.desc;
    humidity_text.innerText=`💦 ${tiempoHoy.humidity}%`;
    speed_text.innerText= `🍃 ${tiempoHoy.speed} km/h`;
    UTC_date.innerText = `${diaSemana[tiempoHoy.fecha.getDay() -1]}, ${tiempoHoy.fecha.toLocaleDateString()}`;
}
function escribirSemana(tiempo){
    for(i=0; i<dias.childElementCount ;i++){
        dias.children[i].innerHTML=`
            <h3 class="dia__h3">${diaSemana[tiempo[i].fecha.getDay()]}</h3>
            <h3 class="dia__h3 dia__h3--peque">${tiempo[i].fecha.toLocaleDateString()}</h3>
            <img src=${tiempo[i].icon} alt="Weather Icon" class="dia__icon">
            <p class="dia__temp">${tiempo[i].temp}ºC</p>
        `;
    }
}
function buscar(){
    let ciudad = search_text.value;
    get_api(ciudad);
}

//PRINCIPAL

search_text.addEventListener("keypress", (event)=>{
    if(event.keyCode ==13){
        buscar();
        event.preventDefault();
    }
})
btn_search.addEventListener("click",buscar);