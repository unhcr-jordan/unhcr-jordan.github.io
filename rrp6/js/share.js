/* share viz filters https://stackoverflow.com/questions/20853794/dc-js-permalink-or-href-to-share-the-visualisation-filter-state */

/* stringifying a JSON object: */

dc.share1 = function() {

	var filters = [];
	for (var i = 0; i < dc.chartRegistry.list().length; i++) {
	    var chart = dc.chartRegistry.list()[i];
	    for (var j = 0; j < chart.filters().length; j++){
	        filters.push({ChartID: chart.chartID(), Filter: chart.filters()[j]});  
	    }
	}
	var urlParam =  encodeURIComponent(JSON.stringify(filters));
	
	
	var share = {},
        viz;

    tj = {};
    var l = window.location;
    tj.webpage = l.urlParam;
    var link = document.createElement('a');
    var close = document.createElement('a');
    var embed = document.createElement('textarea');
    var share = document.createElement('div');
    

    link.innerHTML = 'Share +';
    link.href = '#';
    link.className = 'share';
    link.onclick = link.ontouchstart = function() {
        popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
        $('body').toggleClass('sharing');
        return false;
    };

    close.innerHTML = 'Close';
    close.href = '#';
    close.className = 'close';
    close.onclick = close.ontouchstart = function() {
        popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
        $('body').toggleClass('sharing');
        return false;
    };
    
    var twitter = 'http://twitter.com/intent/tweet?status='
        + encodeURIComponent(document.title + ' (' + tj.webpage + ')');
    var facebook = 'https://www.facebook.com/sharer.php?u='
        + encodeURIComponent(tj.webpage)
        + '&t=' + encodeURIComponent(document.title);
    share.innerHTML = ('<h3>Share this viz</h3>'
        + '<p><a class="facebook" target="_blank" href="{{facebook}}">Facebook</a>'
        + '<a class="twitter" target="_blank" href="{{twitter}}">Twitter</a></p>')
        .replace('{{twitter}}', twitter)
        .replace('{{facebook}}', facebook);
    share.appendChild(embed);
    share.appendChild(close);

    popup.className = 'viz-share';
    popup.style.display = 'none';
    popup.appendChild(share);
    


    share.viz = function(x) {
        if (!x) return viz;
        viz = x;
        return this;
    };

    share.add = function() {
        this.appendTo($('body')[0]);
        return this;
    };

    share.remove = function() {
        $(link).remove();
        $(popup).remove();
        return this;
    };

    share.appendTo = function(elem) {
        wax.u.$(elem).appendChild(link);
        wax.u.$(elem).appendChild(popup);
        return this;
    };

    return share;
};
    

	console.log (urlParam);

/* reverse process of parsing the JSON string and applying the filters: 


var urlParam = ""; //have user input string somehow
var filterObjects = JSON.parse(decodeURIComponent(urlParam));
for (var i = 0; i< filterObjects.length; i++)
{
    dc.chartRegistry.list()[filterObjects[i].ChartID-1].filter(filterObjects[i].Filter);
}
dc.redrawAll();

*/ 
