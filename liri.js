

// this is the commands 

// my-tweets
// spotify-this-song
// movie-this
// do-what-it-says


// this action passed in to the terminal.
var action = process.argv[2];
var call = process.argv[3];
// this is a switch case statment

    switch(action) {
        case "movie-this":
        movie();
        break;

        case "my-tweets":
        twitter();
        break;

        case "spotify-this-song":
        spotify();
        break;

        case "do-what-it-says":
        sayWhat();
        break;
    }

function movie(){
// EndUser input to search the movie.
    var movieName = process.argv[3] || 'Mr.Nobody';

    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&r=json";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    // Then create a request to the queryUrl

    var request = require('request');

    request(queryUrl, function(error, response, body){

    // If the request is successful
      // ...
    	if (!error && response.statusCode == 200) {

    // Then log the Release Year for the movie
      // ...
        console.log(JSON.parse(body)["Year"]);
        console.log(JSON.parse(body)["Title"]);
        console.log(JSON.parse(body)["Actors"]);
        console.log(JSON.parse(body)["imdbRating"]);
        console.log(JSON.parse(body)["Country"]);
        console.log(JSON.parse(body)["Plot"]);
        console.log(JSON.parse(body)["Actors"]);
        console.log(JSON.parse(body)["tomatoRating"]);
        console.log(JSON.parse(body)["tomatoURL"]);


     }

    });
};

function twitter() {
    // this is getting the keys from the file    
        var key = require('./keys.js');

      // requiring twitter
        var Twitter = require('twitter');

    // setting keys to the client variable 
        var client = new Twitter({
              consumer_key: key.twitterKeys.consumer_Key,
              consumer_secret: key.twitterKeys.consumer_secret,
              access_token_key: key.twitterKeys.access_token_Key,
              access_token_secret: key.twitterKeys.access_token_secret,
            });
        // creating a variable params and setting it to the user screen name 
        var params = {screen_name: 'limbert_techGuy'};
        // 
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            // 
         if(!error ) {
            // looping throught the object
            for( var i = 0; i < tweets.length; i ++){
                // logging out the tweets
            console.log(tweets[i].text);
        }

          }else {
                // logging out the error 
            console.log(error);
          }
        
     });

}

function spotify(){
// this is the spotify Request 
    var query = process.argv[3] || "The Sign";
    // requiring the spotify module
    var spotify = require('spotify');
     // searching for the track and query 
    spotify.search({ type: 'track' , query: query }, function(err, data) {
        // if there is an error log it and return
        if ( err ) {

            console.log('Error occurred: ' + err);

            return;

        }else{
            // logging out the necessary infromation
            console.log(data.tracks.items[0].artists[0].name);
            console.log(data.tracks.items[0].name);
            console.log(data.tracks.items[0].external_urls.spotify);
            console.log(data.tracks.items[0].album.name);

        }
        
    });
};

function sayWhat(){

    var fs = require('fs');

    if(action == "do-what-it-says"){


    fs.readFile("random.txt","utf8", function(err, data){

        var dataArray = data.split(", ");

        console.log(dataArray);

        var randSong = dataArray[Math.floor(Math.random()*dataArray.length)];

        spotify(randSong);
        
    });

    }
}
