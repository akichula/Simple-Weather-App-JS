window.addEventListener('load', () => {
    let long;
    let lat;

    let tempDescription = document.querySelector('.temperature-description');
    let currentDegree = document.querySelector('.degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let weatherIcon = document.getElementsByClassName('icon-wrap');
    let tempSection = document.querySelector('.degree-section');
    let tempSpan = document.querySelector('.degree-span')

    if (navigator.geolocation) {
        //getting current our location
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            //work with api key and api
            const apiID = 'baef9e366f3a1d2554058010c25b1173'
            const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${apiID}`;

            //axios instead of fetch to get json data
            axios.get(api).then(data => {
                const {temp} = data.data.current;
                const {event} = data.data.alerts[1];
                const {timezone} = data.data;
                const {icon} = data.data.current.weather[0];
                const iconAPI = `http://openweathermap.org/img/w/${icon}.png`;
                console.log(data)

                //redefine our variables
                currentDegree.textContent = temp.toFixed(0) / 100;
                tempDescription.textContent = event;
                locationTimezone.textContent = timezone;

                //display image from API via JS
                let currentIcon = new Image(75, 75)
                currentIcon.src = iconAPI;
                weatherIcon = currentIcon;
                document.querySelector('.icon-wrap').appendChild(weatherIcon)

                //change temperature from celsius to fahrenheit
                function fahrenheitToCelsius(temp) {
                     temp = (temp - 32) * (5/9);
                     return temp.toFixed(1)
                }

                tempSection.addEventListener('click', () => {
                    if (tempSpan.textContent === 'F') {
                        tempSpan.textContent = 'C';
                        currentDegree.textContent = fahrenheitToCelsius(temp.toFixed(0) / 100);

                    }
                    else {
                        tempSpan.textContent = 'F';
                        currentDegree.textContent = temp.toFixed(0) / 100;
                    }
                })
            })
    })
    }
    else {
       let error = document.createElement('h1')
       error.textContent = "I can't get your Location!"
    }
})