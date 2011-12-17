(function($){
    $.fn.flickr = function(options) {
        var defaults = {
		count: 4,
		before: "<li>",
		after: "</li>",
		privacyFilter: 1,
		media: "photos",
		size: "m"
        };
        var options = $.extend(defaults, options);
        
        return this.each(function() {
		var obj = $(this);
		var errorMsg = options.before + createError("warning", "Could not load photos.", false, false) + options.after;

		$.ajax({
			url: "http://api.flickr.com/services/rest/",
			dataType: "jsonp",
			jsonp: "jsoncallback",
			data:
			{
				method: "flickr.photosets.getPhotos",
				format: "json",
				api_key: options.apiKey,
				photoset_id: options.photoset,
				privacy_filter: options.privacyFilter,
				media: options.media,
			
			},
			beforeSend: function() {
				obj.html(createLoader());
			},
			error: function() {
				obj.html(errorMsg);
			},
			success: function(data) {
				if (data.stat != "ok") {
					obj.html(errorMsg);
					return;
				}
				
				var items = [];
				$.each(data.photoset.photo.sort(function(){ return Math.round(Math.random()) - 0.5 }).slice(0,options.count), function(i, item){
					var photoUrl = "http://www.flickr.com/photos/" + data.photoset.ownername + "/" + item.id;
					var imageUrl = "http://farm" + item.farm + ".staticflickr.com/" + item.server + "/" + item.id + "_" + item.secret + "_" + options.size + ".jpg";
				
					var link = $('<a></a>').attr('href', photoUrl).attr('title', item.title);
					var image = $('<img>').attr('src', imageUrl).attr('alt', "Flickr photo: " + item.title).appendTo(link);					
					var photo = $(options.before + options.after).append(link);
					var dummy = $('<div></div>').append(photo);

					items.push(dummy.html());
				});			
				obj.html(items.join(''));
			}
		});
        });
    };
})(jQuery);