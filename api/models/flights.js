const Sequelize = require('sequelize');
var database = require('../../config/database').database;

// Defines the table model
const Flights = database.define('flights', {
    flight_code: Sequelize.TEXT,
    departure_airport_code: Sequelize.TEXT,
    arrival_airport_code: Sequelize.TEXT,
    departure_date: Sequelize.DATEONLY,
    departure_time: Sequelize.TIME,
    departure_city: Sequelize.TEXT,
    departure_country: Sequelize.TEXT,
    arrival_date: Sequelize.DATEONLY,
    arrival_time: Sequelize.TIME,
    arrival_city: Sequelize.TEXT,
    arrival_country: Sequelize.TEXT,
    connection_1: Sequelize.TEXT,
    connection_1_city: Sequelize.TEXT,
    connection_2: Sequelize.TEXT,
    connection_2_city: Sequelize.TEXT,
    departure_airport_id: Sequelize.INTEGER,
    arrival_airport_id: Sequelize.INTEGER
}, {
    timestamps: false // Sequelize auto-generates timestamps, we don't want these
});

module.exports.Flights = Flights; // Export that variable boiii
