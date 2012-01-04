$(document).ready(function(){

	WebFont.load({
		google: {
			families: ['Droid Serif:700', 'Droid Sans:700', 'Open Sans']
		}
	});

	window.myFlux = new flux.slider('#slider', {
		autoplay: false,
		pagination: true,
		controls: true,
		transitions: [ "blocks2" ]
	});
	
	$.prettyDate.messages = $.extend($.prettyDate.messages, { yesterday: "yesterday" });

	$('#photos').flickr({
		count: 2,
		photoset: "72157627755277055",
		apiKey: "67a78c35dcd459db347a70e085ee73f6",
	});

	$('#tweets ul').twitter({
		tweets: 4,
		username: "larrifax"
	});
	
	$('#music').lastfm({
		count: 8,
		username: "larrifax",
		apiKey: "3b2dea3a8324d4c79895f2f866790441"
	});
	
	$("a[rel=popover]").popover({
		live: true,
		html: true,
		delayIn: 200,
		template: '<div class="arrow"></div><div class="inner"><h5 class="title"></h5><div class="content"><p></p></div></div>'
	});
	
//	$('a').filter(function() { return this.hostname && this.hostname !== location.hostname; }).after(' <img src="images/external.png" alt="External link"/>');
	
});

function createLoader()
{
	return '<img style="padding-left: 50%" src="http://static.tryggestad.me/images/loader.gif">';
}

function createError(type, message, fadeIn, canClose)
{
	fadeIn = typeof(fadeIn) != 'undefined' ? fadeIn : true;
	canClose = typeof(canClose) != 'undefined' ? canClose : true;
	
	var fadeInMarkup = fadeIn ? ' fade in' : '';
	var closeMarkup = canClose ? '<a class="close" href="#">×</a>' : '';
	return '<div class="alert-message ' + type + fadeInMarkup + '" data-alert="alert">' + closeMarkup + message + '</div>';
}

function formatDate(time)
{
	var months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
	var date = new Date((time || "").replace(/-/g, "/").replace(/TZ/g, " "));
	return date.getDate() + ' ' + months[date.getMonth()] + ', ' + date.getFullYear();
}
