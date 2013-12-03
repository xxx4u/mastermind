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
