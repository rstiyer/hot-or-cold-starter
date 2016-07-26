var secret, guessCount;

$(document).ready(function(){
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

  	newGame();

  	$('.new').click(function() {
  		newGame();
  	});

  	$('.game > form').submit(function(e) {
  		e.preventDefault();
  		var userInput = getUserInput();
  		if (isValidInput(userInput)) {
  			recordGuess(userInput);
  			updateFeedback(userInput);
  		} else {
  			alert('Please choose an integer between 1 and 100, inclusive.')
  		}
  		$('form')[0].reset();
  	});

});

function newGame() {
	setSecret();
	resetCount();
}

function setSecret() {
	secret = Math.floor(Math.random()*100 + 1);
}

function resetCount() {
	guessCount = 0;
	updateCount();
}

function increaseCount() {
	guessCount++;
	updateCount();
}

function updateCount() {
	$('#count').text(guessCount);
}

function recordGuess(userInput) {
	increaseCount();
	addGuessToSavedList(userInput);
}

function addGuessToSavedList(userInput) {
	$('ul#guessList').append('<li>'+ userInput +'</li>');
}

function isValidInput(userInput) {
	return userInput && (0 < userInput) && (userInput < 101);
}

function getUserInput() {
	var rawInput = $('input#userGuess').val();
	return parseInt(rawInput);
}

function updateFeedback(userInput) {
	var distance = calculateDistanceFromSecret(userInput);
	var feedbackMsg = temperatureFeedback(distance);
	displayFeedback(feedbackMsg);
}

function calculateDistanceFromSecret(userInput) {
	return Math.abs(userInput - secret);
}

function temperatureFeedback(distance) {
	if (distance >= 50)
		return "Ice Cold";
	else if (distance >= 30)
		return "Cold";
	else if (distance >= 20)
		return "Warm";
	else if (distance >= 10)
		return "Hot";
	else if (distance >= 1)
		return "Very Hot";
	else
		return "You got it!"
}

function displayFeedback(feedbackMsg) {
	$('#feedback').text(feedbackMsg);
}