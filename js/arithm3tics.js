$(document).ready(function(){
	createBoard();
	
	var wantedNumbers = createWantedNumbers();
	
	$('#new-round-button').click(newRound);
	
});

function createBoard(){
	boardNumbers = createRandomBoardNumbers();
	
	for(i=0;i<8; i++){
		var the_tr = $('<tr>');
		for(j=0;j<8;j++){
			var element = $('<div>').addClass('board-element-inner');
			if(boardNumbers.length > 0){
				element.text(boardNumbers[i*8+j]);
			} else {
				element.text(Math.floor(Math.random()*10));
			}
			var the_td = $('<td>').append($('<div>').addClass('board-element').append(element));
			the_tr.append(the_td);
		}
		$("#board-table").append(the_tr);
	}
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

function newRound(){
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
