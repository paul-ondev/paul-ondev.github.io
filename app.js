'use strict'
window.addEventListener('load', ()=>{
    let long;
    let lat;
    const APIkey = '1a3b4d0b03c39a9a9874022ceeec08f3';
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureDescription = document.querySelector(".temperature-description");
    let degreeUnit = document.querySelector('.degree-unit');
    let degreeSection = document.querySelector('.degree-section');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${APIkey}`;

            fetch(api)
                .then((response) => {
                    console.log(response.ok)
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    //set DOM elements from the api
                    let celcius = Math.round(data.main.temp - 273.15);
                    temperatureDegree.textContent = celcius;
                    let fahrenheit = Math.round((data.main.temp - 273.15) * 1.8 + 32);
                    locationTimezone.innerHTML = `UTC +${data.timezone/3600}<br>${data.sys.country}/${data.name}`;
                    temperatureDescription.textContent = toUpperCaseInSentence(data.weather[0].description);
                    
                    //set icon according to data from the API 
                    setIcon(data.weather[0].icon, data.weather[0].main);
                    //Swap between C and F
                    function temperatureSwap() {
                        if (degreeUnit.innerHTML == "C") {
                            degreeUnit.innerHTML = "F";
                            temperatureDegree.innerHTML = fahrenheit;
                        } else {
                            degreeUnit.innerHTML = "C";
                            temperatureDegree.innerHTML = celcius;
                        }
                    }

                    degreeSection.addEventListener('click', temperatureSwap);

                })

        }, error => {
            console.log('?????????????????? ???????????? ?????? ?????????????????????? ????????????????????????????!');
            let alertDiv = document.createElement('div');
            alertDiv.className = "alert";
            alertDiv.innerHTML = "Service is not working!<br> Please, refresh this page and allow browser to see your geolocation.";
            document.body.prepend(alertDiv);
        })
    } else {
        alert('Service is not working! Your browser do not support defining of geolocation.')
        
    }
    function setIcon(iconNumber, mainDescription) {
        let img = document.getElementById('iconImg');
        img.alt = mainDescription;
        img.src = `http://openweathermap.org/img/wn/${iconNumber}@2x.png`;
        
    }

    function toUpperCaseInSentence(mySentence) {
        const words = mySentence.split(" ");

        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }
        return words.join(" ");
    }
    
})
