(function($){
    $.fn.twitter = function(options) {
        var defaults = {
            tweets: 5,
            before: "<li>",
            after: "</li>",
            retweets: true
        };
        var options = $.extend(defaults, options);
        
        return this.each(function() {
		var obj = $(this);
		var errorMsg = options.before + createError("warning", "Could not load tweets.", false, false) + options.after;
		
		$.ajax({
			url: "http://api.twitter.com/1/statuses/user_timeline.json",
			dataType: 'jsonp',
			data:
			{
				screen_name: options.username,
				include_rts: options.retweets,
				count: options.tweets
			},
			beforeSend: function() {
				obj.html(createLoader());
			},
			error: function() {
				obj.html(errorMsg);
			},
			success: function(data) {
				var items = [];
				$.each(data, function(key, item) {
					items.push(options.before + '<span>' + item.text + '</span>' + '<a href="http://twitter.com/' + item.user.screen_name + '/statuses/' + item.id_str + '">' + relative_time(item.created_at) + '</a>' + options.after);
				});
				obj.html(items.join(''));
			} 
		});
        });
    };
})(jQuery);