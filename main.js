const api={
    key:"310d27429f81416c3386c26a48508d0b",
    base:"https://api.openweathermap.org/data/2.5/weather",
    unit:"metric"
}

const search = document.querySelector('.search-box'); 
search.addEventListener('keypress',setQuery);

function setQuery(event){
    if (event.keyCode === 13)
        getWeatherdetails(search.value);
    console.log(event.keyCode);
};

function getWeatherdetails(cityName){
    console.log("city is ", cityName);
    fetch(`${api.base}?q=${cityName}&appid=${api.key}&units=${api.unit}`)
        .then((response)=> response.json())
        .then((responseJson) => {
            if(responseJson.cod===200)
                displayResult(responseJson);
        
        })
        .catch(error => console.log("erorr calling response",error));
};  

function displayResult(responseJson){
    document.querySelector('.city').innerText=`${responseJson.name},${responseJson.sys.country}`;
    document.querySelector('.temp').innerText= `${responseJson.main.temp}°C`;
    document.querySelector('.weather').innerText = `${responseJson.weather[0].main}`;
    document.querySelector('.hi-low').innerText = `${responseJson.main.temp_min}°C / ${responseJson.main.temp_max}°C`;

    let now= new Date();
    let date= document.querySelector('.date').innerText=getDate(now);
}

function getDate(date){
    const dateOptions ={
        month:"long",
        day:"numeric",
        year:"numeric",
        weekday:"long"
    };
    return date.toLocaleDateString('en-US',dateOptions);
}
