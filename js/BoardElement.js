BoardElement = function(row, col){
	var innerElement = $('<div>').addClass('board-element-inner');
	var basicElement = $('<div>').addClass('board-element').append(innerElement);
	
	$.extend(this, basicElement);
	
	
	
	
	this.row = row;
	this.col = col;

	function setValue(value){
		innerElement.text(value);
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

	
	
	
	
}
