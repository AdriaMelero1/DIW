// var client_id, client_secret;
// var access_token = '';

// $.ajax({
// 	url: 'keys.json',
// 	dataType: 'json',
// 	success: function (data) {

// 		client_id = data.client_id;
// 		client_secret = data.client_secret;
// 	}
// });

var client_id = '1322cb757caf472baf15032e3f12bbe7';
var client_secret = '52e91bce710e4325b75b5aa4e87c0bb5';
var access_token = '';

function Spotify() {
	this.apiUrl = 'https://api.spotify.com/';
}

//Search for information on an artist, adding the possibility of obtaining their albums.
Spotify.prototype.getArtist = function (artist) {

	artist = encodeURIComponent(artist);
	$.ajax({
		type: "GET",
		url: this.apiUrl + 'v1/search?type=artist&q=' + artist,
		headers: {
			'Authorization': 'Bearer ' + access_token
		},
	}).done(function (response) {
		if (response.artists.items.length == 0) {
			$('.artists').append("<p>No se encontraron artistas</p>");
		} else {
			$('.artists').empty();
			response.artists.items.forEach(item => {
				console.log(item);
				$('.artists').append("<div class='artist'><p>" + item.name + `</p><img src='${item.images[0].url}'></img>` + "</div>");

			});
		}
	});
};

//Search the albums of an artist, given the id of the artist
Spotify.prototype.getArtistById = function (artistId) {

	$.ajax({
		type: "GET",
		url: this.apiUrl + 'v1/artists/' + artistId + '/albums',
		headers: {
			'Authorization': 'Bearer ' + access_token
		},
	}).done(function (response) {
		console.log("Response: " + response);
	});
};

//This fragment is the first thing that is loaded, when the $(document).ready
$(function () {
	$.ajax({
		type: "POST",
		url: "https://accounts.spotify.com/api/token",
		beforeSend: function (xhr) {
			xhr.setRequestHeader("Authorization", "Basic " + btoa(client_id + ":" + client_secret));
		},
		dataType: "json",
		data: { grant_type: "client_credentials" }
	}).done(function (response) {
		access_token = response.access_token;
	});

	var spotify = new Spotify();

	$('#btnSearch').on('click', function () {
		spotify.getArtist($('#fieldSearch').val());
	});

	$('#results').on('click', '.artistId', function () {
		spotify.getArtistById($(this).attr("data-id"));
	});

});