const express = require('express');
const _und = require("underscore")
const router = express.Router();

// Bring in Article Model
let Article = require('../models/article');

// Get distinct params
router.get('/distinct/:param', function(req, res){

	var param = req.params.param;
	
	var query = {};
	_und.each(req.query, function(value, key) {

		// Values beginning with an '@' are treated as regular expressions
		query[key] = (value.match(/^@/)) ? new RegExp(value.replace('@', ''), 'i') : value;
	});

	getDistinctParams(res, query, param);	
});

router.get('/articles', function(req, res){

	var query = {};
	_und.each(req.query, function(value, key) {

		// Values beginning with an '@' are treated as regular expressions
		query[key] = (value.match(/^@/)) ? new RegExp(value.replace('@', ''), 'i') : value;
	});

	var sort = {}; sort['volume'] = 1; sort['part'] = 1; sort['page'] = 1;

	Article.find(query).sort(sort).exec(function(err, result){

		if(err)			
			console.log(err);
		else 
			return res.json(result);
	});
});

router.get('/authors/:letter', function(req, res){

	// Bring in AuthorIndex model
	let AuthorIndex = require('../models/authorIndex');

	var query = {};

	query['author'] = (req.params.letter == 'Special') ? new RegExp('^(?![a-zA-Z]).+', 'i') : new RegExp('^' + req.params.letter, 'i');

	var sort = {}; sort['author'] = 1;

	AuthorIndex.find(query).sort(sort).exec(function(err, result){

		if(err)			
			console.log(err);
		else 
			return res.json(result);
	});
});

router.get('/search', function(req, res){

	var query = {};
	_und.each(req.query, function(value, key) {

		query[key] = new RegExp(value, 'i');
	});

	var sort = {}; sort['volume'] = 1; sort['part'] = 1; sort['page'] = 1;

	Article.find(query).sort(sort).exec(function(err, result){

		if(err)			
			console.log(err);
		else 
			return res.json(result);
	});
});

router.get('/search/text/:term/:volume', function(req, res){

	// Bring in SearchIndex Model
	// Only one index is loaded at a time

	var volIndex = ('000' + req.params.volume).substr(-3);

	if ((parseInt(volIndex) < 0) || (parseInt(volIndex) > 60))
		return res.json();

	let SearchIndex = require('../models/searchIndex')(volIndex);
	
	let term = req.params.term;

    var result = SearchIndex.search(term, {
        fields: {
            // title: {boost: 1, expand: true}
            text: {boost: 1, expand: false}
        }
    });

	return res.json(result);
});

function getDistinctParams(res, query, param){

	var projection = {}; projection[param] = 1; projection['_id'] = 0;
	var sort = {}; sort[param] = 1;

	Article.find(query, projection).sort(sort).exec(function(err, result){

		if(err)			
			console.log(err);

		else {

			iteratee = function(row){return row[param];};

			var data = _und.map(result, iteratee);
			data = _und.without(_und.sortBy(_und.unique(_und.flatten(data))), "");

			return res.json(data);
		}
	});
}

module.exports = router;