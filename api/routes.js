const Incidents = require('./models/incidents.js').Incidents;
const Reports = require('./models/reports.js').Reports;
const Erps = require('./models/erp.js').Erps;
const Flights = require('./models/flights.js').Flights;
const Checkins = require('./models/checkins.js').Checkins;
const Airports = require('./models/airports.js').Airports;
// let airportCodeCall = require('../public/scripts/newFlight.js').airportCodeCall;
const axios = require('axios');
let departureCode = 'RIC';
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var fs = require('fs');
var path = require('path');
var sequelize = require('sequelize');
var express = require('express');
var router = express.Router();
let arrivalAirportCode;
let departureAirportCode = 'MIA';
let airportCode = 'MIA';


router.get('/', function(req, res, next) {
  request({
    uri: 'https://iatacodes.org/api/v6/airports?code=RIC'
  }).pipe(res);
});

module.exports = router;

module.exports = function(app) {

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(express.static('public'));
    // app.use(express.static('bower_components'));

    // When user goes to localhost:3000, index.html is shown
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    app.get('/about', function(req, res) {
        res.sendFile(path.join(__dirname, "../public/about.html"));
    });

    //-----
    // incidents table endpoints
    //-----
    app.get('/incidents', function(req, res) {
        res.sendFile(path.join(__dirname, "../public/incidents.html"));
    });

    app.get('/api/incidents', function(request, response) {
        Incidents.findAll().then(incidents => {
            response.json(incidents);
        });
    });

    app.post('/api/incidents', function(request, response) {
        Incidents.create({incident_date: "yesterday"});
        response.end('Posted');
    });

    //-----
    // reports table endpoints
    //-----
    app.get('/historic_reports', function(req, res) {
        res.sendFile(path.join(__dirname, "../public/historic_reports.html"));
    });

    app.get('/api/reports', function(request, response) {
        Reports.findAll({
          order: [
            ['report_date', 'DESC']
          ]
        }).then(reports => {
                response.json(reports);
        });
    });


    app.post('/api/reports', function(request, response) {
        console.log('Post Request:\n', request.body, '\nCreating entry...');
        Reports.destroy({
            where: {
                report_date: request.body.report_date
            }
        });
        Reports.create({
            report_date: request.body.report_date,
            completion_time: request.body.completion_time,
            queries_failed: request.body.queries_failed,
            success: request.body.success,
            comments: request.body.comments
        });
        response.end('Posted');
    });

    // -----------------
    //     ERP STUFF
    // -----------------

    app.get('/erps', function(req, res) {
        res.sendFile(path.join(__dirname, "../public/erps.html"));
    });

    app.get('/api/erps', function(request, response) {
        Erps.findAll().then(erps => {
            response.json(erps);
        });
    });

    // Return most recent 14
    app.get('/api/erps/limit14', function(request, response) {
        Erps.findAll({
          order: [
            ['id', 'DESC']
          ],
          limit: 14
        }).then(erps => {
            response.json(erps);
        });
    });

    //Return most recent 140
    app.get('/api/erps/limit140', function(request, response) {
        Erps.findAll({
          order: [
            ['id', 'DESC']
          ],
          limit: 140
        }).then(erps => {
            response.json(erps);
        });
    });

    app.get('/api/erps/2', function(request, response) {
        Erps.findAll({
          order: [
            ['id', 'DESC']
          ],
          limit: 14
        }).then(erps => {
            response.json(erps);
        });
    });

    // Post.findAll({where: { id: 2 }});

    // app.post('/api/erps', function(request, response) {
    //     Erps.create({date_field: "yesterday"});
    //     response.end('Posted');
    // });

    app.post('/api/erps', function(request, response) {
        console.log('Post Request:\n', request.body, '\nCreating entry...');

        Erps.create({
            erp_name: request.body.erp_name,
            date_field: request.body.date_field,
            is_failure: request.body.is_failure
        });
        response.end('Posted');
    });


    //-----
    // Calendar endpoints
    //-----

    app.get('/calendar', function(request, response) {
        response.sendFile(path.join(__dirname, "../public/calendar.html"));
    });

    ////////////////////////
    ///// AIRPORTS /////////
    ////////////////////////

    app.get('/flights', function(request, response) {
        response.sendFile(path.join(__dirname, "../public/flights.html"));
    });

    app.get('/flight_tile', function(request, response) {
        response.sendFile(path.join(__dirname, "../public/flight_tile.html"));
    });

    app.get('/api/flights/limit140', function(request, response) {
        Flights.findAll({
          // where: {
          //   departure_date: {
          //     gt: new Date()
          //   }
          // },
          // attributes: [
          //   [sequelize.fn('date_format', sequelize.col('departure_date'), '%Y-%m-%d'), 'depature_date_formatted']
          // ],
          order: ['departure_date'],
          limit: 140
        }).then(flights => {
            response.json(flights);
        });
    });

    app.get('/newFlight', function(request, response) {
        response.sendFile(path.join(__dirname, "../public/newFlight.html"));
    });

    app.post('/api/flights', function(request, response) {
        console.log('Post Request:\n', request.body, '\nCreating entry...');

        Flights.create({
            flight_code: request.body.flight_code,
            departure_airport_code: request.body.departure_airport_code,
            arrival_airport_code: request.body.arrival_airport_code,
            departure_date: request.body.departure_date,
            departure_time: request.body.departure_time,
            departure_city: request.body.departure_city,
            departure_country: request.body.departure_country,
            arrival_date: request.body.arrival_date,
            arrival_time: request.body.arrival_time,
            arrival_city: request.body.arrival_city,
            arrival_country: request.body.arrival_country,
        });
        response.end('Posted');
    });

    // axios.get('https://iatacodes.org/api/v6/airports?code=RIC')
    //   .then(response => {
    //     console.log(response.data.code);
    //     console.log(response.data.name);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    // CHECK INS

    app.get('/checkins', function(request, response) {
        response.sendFile(path.join(__dirname, "../public/checkins.html"));
    });


    app.get('/api/checkins', function(request, response) {
        Checkins.findAll({
          // where: {
          //   departure_date: {
          //     gt: new Date()
          //   }
          // },
          // attributes: [
          //   [sequelize.fn('date_format', sequelize.col('departure_date'), '%Y-%m-%d'), 'depature_date_formatted']
          // ],
          order: [
            ['arrival_date', 'DESC']
          ],
          limit: 140
        }).then(checkins => {
            response.json(checkins);
        });
    });

    app.get('/newCheckin', function(request, response) {
        response.sendFile(path.join(__dirname, "../public/newCheckin.html"));
    });

    app.post('/api/checkins', function(request, response) {
        console.log('Post Request:\n', request.body, '\nCreating entry...');

        Checkins.create({
            location_name: request.body.location_name,
            location_area: request.body.location_area,
            arrival_time: request.body.arrival_time,
            arrival_date: request.body.arrival_date,
            notes: request.body.notes,
            location_type: request.body.location_type
        });
        response.end('Posted');
    });

    ////////////////////////
    ///// AIRPORTS /////////
    ////////////////////////

    app.get('/api/airports', function(request, response) {
      // var airport_code = request.param('code');
      // response.send(code + ' ' );
        Airports.findAll({
        //   //where: { code: 'RIC' }
        //   // { where:
        //   //   { id: 2 }
        //   // },
        //   // attributes: [
        //   //   [sequelize.fn('date_format', sequelize.col('departure_date'), '%Y-%m-%d'), 'depature_date_formatted']
        //   // ],
        //   // order: ['departure_date'],
        //   // limit: 140
        }).then(airports => {
            response.json(airports);
        });
    });

    app.get('/api/airports', function(request, response) {
      // var airport_code = request.param('code');
      // response.send(code + ' ' );
        Airports.findAll({
          where: { id: 1 }
          // { where:
          //   { id: 2 }
          // },
        //   // attributes: [
        //   //   [sequelize.fn('date_format', sequelize.col('departure_date'), '%Y-%m-%d'), 'depature_date_formatted']
        //   // ],
        //   // order: ['departure_date'],
        //   // limit: 140
        }).then(airports => {
            response.json(airports);
        });
    });

    app.get('/api/airports/1', function(request, response) {
      // var airport_code = request.param('code');
      // response.send(code + ' ' );
        Airports.findAll({
          where: { code: 'RIC' }
          // { where:
          //   { id: 2 }
          // },
        //   // attributes: [
        //   //   [sequelize.fn('date_format', sequelize.col('departure_date'), '%Y-%m-%d'), 'depature_date_formatted']
        //   // ],
        //   // order: ['departure_date'],
        //   // limit: 140
        }).then(airports => {
            response.json(airports);
        });
    });


    // PARAMTERIZED BUILD
    // PASS VARIABLE FROM newFlight.js
    app.get('/api/airports/getData', function(request, response) {
      // var airport_code = request.param('code');
      // response.send(code + ' ' );
        Airports.findAll({
          where: { code: airportCodeCall }
        }).then(airports => {
            response.json(airports);
        });
    });



    // app.get("/api/airports/:airportCode", function(req, res) {
    //   var airportCode = req.params.airportCode;
    //
    //   var sql = "SELECT * FROM airports WHERE code = ?";
    //   connection.query(sql, airportCode, function(err, rows, fields) {
    //   });
    // });



}
