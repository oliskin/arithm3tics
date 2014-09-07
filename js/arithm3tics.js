$(document).ready(function(){

	selectedElements = new Array();
	mathOperations = new Array();
	mathOperations = [add, subtract, multiply, divide];

	createBoard();
	
	var wantedNumbers = createWantedNumbers();
	wantedNumber = -1;
	
	$('#new-round-button').click(newRound);
});


function createBoard(){
	boardNumbers = createRandomBoardNumbers();
	
	for(i=0;i<8; i++){
		var the_tr = $('<tr>');
		for(j=0;j<8;j++){
			var value;
			
			if(boardNumbers.length > 0){
				value = boardNumbers[i*8+j];
			} else {
				value = Math.floor(Math.random()*10);
			}
			
			var element = createElement(i,j,value);
			
			var the_td = $('<td>').append(element);
			the_tr.append(the_td);
		}
		$("#board-table").append(the_tr);
	}
}

function createElement(row, col, value){
	var element = new BoardElement(i,j);
	element.setValue(value);
	
	
 	element.click({clickedElement: element }, elementClicked);
	
	return element;
}

function createRandomBoardNumbers(){
	boardNumbers = new Array();
	for(var i = 1; i<=8; i++){
		for(var j = 1; j<= 8; j++){
			boardNumbers.push(i);
		}
	}
	return shuffleArray(boardNumbers);
}

function shuffleArray(array){
	resultArray = new Array();
	
	while(array.length > 0){
		var pickThisNumber = Math.floor(Math.random() * array.length);
		resultArray.push(array[pickThisNumber]);
		
		array.splice(pickThisNumber,1);
	}
	return resultArray;

}

function createWantedNumbers(){
	wantedNumbers = new Array();
	for(var i = 0; i<50; i++){
		wantedNumbers.push(i+1);
	}
	return wantedNumbers;
}

function newRound(arg1){

	$('#next-number-button').off();
	$('#next-number-button').click(showNewWantedNumber);
	wantedNumbers = createWantedNumbers();
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
	
	unselectAllElements();
	
	if(wantedNumbers.length > 0){
		var selectedNumber = Math.floor(Math.random()*wantedNumbers.length);
		
		this.wantedNumber = wantedNumbers[selectedNumber];
		$("#wanted-number").text(this.wantedNumber);
		wantedNumbers.splice(selectedNumber,1);
		
		window.setTimeout(function(){
			$('#time-panel').removeClass('in');
		}, 3500);
		
		
		
	} else {
		$("#wanted-number").text("fin");
		$("#t").timer('pause');
	}
}

function unselectAllElements(){
	while(selectedElements.length > 0){
		selectedElements[0].markElementUnselected();
		selectedElements.splice(0,1);
	}
}


function elementClicked(event){
 	if(wantedNumber > -1){
		var element = event.data.clickedElement;
	
		//adding or removing element to the selectedElements list
		//if the element is inside the list, remove it
		var elementIndex = find(element, selectedElements);
	
		if(elementIndex < 0){
			selectedElements.push(element);
			element.markElementSelected();
		} else {
			selectedElements.splice(elementIndex, 1);
			element.markElementUnselected();
		}
	
		//if now the list contains three elements, start evaluations
		if(selectedElements.length == 3){
			
			evaluateResult(selectedElements, wantedNumber);

		}
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
 			unselectAllElements();
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

function find(element, array){
	for(var i = 0; i<array.length; i++){
		if(array[i] == element){
			return i;
		}
	}
	return -1;
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
