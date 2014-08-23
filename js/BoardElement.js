BoardElement = function(row, col){
	innerElement = $('<div>').addClass('board-element-inner');
	basicElement = $('<div>').addClass('board-element').append(innerElement);


	$.extend(this, basicElement,
	{
		row				: row,
		col				: col,
		
		setValue 		: function(value){
			innerElement.text(value);
		},
		
		toggleElement	: function(){
			this.toggleClass('selected');
		}
	});
	
}
