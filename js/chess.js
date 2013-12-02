$(function() {
	$('#chess tr').each(function(index, elem) {
		if (index == 1) {
			var blackPawn = $('<img class="item black" src="img/black/Chess-Pawn-icon.png"></img>');
			$(elem).children()
				.append(blackPawn)
				.mousedown(moveStart)
				.mousemove(moving)
				.mouseup(moveEnd);
		} else if (index == 6) {
			var whitePawn = $('<img class="item white" src="img/white/Chess-Pawn-icon.png"></img>');
			$(elem).children()
				.append(whitePawn)
				.mousedown(moveStart)
				.mousemove(moving)
				.mouseup(moveEnd);
		}
	});
});

function moveStart(ev) {
	var item = ev.target;
	$(item).parent().empty();
	$.append(item);
}

function moving(ev) {
}

function moveEnd(ev) {
	console.log("pawn released");
}
