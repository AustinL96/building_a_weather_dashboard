var apiKey = 'fa5b9748e6d96846515e3600c8423149';

/*** Apologies for random code lines, these were just tests. Leaving them in case I want to continue building off them for a resubmit later. */
// var previousSearches = [];
// localStorage.setItem('searchHistory', previousSearches);

//*** Function stores the city's name into local storage */
$(function () {
    $('#searchBtn').on('click', function () {
        // e.preventDefault();
        var searchKey = $(this).parent().attr('id');
        var cityInput = $(this).siblings('.citySearch').val();
        // if (localStorage.getItem('searchHistory').length >= 5) {
        //     previousSearches.pop();
        // }
        // previousSearches.push(cityInput)
        localStorage.setItem(searchKey, cityInput);
        // localStorage.setItem('searchHistory', previousSearches);
    });
})
//***Submitted City is equal to the city's name */
var submittedCity = localStorage.getItem('searchForCity', '');
//***Converts the city name into its data */
var geocodingLatLon = "http://api.openweathermap.org/geo/1.0/direct?q=" + submittedCity + "&limit=1&appid=" + apiKey;
//***Function to pull the lat/lon coordinates from the data */
    function getCoordsByCity() {
        $.get(geocodingLatLon).then(function (data) {
            cityLat = data[0].lat;
            cityLon = data[0].lon;

            //***Converts the lat/lon into the current weather data for the city */
            var weatherReport = "https://api.openweathermap.org/data/2.5/weather?lat=" + cityLat + "&lon=" + cityLon + "&units=imperial&appid=" + apiKey
            $.get(weatherReport).then(function (data) {
                //**Sets the current City and Date */
                $('#currentCity').text(data.name + dayjs().format(' MM/DD/YYYY'));

                //**Sets the current weather Icon */
                $('#currentImg').attr('src', 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png');

                //**Sets the current Temp */
                $('#currentTemp').text('Current Temp: ' + data.main.temp + '°F / Feels Like: ' + data.main.feels_like + '°F');

                //**Sets the current Wind */
                $('#currentWind').text('Wind: ' + data.wind.speed + ' MPH');

                //**Sets the current Humidity % */
                $('#currentHum').text('Humidity: ' + data.main.humidity + '%');

                // console.log(data);
            })
            //***Converts the lat/lon into the 5 day forecast data for the city */
            var fiveDayReport = "https://api.openweathermap.org/data/2.5/forecast?lat=" + cityLat + "&lon=" + cityLon + "&cnt=50&units=imperial&appid=" + apiKey
           
            $.get(fiveDayReport).then(function (data) {
                //**Sets Day 1's date, temp, wind, & humidity */
                //* Takes the date from "YYYY/MM/DD" to "MM/DD/YYYY" like the Current Day weather */
                var correctOneDate = data.list[6].dt_txt.substring(0, 10).split('-')
                $('#dayOneDate').text(correctOneDate[1] + '/' + correctOneDate[2] + '/' + correctOneDate[0]);
                $('#dayOneImg').attr('src', 'https://openweathermap.org/img/wn/' + data.list[6].weather[0].icon + '@2x.png');
                $('#dayOneTemp').text('Temp: ' + data.list[6].main.temp + '°F');
                $('#dayOneWind').text('Wind: ' + data.list[6].wind.speed + ' MPH');
                $('#dayOneHum').text('Humidity: ' + data.list[6].main.humidity + '%');
                // //**Sets Day 2's date, temp, wind, & humidity */
                //* Takes the date from "YYYY/MM/DD" to "MM/DD/YYYY" like the Current Day weather */
                var correctTwoDate = data.list[14].dt_txt.substring(0, 10).split('-');
                $('#dayTwoDate').text(correctTwoDate[1] + '/' + correctTwoDate[2] + '/' + correctTwoDate[0]);
                $('#dayTwoImg').attr('src', 'https://openweathermap.org/img/wn/' + data.list[14].weather[0].icon + '@2x.png');
                $('#dayTwoTemp').text('Temp: ' + data.list[14].main.temp + '°F');
                $('#dayTwoWind').text('Wind: ' + data.list[14].wind.speed + ' MPH');
                $('#dayTwoHum').text('Humidity: ' + data.list[14].main.humidity + '%');
                // //**Sets Day 3's date, temp, wind, & humidity */
                //* Takes the date from "YYYY/MM/DD" to "MM/DD/YYYY" like the Current Day weather */
                var correctThreeDate = data.list[22].dt_txt.substring(0, 10).split('-');
                $('#dayThreeDate').text(correctThreeDate[1] + '/' + correctThreeDate[2] + '/' + correctThreeDate[0]);
                $('#dayThreeImg').attr('src', 'https://openweathermap.org/img/wn/' + data.list[22].weather[0].icon + '@2x.png');
                $('#dayThreeTemp').text('Temp: ' + data.list[22].main.temp + '°F');
                $('#dayThreeWind').text('Wind: ' + data.list[22].wind.speed + ' MPH');
                $('#dayThreeHum').text('Humidity: ' + data.list[22].main.humidity + '%');
                // //**Sets Day 4's date, temp, wind, & humidity */
                //* Takes the date from "YYYY/MM/DD" to "MM/DD/YYYY" like the Current Day weather */
                var correctFourDate = data.list[30].dt_txt.substring(0, 10).split('-');
                $('#dayFourDate').text(correctFourDate[1] + '/' + correctFourDate[2] + '/' + correctFourDate[0]);
                $('#dayFourImg').attr('src', 'https://openweathermap.org/img/wn/' + data.list[30].weather[0].icon + '@2x.png');
                $('#dayFourTemp').text('Temp: ' + data.list[30].main.temp + '°F');
                $('#dayFourWind').text('Wind: ' + data.list[30].wind.speed + ' MPH');
                $('#dayFourHum').text('Humidity: ' + data.list[30].main.humidity + '%');
                // //**Sets Day 5's date, temp, wind, & humidity */
                //* Takes the date from "YYYY/MM/DD" to "MM/DD/YYYY" like the Current Day weather */
                var correctFiveDate = data.list[38].dt_txt.substring(0, 10).split('-');
                $('#dayFiveDate').text(correctFiveDate[1] + '/' + correctFiveDate[2] + '/' + correctFiveDate[0]);
                $('#dayFiveImg').attr('src', 'https://openweathermap.org/img/wn/' + data.list[38].weather[0].icon + '@2x.png');
                $('#dayFiveTemp').text('Temp: ' + data.list[38].main.temp + '°F');
                $('#dayFiveWind').text('Wind: ' + data.list[38].wind.speed + ' MPH');
                $('#dayFiveHum').text('Humidity: ' + data.list[38].main.humidity + '%');

                // console.log(data);
            })
        })
    }

    getCoordsByCity()
