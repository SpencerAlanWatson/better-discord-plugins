//META{"name":"spotifyIntegration"}*//

var spotifyIntegration = function () {};

spotifyIntegration.prototype.convert = function () {
	$(".message-text a").each(function () {
		var t = $(this);
		var href = t.attr("href");
		if (href === undefined) return true;
		href = href.replace("http:", "https:");
		if (href.indexOf('open.spotify.com') !== -1 && href.indexOf('?embedAlready=true') === -1) {
			var embedURL, embedHeight = 541, embedWidth = 461;
			if (href.indexOf('track') !== -1) {
				var trackCode = href.split(href.indexOf('track') + 2);
				embedURL = 'https://embed.spotify.com/?uri=spotify%3Atrack%3A' + trackCode;
				embedHeight = 80;
			} else if (href.indexOf('album') !== -1) {
				var trackCode = href.split(href.indexOf('album') + 2);
				embedURL = 'https://embed.spotify.com/?uri=spotify%3Aalbum%3A' + trackCode;
			} else if (href.indexOf('artist') !== -1) {
				var trackCode = href.split(href.indexOf('artist') + 2);
				embedURL = 'https://embed.spotify.com/?uri=spotify%3Aartist%3A' + trackCode;
			} else if (href.indexOf('playlist') !== -1) {
				var userCode = href.split(href.indexOf('user') + 2, href.indexOf('playlist') - 2);
				var trackCode = href.split(href.indexOf('playlist') + 2);
				embedURL = 'https://embed.spotify.com/?uri=spotify%3Auser%3A' + userCode + '%3Aplaylist%3A' + trackCode;
			}
			if (embedURL) {
				var accessory = t.parent().parent().parent().parent().children('.accessory');
				t.attr("href", href + "?embedAlready=true");
				t.replaceWith('');
				accessory.replaceWith('<iframe class="attachment-image attachment-spotify hide" width="'+embedWidth+'" height="'+embedHeight+'" src="' + encodeURI(embedURL) + '" frameborder="0" allowtransparency="true">Whoops not supposed to see this!</iframe>');
				//Seeing as how we are changing the height of some text objects, discord now needs
				//To be reset to the bottom of the text channel to meet user expectations.
				$(".scroller.messages").scrollTop = $(".scroller.messages").scrollHeight;
			}

		}
	});
};

spotifyIntegration.prototype.onMessage = function () {
	setTimeout(this.convert(), 2000);
};
spotifyIntegration.prototype.onSwitch = function () {
	this.convert();
};
spotifyIntegration.prototype.start = function () {
	this.convert();
};

spotifyIntegration.prototype.load = function () {};
spotifyIntegration.prototype.unload = function () {};
spotifyIntegration.prototype.stop = function () {};
spotifyIntegration.prototype.getSettingsPanel = function () {
	return "";
};

spotifyIntegration.prototype.getName = function () {
	return "Spotify Integration";
};
spotifyIntegration.prototype.getDescription = function () {
	return "Adds spotify play integration to Discord";
};
spotifyIntegration.prototype.getVersion = function () {
	return "0.1.3";
};
spotifyIntegration.prototype.getAuthor = function () {
	return "Spencer Alan Watson";
};
