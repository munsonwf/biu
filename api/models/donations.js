const Sequelize = require('sequelize');
var database = require('../../config/database').database;

// Defines the table model
const Donations = database.define('donations', {
    site_name Sequelize.TEXT,
    donation_amount: Sequelize.INTEGER,
    donation_name: Sequelize.TEXT,
    is_employee: Sequelize.BOOLEAN
}, {
    timestamps: false // Sequelize auto-generates timestamps, we don't want these
});


module.exports.Donations = Donations; // Export that variable boiii
