//DOM VARIABLES
const formulario = document.querySelector(".form");
const btn_search = document.querySelector(".form__search");
let search_text = document.querySelector(".form__text");
let titulo_ciudad = document.querySelector(".main__h2");
let icono = document.querySelector(".weather__icon");
let temp_text = document.querySelector(".info__temp");
let desc_text = document.querySelector(".info__description");
let humidity_text = document.querySelector(".info__humidity");
let speed_text = document.querySelector(".info__speed");

//FUNCIONES BASICAS
function toCelsius(t){
    let temp= t-273;
    return temp.toFixed(1);
}

//CLASES
class Tiempo {
    constructor(data){
        this.name= data.name;
        this.icon =`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        this.temp = toCelsius(data.main.temp);
        this.desc =data.weather[0].description;
        this.humidity = data.main.humidity;
        this.speed = data.wind.speed;
    }
}

//FUNCIONES API
const get_api_extra = (ciudad)=>{
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${ciudad}&key=425e5c271ab04469813d230891ea1ed8&pretty=1`)
        .then(response => response.json())
        .then((data)=>{
            let lat=data.results[0].bounds.northeast.lat;
            let long=data.results[0].bounds.northeast.lng;
            console.log(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat.toFixed(2)}&lon=${long.toFixed(2)}&exclude=minutely&appid=cbb30bfd6c4fa4fe10d2f528df2060c3`);
        })
};
const get_api = (ciudad)=>{
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=cbb30bfd6c4fa4fe10d2f528df2060c3`);
};
//FUNCIONES VISTA
function escribirMain(tiempoHoy){
    titulo_ciudad.innerText = tiempoHoy.name;
    icono.setAttribute("src",tiempoHoy.icon);
    temp_text.innerText=`${tiempoHoy.temp} ºC`;
    desc_text.innerText=tiempoHoy.desc;
    humidity_text.innerText=`💦 ${tiempoHoy.humidity}%`;
    speed_text.innerText= `🍃 ${tiempoHoy.speed} km/h`;
}
function buscar(){
    let ciudad = search_text.value;
    get_api(ciudad)
        .then(response => response.json())
        .then(data => {
            let tiempoHoy =new Tiempo(data);
            escribirMain(tiempoHoy);
        });
    get_api_extra(ciudad);
}

//PRINCIPAL

search_text.addEventListener("keypress", (event)=>{
    if(event.keyCode ==13){
        buscar();
        event.preventDefault();
    }
})
btn_search.addEventListener("click",buscar);