// Initialize Firebase
var config = {
	apiKey: "AIzaSyD2RIIHc9dMNi0GJBy0YINAgdUk7-LUJdY",
	authDomain: "trainscheduler-ab5b0.firebaseapp.com",
	databaseURL: "https://trainscheduler-ab5b0.firebaseio.com",
	storageBucket: "trainscheduler-ab5b0.appspot.com",
};
firebase.initializeApp(config);

var trainName, destination, freq;

// Button for adding train data
$("#addTrainBtn").on("click", function(){
	// Grab user input
	trainName = $("#trainNameInput").val().trim();
	trainDestination = $("#destinationInput").val().trim();
	trainFreq = $("#freqInput").val().trim();

	// Create local object to hold train data
	var newTrain = {
		name: trainName,
		destination: trainDestination,
		freq: trainFreq,
		created: firebase.database.ServerValue.TIMESTAMP
	};

	console.log(newTrain.name);

	// Upload train data to database
	firebase.database().ref().push(newTrain);

	// Clear input fields
	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#freqInput").val("");
});

firebase.database().ref().on("child_added", function(childSnapshot, prevChildKey){

	trainName = childSnapshot.val().name;
	destination = childSnapshot.val().destination;
	freq = childSnapshot.val().freq;

	$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + freq + "</td><td>05:35 PM</td><td>10</td>");

})