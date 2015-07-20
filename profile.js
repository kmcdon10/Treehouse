// PROBLEM: We need a simple way to look at a user's badge count and JavaScript points
// SOLUTION: Use Node.js to connect to TreeHouse's API to get profile information and print out


// Connnect to the API URL: (http://teamtreehouse.con/kmcdon10.json)
var http = require("http");

// Print error message
function printError(error) {
	console.error(error.message);
}

// Print the data
function printMessage(username, badgeCount, points){
	var message = username + " has " + badgeCount + " total badge(s) and " + points + " points in JavaScript";
	console.log(message);
}

// Read the data
function get(username){
	var request = http.get("http://teamtreehouse.com/" + username + ".json", function(response) {
		var body = "";
		//console.log("Got response: " + response.statusCode);
		response.on('data', function(chunk) {
		 	body += chunk;
		});
		response.on("end", function() {
			if (response.statusCode === 200){
			// Parse the data (transform the string into an Object)
				try {
					var profile = JSON.parse(body);
					printMessage(username, profile.badges.length, profile.points.JavaScript);
				} catch(error) {
					printError(error);
				}
			}
			else {
				printError({message: "There was an error getting the profile for " + username + ". (" + http.STATUS_CODES[response.statusCode] + ")"});
			}
		});
	});
	request.on("error", printError);
}

module.exports.get = get;
