console.log('\nDonations.js is doing a thing. Please keep hands and feet inside the vehicle.');

/////////////////
//  AJAX CALL  //
/////////////////

var settings = {
  "async": false,
  "crossDomain": true,
  "url": "http://localhost:3000/api/checkins",
  "method": "GET",
}

$(document).ready(function(){
  $('.header').load("header.html");
});


var postgres = $.ajax(settings).done().responseJSON;

// Log AJAX response
console.log('AJAX response:', postgres);
