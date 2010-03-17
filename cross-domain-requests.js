/*
 * Create a YQL query, strip all script tags, and insert into the parent element.
*/ 

function requestCrossDomain( site, callback ) {
	if ( !site ) {
		alert('No site passed');
		return false;
	}
	
	yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from html where url="' + site + '"') + '&format=xml&callback=?';

	$.getJSON(yql, function(data) {
		if ( data.results[0] ) {
			data = data.results[0].replace(/<script[^>]*>[\s\S]*?<\/script>/g,'');
			
			if ( typeof callback === 'function' ) {
				callback(data);
			}
		}
		
		else throw new Error('Nothing returned from getJSON.');
	});	
}
