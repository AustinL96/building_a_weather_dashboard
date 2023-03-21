var apiKey = 'fa5b9748e6d96846515e3600c8423149';
// var cityName = 'Baltimore'

//*** Function stores the city's name into local storage */
$(function () {
    $('#searchBtn').on('click', function () {
        var searchKey = $(this).parent().attr('id');
        var cityInput = $(this).siblings('.citySearch').val();
        localStorage.setItem(searchKey, cityInput);
    });
})
//***Submitted City is equal to the city's name */
var submittedCity = localStorage.getItem('searchForCity', '')
//***Converts the city name into its data */
var geocodingLatLon = "http://api.openweathermap.org/geo/1.0/direct?q=" + submittedCity + "&limit=1&appid=" + apiKey;
//***Function to pull the lat/lon coordinates from the data */
    function getCoordsByCity() {
        $.get(geocodingLatLon).then(function (data) {
            cityLat = data[0].lat;
            cityLon = data[0].lon;
            // console.log(cityLat)
            // console.log(cityLon)

            //***Converts the lat/lon into the current weather data for the city */
            var weatherReport = "https://api.openweathermap.org/data/2.5/weather?lat=" + cityLat + "&lon=" + cityLon + "&units=imperial&appid=" + apiKey
            $.get(weatherReport).then(function (data) {
                //**Sets the current City and Date*/
                $('#currentCity').text(data.name + dayjs().format(' MM/DD/YYYY'));

                //**Sets the current Temp */
                $('#currentTemp').text('Current Temp: ' + data.main.temp + '°F / Feels Like: ' + data.main.feels_like + '°F')

                //**Sets the current Wind */
                $('#currentWind').text('Wind: ' + data.wind.speed + ' MPH')

                //**Sets the current Humidity % */
                $('#currentHum').text('Humidity: ' + data.main.humidity + '%')

                // var weatherData = data
                // console.log(weatherData);
            })
            //***Converts the lat/lon into the 5 day forecast data for the city */
            var fiveDayReport = "https://api.openweathermap.org/data/2.5/forecast?lat=" + cityLat + "&lon=" + cityLon + "&units=imperial&appid=" + apiKey
            // console.log(weatherReport)
            $.get(fiveDayReport).then(function (data) {
                //**Sets Day 1's date, temp, wind, & humidity */
                $('#dayOneDate').text(data.list[11].dt_txt)
                $('#dayOneTemp').text('Temp: ' + data.list[11].main.temp + '°F')
                $('#dayOneWind').text('Wind: ' + data.list[11].wind.speed + ' MPH')
                $('#dayOneHum').text('Humidity: ' + data.list[11].main.humidity + '%')
                //**Sets Day 2's date, temp, wind, & humidity */
                $('#dayTwoDate').text(data.list[19].dt_txt)
                $('#dayTwoTemp').text('Temp: ' + data.list[19].main.temp + '°F')
                $('#dayTwoWind').text('Wind: ' + data.list[19].wind.speed + ' MPH')
                $('#dayTwoHum').text('Humidity: ' + data.list[19].main.humidity + '%')
                //**Sets Day 3's date, temp, wind, & humidity */
                $('#dayThreeDate').text(data.list[27].dt_txt)
                $('#dayThreeTemp').text('Temp: ' + data.list[27].main.temp + '°F')
                $('#dayThreeWind').text('Wind: ' + data.list[27].wind.speed + ' MPH')
                $('#dayThreeHum').text('Humidity: ' + data.list[27].main.humidity + '%')
                //**Sets Day 4's date, temp, wind, & humidity */
                $('#dayFourDate').text(data.list[35].dt_txt)
                $('#dayFourTemp').text('Temp: ' + data.list[35].main.temp + '°F')
                $('#dayFourWind').text('Wind: ' + data.list[35].wind.speed + ' MPH')
                $('#dayFourHum').text('Humidity: ' + data.list[35].main.humidity + '%')
                //**Sets Day 5's date, temp, wind, & humidity */
                // $('#dayFiveDate').text(data.)


                console.log(data);
            })
        })
    }

    getCoordsByCity()








//*** TO DO LIST */

//** CREATE A FORM THAT INPUTS A CITY NAME. WHEN INPUTTED, it returns that place's latitude and longitude
//   Then, input the lat and lon variable into the 5 day forecast query

//** User inputs the city, city is pulled and stored locally in search history
//   Immediately take that stored data and place it incurrent weather section with Search btn  */

//** STORE THIS WEATHER DATA WHEN SEARCHED */

// ** CREATE A SEARCH HISTORY THAT CONTAINS PREVIOUS CITIES, TO REFERENCE AGAIN