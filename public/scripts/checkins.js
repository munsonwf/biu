console.log('Script Running'); // Verifies script is running
// var dateFormat = require('dateformat');
// var now = new Date();
// var requirejs = require('requirejs');
// var dataFormatter = require("../helpers/dataFormatter.js");

//---------------
//  Ajax Call
//---------------
// Ajax call settings
var settings = {
  "async": false,
  "crossDomain": true,
  "url": "http://localhost:3000/api/checkins", // Get request to the api
  "method": "GET",
  "headers": {
    "cache-control": "no-cache",
    "postman-token": "0a660068-7f1f-f9d9-a60a-9e5a8bf7c4e8"
  }
}

$(document).ready(function(){
  $('.header').load("header.html");
});

// Makes the Ajax call and stores it in the postgres variable
var postgres = $.ajax(settings).done().responseJSON;


// Logs the Ajax response to verify it went through okay
console.log('Ajax response:', postgres);

// for(var i=0; i<postgres.length; i++){
//   dateFormat(postgres[i].arrival_date);
// }
//
// console.log('Date formatted:', postgres);

//////////////////////////////
/////// DATA FORMATING ///////
//////////////////////////////

function formatDate(date) {
  var monthNames = [
    "", "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var dateArray = date.split("-");
  var year = dateArray[0];
  var monthIndex = parseInt(dateArray[1]);
  var day = dateArray[2];
  console.log(year, day, monthNames[monthIndex]);

  date = monthNames[monthIndex] + ' ' + day + ', ' + year;
  console.log(date);
  return date;
}

function formatTime(time) {
  var timeArray = time.split(":");
  var hour = parseInt(timeArray[0]);
  var minutes = timeArray[1];
  time = hour + ':' + minutes;
  return time;
}

// LOOP: Format the date and time of the AJAX response
for(var i=0; i<postgres.length; i++){
  console.log(postgres[i].arrival_date);
  postgres[i].arrival_date = formatDate(postgres[i].arrival_date);
  postgres[i].arrival_time = formatTime(postgres[i].arrival_time);
  console.log(postgres[i].arrival_date);
}



//////////////////////////////
////// DATA CARDS LOOP ///////
//////////////////////////////

// Displays each array in a data 'card'
var dataDiv=$("<div/>").attr("id","checkinDiv");
$("#checkinDataDiv").append(dataDiv);

// loops through each record to create a corresponding card
for(var i=0;i<postgres.length;i++)
{
  var locationRow = "<div class='container greyContainer'><div class='row greyRow dateRow'><div class='col-sm-8'><h3>"+postgres[i]["location_name"]+"</h3></div><div class='col-sm-4'><h5 class='alignRight'>"+postgres[i]["arrival_time"]+", "+postgres[i]["arrival_date"]+"</h5></div></div>";
  var subDivRow ="<div class='checkinSubDiv'><h4>"+postgres[i]["location_area"]+"</h4><h5>"+postgres[i]["address"]+ postgres[i]["coordinates"]+"</h5><p>"+postgres[i]["notes"]+"</p></div>";

  $("#checkinDataDiv").append(locationRow + subDivRow);
}
