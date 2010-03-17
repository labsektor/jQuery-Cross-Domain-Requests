/*
 * Create a YQL query, strip all script tags, and insert into the parent element.
 * DON'T USE THIS YET. IT'S FOR A QUICK TIP ON NETTUTS, AND WILL BE IMPROVED DRASTICALLY.
*/ 

function requestCrossDomain(site) {
	if ( !site ) {
		alert('No site passed');
		return false;
	}
	
	var that = this;
	
	// EXPAND THIS! SUCKS RIGHT NOW.
	function isExternal(url) { return url.match('https?://|www\.'); }
	
	if ( isExternal(site) ) {
		// cross domain request
		yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from html where url="' + site + '"') + '&format=xml&callback=?';

		$.getJSON(yql, function(data) {
			if ( data.results[0] ) {
				data = data.results[0].replace(/<script[^>]*>[\s\S]*?<\/script>/g,'');
				$(that).parent().html(data);
			}
			
			else throw new Error('Nothing returned from getJSON.');
		});
	}
		
	else {
		// local request. 
		$(that).parent().load(site);
	}
	
}
