$(document).ready(function(){

	mathOperations = new Array();
	mathOperations = [add, subtract, multiply, divide];	
	
	
	$('#easy-level-button').click({difficulty: "easy"}, newGame);
	$('#medium-level-button').click({difficulty: "medium"}, newGame);
	$('#hard-level-button').click({difficulty: "hard"}, newGame);
	
});

function newGame(event){
	var difficulty = event.data.difficulty;
	
	new Game(difficulty);
	
	$('#welcome-container').removeClass("show");
	$('#welcome-container').addClass("hidden");
	$('#game-container').removeClass("hidden");
	$('#game-container').addClass("show");

}




function add(element, otherElement){
	return element + otherElement;
}

function subtract(element, otherElement){
	return element - otherElement;
}

function multiply(element, otherElement){
	return element * otherElement;
}

function divide(element, otherElement){
	return element / otherElement;
}
