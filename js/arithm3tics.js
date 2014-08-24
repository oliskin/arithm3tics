$(document).ready(function(){

	selectedElements = new Array();

	createBoard();
	
	var wantedNumbers = createWantedNumbers();
	
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
		
		$("#wanted-number").text(wantedNumbers[selectedNumber]);
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
	
	// //if now the list contains three elements, start evaluations
// 	if(selectedElements.length == 3){
// 		checkAdjacencyOfElements(selectedElements);
// 		checkMathematicalCorrectness();
// 	}

}

// function checkAdjacencyOfElements(elements){
// 	//sort elements
// 	
// }
// 
// function checkMathematicalCorrectness(){
// 
// }

function find(element, array){
	for(var i = 0; i<array.length; i++){
		if(array[i] == element){
			return i;
		}
	}
	return -1;
}
