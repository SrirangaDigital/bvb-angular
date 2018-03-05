module.exports = function(volume){
	
	const elasticlunr = require('elasticlunr');
	const fs = require('fs');
	const path = require('path');
	var os = require('os');

	var commonPath = '/home/' + os.userInfo().username + "/Desktop/Bhavans-Journal/common";

	var indexData = JSON.parse(fs.readFileSync(commonPath + '/index/searchIndex' + volume + '.json', 'utf8'));
	var searchIndex = elasticlunr.Index.load(indexData)

	return searchIndex;
};