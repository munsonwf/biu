const Sequelize = require('sequelize');
var database = require('../../config/database').database;

// Defines the table model
const Airports = database.define('airports', {
    code: Sequelize.TEXT,
    name: Sequelize.TEXT,
    city_code: Sequelize.TEXT,
    city_name: Sequelize.TEXT,
    country_name: Sequelize.TEXT,
    country_code: Sequelize.TEXT,
    timezone: Sequelize.TEXT,
    lat: Sequelize.TEXT,
    lon: Sequelize.TEXT,
    num_airports: Sequelize.NUMERIC,
    city: Sequelize.BOOLEAN

}, {
    timestamps: false // Sequelize auto-generates timestamps, we don't want these
});

module.exports.Airports = Airports; // Export that variable boiii
