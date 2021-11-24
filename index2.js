const formulario = document.querySelector(".form");
const btn_search = document.querySelector(".form__search");
let search_text = document.querySelector(".form__text");
let titulo_ciudad = document.querySelector(".main__h2");
let icono = document.querySelector(".weather__icon");
let temp_text = document.querySelector(".info__temp");
let desc_text = document.querySelector(".info__description");
let humidity_text = document.querySelector(".info__humidity");
let speed_text = document.querySelector(".info__speed");
const get_api = (ciudad)=>{
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${ciudad}&key=425e5c271ab04469813d230891ea1ed8&pretty=1`)
        .then(response => response.json())
        .then((data)=>{
            let lat=data.results[0].bounds.northeast.lat;
            let long=data.results[0].bounds.northeast.lng;
            console.log(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat.toFixed(2)}&lon=${long.toFixed(2)}&exclude=minutely&appid=cbb30bfd6c4fa4fe10d2f528df2060c3`)
        })
};
function buscar(){
    let ciudad = search_text.value;
    get_api(ciudad)
        .then(response => response.json())
        .then(data => {
            let name= data.name;
            let icon =`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            let temp_celsius = data.main.temp-273;
            let temp = temp_celsius.toFixed(1);
            let desc = data.weather[0].description;
            let humidity = data.main.humidity;
            let speed = data.wind.speed;
            titulo_ciudad.innerText = name;
            icono.setAttribute("src",icon);
            temp_text.innerText=`${temp} ºC`;
            desc_text.innerText=desc;
            humidity_text.innerText=`💦 ${humidity}%`;
            speed_text.innerText= `🍃 ${speed} km/h`;
        });
}
search_text.addEventListener("keypress", (event)=>{
    if(event.keyCode ==13){
        buscar();
        event.preventDefault();
    }
})
btn_search.addEventListener("click",buscar);