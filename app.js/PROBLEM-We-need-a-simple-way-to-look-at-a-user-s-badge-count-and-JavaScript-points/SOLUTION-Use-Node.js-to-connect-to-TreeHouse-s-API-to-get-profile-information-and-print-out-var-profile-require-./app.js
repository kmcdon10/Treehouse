// PROBLEM: We need a simple way to look at a user's badge count and JavaScript points
// SOLUTION: Use Node.js to connect to TreeHouse's API to get profile information and print out


var profile = require("./profile.js");
var users = process.argv.slice(2);
users.forEach(profile.get);
