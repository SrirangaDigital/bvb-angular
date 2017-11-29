const express = require('express');
const router = express.Router();
const elasticlunr = require('elasticlunr');
const fs = require('fs');
const path = require('path');

// Create index and store it to a file
router.get('/', function(req, res){

	var pad = "000";
    
	// var indexData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/index/searchIndex001.json'), 'utf8'));
	// var searchIndex = elasticlunr.Index.load(indexData);

    for(i=1;i<=64;i++) {

    	var searchIndex = elasticlunr(function () {

    	    this.addField('text');
    	    this.setRef('pageid');
    	    this.saveDocument(false);
    	});

		var str = "" + i;
		var id = pad.substring(0, pad.length - str.length) + str;

		var volumeData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../public/source/' + id + '.json'), 'utf8'))
		for(j=0;j<volumeData.length;j++) {

			console.log(volumeData[j]['pageid']);
	        searchIndex.addDoc(volumeData[j]);
	    }
	
		fs.writeFileSync(path.join(__dirname, '../../public/index/searchIndex' + id + '.json'), JSON.stringify(searchIndex));
	}

});

module.exports = router;