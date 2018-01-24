var today = new Date();
var entry = {};
let dac;
let aac;
let airports;
let departureCodeInput = document.querySelector('#departure_airport_code_input');
let departureCity = document.querySelector('#departure_city_input')
let departureCountry;
let arrivalCodeInput = document.querySelector('#arrival_airport_code_input');
let arrivalCity = document.querySelector('#arrival_city_input')
let arrivalCountry;
let results;
const departureButton = document.getElementById('submit_departure_code');
const arrivalButton = document.getElementById('submit_arrival_code');
const aiportSettings = {
  "async": false,
  "crossDomain": true,
  "url": "http://localhost:3000/api/airports", // Get request to the api
  "method": "GET",
  "headers": {
    "cache-control": "no-cache",
    "postman-token": "0a660068-7f1f-f9d9-a60a-9e5a8bf7c4e8"
  }
}

var run = {
    getDate: function() {
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if(dd<10) {
            dd = '0' + dd
        }
        if(mm<10) {
            mm = '0' + mm;
        }
        console.log('Today is', today);
        today = yyyy + '-' + mm + '-' + dd;
        // today = mm + '/' + dd + '/' + (yyyy % 2000);   //old format, doesnt match the date picker format
        $('#todays-date').text(today);
    },
    // inputsValid: function(){
    //   console.log('Verifying Input...');
    //   var inputsAreValid = true; //innocent until proven guilty
    //   entry.report_date = $('#report_date-modal').val();
    //   entry.completion_time = $('#completion_time-modal').val();
    //   entry.queries_failed = $('#queries_failed-modal').val();
    //   entry.success = $('#success-modal').prop('checked');
    //   entry.comments = $('#comments-modal').val();
    //
    //   console.log('validing this entry: ',entry);
    //   // check date
    //   if(entry.report_date == '' || entry.report_date > today){
    //     $('#report_date-modal').css('border-color', 'red');
    //     inputsAreValid = false;
    //   }
    //   else {
    //     $('#report_date-modal').css('border-color', '');
    //   }
    //
    //   // check completion time
    //   if(entry.completion_time == ''){
    //     $('#completion_time-modal').css('border-color', 'red');
    //     inputsAreValid = false;
    //   }
    //   else {
    //     $('#completion_time-modal').css('border-color', '');
    //   }
    //
    //   // check queries failed
    //   //replace 83 with jame's variable he added later
    //   if(entry.queries_failed == '' || entry.queries_failed < 0 || entry.queries_failed > 83){
    //     $('#queries_failed-modal').css('border-color', 'red');
    //     inputsAreValid = false;
    //   }
    //   else {
    //     $('#queries_failed-modal').css('border-color', '');
    //   }
    //
    //   // check comments
    //   if(entry.comments.length > 250){
    //     $('#comments-modal').css('border-color', 'red');
    //     inputsAreValid = false;
    //   }
    //   else {
    //     $('#comments-modal').css('border-color', '');
    //   }
    //
    //   return inputsAreValid;
    // },
    getInput: function() {
        console.log('Getting Input...');
        entry.flight_code = $('#flight_code_input').val();
        entry.departure_airport_code = $('#departure_airport_code_input').val();
        entry.arrival_airport_code = $('#arrival_airport_code_input').val();
        entry.departure_date = $('#departure_date_input').val();
        entry.departure_time = $('#departure_time_input').val();
        // entry.departure_city = $('#departure_city_input').val();
        entry.departure_city = departureCity;
        entry.departure_country = departureCountry;
        entry.arrival_time = $('#arrival_time_input').val();
        entry.arrival_date = $('#arrival_date_input').val();
        entry.arrival_city = arrivalCity;
        entry.arrival_country = arrivalCountry;
        console.log('Input:', entry);
    },


    post: function(ent) {
        console.log('Posting:', ent);
        $.ajax("http://localhost:3000/api/flights", {
            async: false,
            method: 'POST',
            data: ent,
            function(data, status) {
                console.log('Posted: ' + data + '\nStatus: ' + status);
            }
        });
    }
};

$(document).ready(function() {
    run.getDate();

    $('.header').load("header.html");
    // CSS
    // $(this).css('color', 'red');
});

airports = $.ajax(aiportSettings).done().responseJSON;

// Get matching airport from departure airport code input
departureButton.addEventListener('click', () => {
  console.log('This was pressed. Got: ', dac);

  dac = document.getElementById('departure_airport_code_input').value;


  for (let i=0; i<airports.length; i++) {
    if (airports.code = dac) {
      console.log('We have a match');
      departureCodeInput.innerText = dac;
    }
  }
  var results = airports.filter(function (entry) { return entry.code === dac; });
  departureCity = results[0].city_name;
  departureCountry = results[0].country_name;
});

// Get matching airport from departure airport code input
arrivalButton.addEventListener('click', () => {
  console.log('This was pressed. Got: ', aac);

  aac = document.getElementById('arrival_airport_code_input').value;
  // airports = $.ajax(aiportSettings).done().responseJSON;

  for (let i=0; i<airports.length; i++) {
    if (airports.code = aac) {
      console.log('We have a match');
      departureCodeInput.innerText = aac;

      var results = airports.filter(function (entry) { return entry.code === aac; });
    }
  }
  arrivalCity = results[0].city_name;
  arrivalCountry = results[0].country_name;
});

// THIS IS NOT WORKING - some module decleration must be made

// module.exports = function(app) {
//   app.get('/api/airports/12', function(request, response) {
//     // var airport_code = request.param('code');
//     // response.send(code + ' ' );
//       Airports.findAll({
//         where: { id: 1 }
//           response.json(airports);
//       });
//   });
//
// }

$('#submit_flight_form').on('click', function() {
    // var inputsAreValid = run.inputsValid();
    // console.log('inputsAreValid:', inputsAreValid);
      run.getInput();
      run.post(entry);

      //$('#exampleModal').modal('hide');  //close the modal window

      // location.reload();

      // renderReportHistory();  //"dynamically" re-renders all of the reports (including the newly added one) after the submit button has been clicked.
});
