Game = function(difficulty){

	var wantedNumbers;
	var wantedNumber = -1;
	var self = this;
	
	$('#new-round-button').click(newRound);

	

	init(difficulty);

	
	
	
//public functions
	function elementClicked(element){
		if(wantedNumber > -1){
			board.elementClicked(element);
		
			var selectedElements = board.getSelectedElements();
	
			//if now the list contains three elements, start evaluations
			if(selectedElements.length == 3){
			
				evaluateResult(selectedElements, wantedNumber);

			}
		}

	}
	this.elementClicked = elementClicked;

	

//private functions

	function init(difficulty){
		if(difficulty == "easy"){
			wantedNumbers = createWantedNumbers(20);
			board = new Board(6,8, self);
		} 
		else if(difficulty == "medium"){
			wantedNumbers = createWantedNumbers(40);
			board = new Board(7,8, self);
		} 
		else {
			wantedNumbers = createWantedNumbers(50);
			board = new Board(8,9, self);
		}
	}
	
	function createWantedNumbers(maximum){
		if(maximum == null) {
			maximum = 50;
		}
		
		wantedNumbers = new Array();
		for(var i = 0; i<maximum; i++){
			wantedNumbers.push(i+1);
		}
		return wantedNumbers;
	}

	function newRound(){

		$('#new-round-button').empty();
		$('#new-round-button').append('<span>');
		$('#new-round-button span').addClass("glyphicon glyphicon-repeat");

		$('#next-number-button').off();
		$('#next-number-button').click(showNewWantedNumber);
		
		init(difficulty);
		showNewWantedNumber();
	
		//start the timer
		$("#t").timer('reset');
		$("#t").timer('start');
	
		// fade the time panel out after 5 seconds	
		window.setTimeout(function(){
			$('#time-panel').addClass('fade');
		}, 3500);
	}

	function showNewWantedNumber(){
		$('#time-panel').addClass('fade in');
	
		board.unselectAllElements();
	
		if(wantedNumbers.length > 0){
			var selectedIndex = Math.floor(Math.random()*wantedNumbers.length);
		
			wantedNumber = wantedNumbers[selectedIndex];
			$("#wanted-number").text(wantedNumber);
			wantedNumbers.splice(selectedIndex,1);
		
			window.setTimeout(function(){
				$('#time-panel').removeClass('in');
			}, 3500);
		
		
		
		} else {
			$("#wanted-number").text("Excellent!");
			$("#t").timer('pause');
		}
	}

	function evaluateResult(selectedElements, wantedNumber){
			isAdjacent = checkAdjacencyOfElements(selectedElements);
			isCorrect = checkMathematicalCorrectness(selectedElements, wantedNumber);
			if(isAdjacent && isCorrect){
				$.each(selectedElements, function(index, value) {
					value.markElementCorrect();
				});
				showNewWantedNumber();
			
			} else {
				$.each(selectedElements, function(index, value) {
					value.markElementIncorrect();
				});
				board.unselectAllElements();
			}
	}

	function checkAdjacencyOfElements(elements){
		var firstRowGap = elements[0].row - elements[1].row;
		var secondRowGap = elements[1].row - elements[2].row;
		var isRowAdjacent = (firstRowGap == secondRowGap) && Math.abs(firstRowGap)<=1;
	
		var firstColGap = elements[0].col - elements[1].col;
		var secondColGap = elements[1].col - elements[2].col;
		var isColAdjacent = (firstColGap == secondColGap) && Math.abs(firstColGap) <= 1;
		if(isRowAdjacent && isColAdjacent){
			return true;
		} else {
			return false;
		}
	}



	function checkMathematicalCorrectness(selectedElements, result){
		if(result != null && selectedElements.length > 2){
			//try first mathematical operation
			for(i = 0; i< mathOperations.length; i++){
				var partResult = mathOperations[i](selectedElements[0].value, selectedElements[1].value);
			
				//try second mathematical operation
				for(j=0; j<mathOperations.length; j++){
					var calcResult = mathOperations[j](partResult, selectedElements[2].value);
					if (calcResult == result){
						return true;
					}
				}
			}
		}
		return false;
	
	
	}
	
}