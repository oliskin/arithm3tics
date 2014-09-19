Board = function(size, maximumElementValue, game){

	this.size = size; //Number of rows and cols
	this.maximumElementValue = maximumElementValue;
	this.rows = this.size;
	this.cols = this.size;

	var elements = new Array();
	this.selectedElements = new Array();
	
	this.createBoardNumbers = function(amount, maxValue){
		var boardNumbers = new Array();
		
		var approximateItemCount = Math.round(amount/maxValue);
		
		for(var i = 1; i<=maxValue; i++){
			for(var j = 1; j<= approximateItemCount; j++){
				boardNumbers.push(i);
			}
		}
		return boardNumbers;
	};
	
	var boardNumbers = this.createBoardNumbers(this.rows * this.cols, this.maximumElementValue);
	
	$("#board-table").empty();
	for(i=0;i<this.rows; i++){
		var the_tr = $('<tr>');
		for(j=0;j<this.cols;j++){
			var value;
			
			if(boardNumbers.length > 0){
				value = removeRandomElementFromArray(boardNumbers);
			} else {
				value = Math.floor((Math.random()*this.maximumElementValue)+1);
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
	
		element.click(function(){
			game.elementClicked(element);
		});
		
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

	
	
	
	function removeRandomElementFromArray(array){
		var selectedIndex = Math.floor(Math.random()*array.length);
		
		var selectedValue = array[selectedIndex];
		array.splice(selectedIndex,1);
		
		return selectedValue;
	}

}