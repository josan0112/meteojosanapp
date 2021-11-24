const get_api_extra = (ciudad)=>{
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${ciudad}&key=425e5c271ab04469813d230891ea1ed8&pretty=1`)
        .then(response => response.json())
        .then((data)=>{
            let lat=data.results[0].bounds.northeast.lat;
            let long=data.results[0].bounds.northeast.lng;
            return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat.toFixed(2)}&lon=${long.toFixed(2)}&exclude=minutely&appid=cbb30bfd6c4fa4fe10d2f528df2060c3`);
        })
};