$(document).ready(function(){

	window.myFlux = new flux.slider('#slider', {
		autoplay: false,
		pagination: true,
		controls: true,
		transitions: [ "blocks2" ]
	});

	$('#tweets').twitter({
		tweets: 4,
		username: "larrifax"
	});
	
	$('#photos').flickr({
		count: 2,
		photoset: "72157627755277055",
		apiKey: "67a78c35dcd459db347a70e085ee73f6",
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
	return '<img style="padding-left: 50%" src="images/loader.gif">';
}

function createError(type, message, fadeIn, canClose)
{
	fadeIn = typeof(fadeIn) != 'undefined' ? fadeIn : true;
	canClose = typeof(canClose) != 'undefined' ? canClose : true;
	
	var fadeInMarkup = fadeIn ? ' fade in' : '';
	var closeMarkup = canClose ? '<a class="close" href="#">×</a>' : '';
	return '<div class="alert-message ' + type + fadeInMarkup + '" data-alert="alert">' + closeMarkup + message + '</div>';
}


function relative_time(time_value) {
  var values = time_value.split(" ");
  time_value = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];
  var parsed_date = Date.parse(time_value);
  var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
  var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
  delta = delta + (relative_to.getTimezoneOffset() * 60);

  if (delta < 60) {
    return 'less than a minute ago';
  } else if(delta < 120) {
    return 'about a minute ago';
  } else if(delta < (60*60)) {
    return (parseInt(delta / 60)).toString() + ' minutes ago';
  } else if(delta < (120*60)) {
    return 'about an hour ago';
  } else if(delta < (24*60*60)) {
    return 'about ' + (parseInt(delta / 3600)).toString() + ' hours ago';
  } else if(delta < (48*60*60)) {
    return '1 day ago';
  } else {
    return (parseInt(delta / 86400)).toString() + ' days ago';
  }
}