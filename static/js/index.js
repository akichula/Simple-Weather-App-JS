window.addEventListener('load', () => {
    let long;
    let lat;
    let tempDescription = document.querySelector('.temperature-description');
    let currentDegree = document.querySelector('.degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let weatherIcon = document.querySelector('.weather-icon');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const apiID = 'baef9e366f3a1d2554058010c25b1173'
            const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${apiID}`;


            axios.get(api).then(data => {
                const {temp} = data.data.current;
                const {event} = data.data.alerts[1];
                const {timezone} = data.data;
                const {icon} = data.data.current.weather[0];
                const iconAPI = `http://openweathermap.org/img/w/${icon}.png`;

                currentDegree.textContent = temp;
                tempDescription.textContent = event;
                locationTimezone.textContent = timezone;
                weatherIcon.textContent = icon

            })

    })
    }
    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});


    }
})