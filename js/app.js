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
  			updateFeedback(userInput);
  			recordGuess(userInput);
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
	updateCount();
	guessCount++;
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
	var feedbackMsg = determineAppropriateFeedback(distance);
	displayFeedback(feedbackMsg);
}

function calculateDistanceFromSecret(userInput) {
	return Math.abs(userInput - secret);
}

function determineAppropriateFeedback(distanceFromSecret) {
	if (distanceFromSecret === 0)
		return "You guessed the secret!"
	else if (guessCount === 0)
		return absoluteFeedbackMsg(distanceFromSecret);
	else
		return relativeFeedbackMsg(distanceFromSecret);
}

function absoluteFeedbackMsg(distanceFromSecret) {
	if (distanceFromSecret >= 50)
		return "Ice Cold";
	else if (distanceFromSecret >= 30)
		return "Cold";
	else if (distanceFromSecret >= 20)
		return "Warm";
	else if (distanceFromSecret >= 10)
		return "Hot";
	else
		return "Very Hot";
}

function relativeFeedbackMsg(distanceFromSecret) {
	var prevGuess = getPrevGuess();
	if (distanceFromSecret < calculateDistanceFromSecret(prevGuess))
		return "Warmer";
	else
		return "Colder";
}

function getPrevGuess() {
	return $('ul#guessList li:last-child').text();
}

function displayFeedback(feedbackMsg) {
	$('#feedback').text(feedbackMsg);
}