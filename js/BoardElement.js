BoardElement = function(row, col){
	var innerElement = $('<div>').addClass('board-element-inner');
	var basicElement = $('<div>').addClass('board-element').append(innerElement);
	
	$.extend(this, basicElement);
	
	
	
	
	this.row = row;
	this.col = col;


	function setValue(value){
		innerElement.text(value);
		this.value = value;
	}
	this.setValue = setValue;
	
	function markElementSelected(){
		this.addClass('selected');
	}
	this.markElementSelected = markElementSelected;
	
	function markElementUnselected(){
		this.removeClass('selected');
	}
	this.markElementUnselected = markElementUnselected;


	function markElementCorrect(){
		this.addClass('transitioning correct');
		window.setTimeout(function(){
			basicElement.removeClass("correct");
			}, 300);
		window.setTimeout(function(){
			basicElement.removeClass("transitioning");
		}, 1000);
	}
	this.markElementCorrect = markElementCorrect;
	
	
	
	
}
