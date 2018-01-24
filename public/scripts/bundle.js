(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var today = new Date();
var entry = {};
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
        entry.location_name = $('#location_name_input').val();
        entry.location_area = $('#location_area_input').val();
        entry.address = $('#address_input').val();
        entry.coordinates = $('#coordinates_input').val();
        entry.arrival_time = $('#arrival_time_input').val();
        entry.arrival_date = $('#arrival_date_input').val();
        entry.notes = $('#notes_input').val();
        entry.location_type = $('location_type_input').val();
        console.log('Input:', entry);
    },

    // getCurrRecord(reports){
    //   var streak = 0;
    //   var i = 0;
    //   while(reports[i].success){
    //     streak++;
    //     i++;
    //   }
    //   return streak;
    // },

    post: function(ent) {
        console.log('Posting:', ent);
        $.ajax("http://localhost:3000/api/checkins", {
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

// Generate today's date in date field
$('#todays-date-form').on('click', function() {
    $('#arrival_date_input').val(today);
});

// Submit form
$('#submit_checkin_form').on('click', function() {
    // var inputsAreValid = run.inputsValid();
    // console.log('inputsAreValid:', inputsAreValid);
      run.getInput();
      run.post(entry);

      //$('#exampleModal').modal('hide');  //close the modal window
      // location.reload();
      // renderReportHistory();  //"dynamically" re-renders all of the reports (including the newly added one) after the submit button has been clicked.
});

},{}]},{},[1]);
