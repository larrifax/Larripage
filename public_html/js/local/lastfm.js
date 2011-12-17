(function($) {

	var recentTracks = function(element, options) {
		
		var url = "http://ws.audioscrobbler.com/2.0/";
		var params = {
			format: "json",
			api_key: options.apiKey,
			user: options.username
		};
		
		recentTracks();
		
		function recentTracks() {
			
			$.ajax({
				url: url,
				dataType: "jsonp",
				jsonp: "callback",
				data: $.extend({}, params, {
					method: "user.getRecentTracks",
					limit: options.count
				}),
				beforeSend: function() {
					element.html(createLoader());
				},
				error: function() {
					var errorMsg = options.before + createError("warning", "Could not load tracks from Last.fm.", false, false) + options.after;
					element.html(errorMsg);
				},
				success: function(data) {
					doShowRecentTracks(data);
				}
			});

		}
		
		function doShowRecentTracks(data) {
			var items = [];
			$(data.recenttracks.track).each(function(index, item) {				
				var image = $('<img src="' + item.image[2]['#text'] + '">').attr('alt', item.artist['#text'] + " - " + item.name);
				var imageDiv = $('<div></div>').append(image);

				var info = '<span class="info"><span class="title">' + item.name + '</span><span class="album">' + item.album['#text'] + '</span><span class="artist">' + item.artist['#text'] + '</span></span>';
//				var link = '<a href="' + item.url + '">' + image + info + '</a>';
				
				var link2 = '<a href="' + item.url + '">Test</a>';
				
				items.push(options.before + link2 + imageDiv.html() + options.after);
				
			});
			element.html(items.join(''));
		}

	}

	$.fn.lastfm = function(options) {
		var options = $.extend($.fn.lastfm.defaults, options);

		if (typeof(options.username) === "undefined") {
			return this;
		}

		if (typeof(options.apiKey) === "undefined") {
			return this;
		}

		return this.each(function(){
			recentTracks($(this), options);
		});
	};

	$.fn.lastfm.defaults = {
    		count: 4,
    		before: '<li class="cd">',
    		after: "</li>"
        };
    
} (jQuery));