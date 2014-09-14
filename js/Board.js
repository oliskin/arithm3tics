Board = function(){

	var elements = new Array();
	this.selectedElements = new Array();
	
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
	
	
//public functions

	function unselectAllElements(){
		while(this.selectedElements.length > 0){
			this.selectedElements[0].markElementUnselected();
			this.selectedElements.splice(0,1);
		}
	}	
	this.unselectAllElements = unselectAllElements;
	
	
	function elementClicked(element){
	
		//adding or removing element to the selectedElements list
		//if the element is inside the list, remove it
		var elementIndex = find(element, this.selectedElements);

		if(elementIndex < 0){
			this.selectedElements.push(element);
			element.markElementSelected();
		} else {
			this.selectedElements.splice(elementIndex, 1);
			element.markElementUnselected();
		}
	}
	this.elementClicked = elementClicked;
	
	
	function getSelectedElements(){
		return this.selectedElements;
	}
	this.getSelectedElements = getSelectedElements;

//private functions

	function createElement(row, col, value){
		var element = new BoardElement(i,j);
		element.setValue(value);
	
	
		element.click({clickedElement: element }, globalElementClicked);
		
		elements.push(element);
	
		return element;
	}
	
	
	
	function find(element, array){
		for(var i = 0; i<array.length; i++){
			if(array[i] == element){
				return i;
			}
		}
		return -1;
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

}