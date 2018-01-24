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
