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
				var info = '<strong>' + item.album['#text'] + "</strong> by <em>" + item.artist['#text'] + '</em>';

				var link = $('<a rel="popover"></a>').attr('href', item.url).attr('title', item.name).attr('data-content', info);
				var image = $('<img>').attr('src', item.image[2]['#text']).attr('alt', info).appendTo(link);
				var track = $(options.before + options.after).append(link);
				var dummy = $('<div></div>').append(track);

				items.push(dummy.html());
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
    		before: '<li>',
    		after: "</li>"
        };
    
} (jQuery));