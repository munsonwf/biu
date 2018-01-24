console.log('Script Running'); // Verifies script is running

//---------------
//  Ajax Call
//---------------
// Ajax call settings
var settings = {
  "async": false,
  "crossDomain": true,
  "url": "http://localhost:3000/api/flights/limit140", // Get request to the api
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
// var jsonStr = $("pre").text();
// var jsonObj = JSON.parse(jsonStr);
// var jsonPretty = JSON.stringify(jsonObj, null, '\t');

// $("pre").text(jsonPretty);

// Logs the Ajax response to verify it went through okay
console.log('Ajax response:', postgres);
//---------------

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

for(var i=0; i<postgres.length; i++){
  postgres[i].arrival_time = formatTime(postgres[i].arrival_time);
  postgres[i].arrival_date = formatDate(postgres[i].arrival_date);
  postgres[i].departure_date = formatDate(postgres[i].departure_date);
  postgres[i].departure_time = formatTime(postgres[i].departure_time);
}


//////////////////////////////
////// DATA CARDS LOOP ///////
//////////////////////////////


// Displays all records in a data card
var dataDiv=$("<div/>").attr("id","flightDiv");
$("#flightDataDiv").append(dataDiv);

for(var i=0;i<postgres.length;i++)
{
  var flightCodeRow="<div class='container greyContainer'><div class='row greyRow dateRow'><div class='col-sm-2'><h3>"+postgres[i]["flight_code"]+"</h3></div></div>";
  var airportCodeRow="<div class='row'><div class='col-sm-4'><h2>"+postgres[i]["departure_airport_code"]+"</h2></div><div class='col-sm-4'><h2><i class='fa fa-plane' aria-hidden='true'></h2></div><div class='col-sm-4'></i><h2>"+postgres[i]["arrival_airport_code"]+"</h2></div></div>";
  var endRow="</div>";
  var timeRow="<div class='row'><div class='col-sm-4'><h5>"+postgres[i]["departure_city"]+", " +postgres[i]["departure_date"]+"</h5><h3>"+postgres[i]["departure_time"]+"</h3></div><div class='col-sm-4'></div><div class='col-sm-4'><h5>"+postgres[i]["arrival_city"]+", "+postgres[i]["departure_date"]+"</h5><h3>"+postgres[i]["arrival_time"]+"</h3></div></div>";

  $("#flightDiv").append(flightCodeRow+airportCodeRow+timeRow+endRow);
}

// Displays the next flight only
var singleDataDiv=$("<div/>").attr("id","singleDiv");
// var th="<tr><th>Fight</th><th>Depature City</th><th>Depature Time</th><th>Arrival City</th><th>Arrival Time</th><th>Depature Date</th><th>Arrival Date</th></tr>";
$("#singleFlightDataDiv").append(singleDataDiv);
// $("#flightDiv").append(th);
//$('#mytable').DataTable();
for(var i=0;i<1;i++)
{
  var flightCodeRow="<div class='container greyContainer'><div class='row greyRow dateRow'><div class='col-sm-2'><h3>"+postgres[i]["flight_code"]+"</h3></div></div>";
  var airportCodeRow="<div class='row'><div class='col-sm-4'><h2>"+postgres[i]["departure_airport_code"]+"</h2></div><div class='col-sm-4'><h2><i class='fa fa-plane' aria-hidden='true'></h2></div><div class='col-sm-4'></i><h2>"+postgres[i]["arrival_airport_code"]+"</h2></div></div>";
  var endRow="</div>";
  var timeRow="<div class='row'><div class='col-sm-4'><h5>"+postgres[i]["departure_city"]+", " +postgres[i]["departure_date"]+"</h5><h3>"+postgres[i]["departure_time"]+"</h3></div><div class='col-sm-4'></div><div class='col-sm-4'><h5>"+postgres[i]["arrival_city"]+", "+postgres[i]["departure_date"]+"</h5><h3>"+postgres[i]["arrival_time"]+"</h3></div></div>";

  $("#singleFlightDataDiv").append(flightCodeRow+airportCodeRow+timeRow+endRow);
}

// PLUGS DATA INTO TABLE
// FROZEN, WORKS

// var tbl=$("<table/>").attr("id","mytable");
// var th="<tr><th>Fight</th><th>Depature City</th><th>Depature Time</th><th>Arrival City</th><th>Arrival Time</th><th>Depature Date</th><th>Arrival Date</th></tr>";
// $("#div1").append(tbl);
// $("#mytable").append(th);
// //$('#mytable').DataTable();
// for(var i=0;i<postgres.length;i++)
// {
//
//     var tr="<tr>";
//     var td2="<td>"+postgres[i]["flight_code"]+"</td>";
//     var td3="<td>"+postgres[i]["departure_city"]+"</td>";
//     var td4="<td>"+postgres[i]["departure_time"]+"</td>";
//     var td5="<td>"+postgres[i]["arrival_city"]+"</td>";
//     var td6="<td>"+postgres[i]["arrival_time"]+"</td>";
//     var td7="<td>"+postgres[i]["departure_date"]+"</td>";
//     var td8="<td>"+postgres[i]["arrival_date"]+"</td>";
//
//
//    $("#mytable").append(tr+td2+td3+td4+td5+td6+td7+td8);
//
// }
