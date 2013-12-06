var NONE = 0;
var WHITE_PAWN = 1;
var WHITE_BISHOP = 2;
var WHITE_KNIGHT = 3;
var WHITE_ROOK = 4;
var WHITE_QUEEN = 5;
var WHITE_KING = 6;

var BLACK_PAWN = -1;
var BLACK_BISHOP = -2;
var BLACK_KNIGHT = -3;
var BLACK_ROOK = -4;
var BLACK_QUEEN = -5;
var BLACK_KING = -6;

var initialBoard = [
	[BLACK_ROOK, BLACK_KNIGHT, BLACK_BISHOP, BLACK_QUEEN, BLACK_KING, BLACK_BISHOP, BLACK_KNIGHT, BLACK_ROOK],
	[BLACK_PAWN, BLACK_PAWN,   BLACK_PAWN,   BLACK_PAWN,  BLACK_PAWN, BLACK_PAWN,   BLACK_PAWN,   BLACK_PAWN],
	[NONE, 		 NONE, 		   NONE, 		 NONE, 		  NONE,  	  NONE,			NONE,		  NONE		],
	[NONE, 		 NONE, 		   NONE, 		 NONE, 		  NONE,  	  NONE,			NONE,		  NONE		],
	[NONE, 		 NONE, 		   NONE, 		 NONE, 		  NONE,  	  NONE,			NONE,		  NONE		],
	[NONE, 		 NONE, 		   NONE, 		 NONE, 		  NONE,  	  NONE,			NONE,		  NONE		],
	[WHITE_PAWN, WHITE_PAWN,   WHITE_PAWN,   WHITE_PAWN,  WHITE_PAWN, WHITE_PAWN,   WHITE_PAWN,   WHITE_PAWN],
	[WHITE_ROOK, WHITE_KNIGHT, WHITE_BISHOP, WHITE_QUEEN, WHITE_KING, WHITE_BISHOP, WHITE_KNIGHT, WHITE_ROOK],
];

$(function() {
	$('#chess tr').each(function(i, elem) {
		$(this).find("td").each(function(j, elem) {
			var itemID = initialBoard[i][j];
			if (itemID != NONE) {
				var itemDescription = getItemDescriptionById(itemID);
				var item = $("<img class='item' src='img/" + itemDescription + "-icon.png'/>");
				$(this).append(item);
				$(this).click(function() {
					$("td").children().removeClass("selectedItem");
					$(this).find('img').addClass("selectedItem");	
					$("#chess tr").each(function(k, elem) {
						$(this).find("td").each(function(l, elem) {
							var moves = getItemMoves(itemID, i, j);
							if (moveAllowed(moves, k, l)) {
								$(this).children().addClass("selectedItem");
							}
						});
					});
				});
			} else {
				var item = $("<span></span>");
				item.addClass("possibleMove");
				$(this).append(item);
				$(this).click(function() {
					$("td").children().removeClass("selectedItem");
				});
			}
		});
	});
});

function getItemDescriptionById(itemID) {
	switch (itemID) {
		case BLACK_ROOK:
			return "black/Chess-Rook";
		case BLACK_KNIGHT:
			return "black/Chess-Knight";
		case BLACK_BISHOP:
			return "black/Chess-Bishop";
		case BLACK_QUEEN:
			return "black/Chess-Queen";
		case BLACK_KING:
			return "black/Chess-King";
		case BLACK_PAWN:
			return "black/Chess-Pawn";
		case WHITE_PAWN:
			return "white/Chess-Pawn";
		case WHITE_ROOK:
			return "white/Chess-Rook";
		case WHITE_KNIGHT:
			return "white/Chess-Knight";
		case WHITE_BISHOP:
			return "white/Chess-Bishop";
		case WHITE_QUEEN:
			return "white/Chess-Queen";
		case WHITE_KING:
			return "white/Chess-King";
		case NONE:
			return "";
	}
}

function getItemMoves(item, x, y) {
	var itemModel = Math.abs(item);
	switch (itemModel) {
		case WHITE_ROOK:
			return getRookMoves(x, y);
		case WHITE_QUEEN:
			return getQueenMoves(x, y);
		case WHITE_KING:
			return [];	
		case WHITE_KNIGHT:
			return [];
		case WHITE_BISHOP:
			return getBishopMoves(x, y);
		case NONE:
			return [];
	}

	if (item == WHITE_PAWN) {
	} else if (item == BLACK_PAWN) {
	}
	return [];
}

function getRookMoves(x, y) {
	var moves = [];
	for (var i = 0; i < 8; i++) {
		if (i != x) {
			moves.push([i, y]);
		}

		if (i != y) {
			moves.push([x, i]);
		}
	}
	return moves;
}

function getBishopMoves(x, y) {
	var moves = [];
	for (var i = 1; i < 8; i++) {
		if (x < 8 && y < 8) {
			moves.push([x + i, y + i]);
		}
		if (x < 8 && y > 0) {
			moves.push([x + i, y - i]);
		}
		if (x > 0 && y < 8) {
			moves.push([x - i, y + i]);
		}
		if (x > 0 && y > 0) {
			moves.push([x - i, y - i]);
		}
	}
	return moves;
}

function getQueenMoves(x, y) { 
	var moves = getBishopMoves(x, y).concat(getRookMoves(x, y));
	return moves;
}

function moveAllowed(moves, x, y) {
	for (var i = 0; i < moves.length; i++) {
		if (moves[i][0] == x && moves[i][1] == y) {
			return true;
		}
	}
	return false;
}
