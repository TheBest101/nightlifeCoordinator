'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Going = new Schema({
	name: String,
  people: [String]
});

module.exports = mongoose.model('Going', Going);
