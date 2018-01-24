const Sequelize = require('sequelize');
var database = require('../../config/database').database;

// Defines the table model
const Checkins = database.define('checkins', {
    location_name: Sequelize.TEXT,
    location_area: Sequelize.TEXT,
    address: Sequelize.TEXT,
    coordinates: Sequelize.TEXT,
    arrival_time: Sequelize.TIME,
    arrival_date: Sequelize.DATE,
    notes: Sequelize.TEXT,
    location_type: Sequelize.TEXT

}, {
    timestamps: false // Sequelize auto-generates timestamps, we don't want these
});

module.exports.Checkins = Checkins; // Export that variable boiii
