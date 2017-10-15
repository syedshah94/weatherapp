console.log('main.js is connected!');

/*

Here's an overview of the steps you'll follow to get your app to work...

STEPS

1. when the page loads
  - add an event listener to the button
2. When the button is clicked
  - grab the input
  - store the value
  - make an API request based on the input value
3. When the API response is returned
  - grab all the appropriate DOM elements
  - append the data to the DOM

*/

let endpoint = "http://api.openweathermap.org/data/2.5/weather?units=imperial&appid=3684a4b426687b03884741274bd53394";

$(document).ready(function() {
  // submit event on form
  $('form').on('submit', function(event){
    event.preventDefault();
    $.ajax({
      method: 'GET',
      url: endpoint,
      data: $('form').serialize(),
      dataType: 'json',
      success: onSubmitReqSuccess,
      error: onError,
    });
  });

  function onSubmitReqSuccess(responseData){
    console.log(responseData);
    // process data
    let city = responseData.name;
    let temp = Math.floor(responseData.main.temp);
    let weather = responseData.weather[0].description;
    let minTemp = Math.floor(responseData.main.temp_max);
    let maxTemp = Math.floor(responseData.main.temp_min);

    $("#city").text(city);
    $("#temp").text(temp);
    $("#weather").text(weather);

    $("#minTemp #min").text("Min")
    $("#minTemp #minVal").text(minTemp);

    $("#maxTemp #max").text("Max")
    $("#maxTemp #maxVal").text(maxTemp);

    $('form').addClass('shiftUp');
    $('#display').addClass('shiftDown');
  }

  function onError(xhr, status, errorThrown){
  /* perform this function if the
     response timed out or if the
     status code of the response is
     in the 400s or 500s (error)
     xhr: the full response object
     status: a string that describes
     the response status
     errorThrown: a string with any error
     message associated with that status */

  alert('Please Enter a valid zip code');
  };


});





