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

var board = [
	[BLACK_ROOK, BLACK_KNIGHT, BLACK_BISHOP, BLACK_QUEEN, BLACK_KING, BLACK_BISHOP, BLACK_KNIGHT, BLACK_ROOK],
	[BLACK_PAWN, BLACK_PAWN,   BLACK_PAWN,   BLACK_PAWN,  BLACK_PAWN, BLACK_PAWN,   BLACK_PAWN,   BLACK_PAWN],
	[NONE, 		 NONE,		   NONE, 		 NONE, 		  NONE,  	  NONE,			NONE,		  NONE		],
	[NONE, 		 NONE, 		   NONE, 		 NONE, 		  NONE,  	  NONE,			NONE,		  NONE		],
	[NONE, 		 NONE, 		   NONE, 		 NONE, 		  NONE,  	  NONE,			NONE,		  NONE		],
	[NONE, 		 NONE, 		   NONE,	 	 NONE, 		  NONE,  	  NONE,			NONE,		  NONE		],
	[WHITE_PAWN, WHITE_PAWN,   WHITE_PAWN,   WHITE_PAWN,  WHITE_PAWN, WHITE_PAWN,   WHITE_PAWN,   WHITE_PAWN],
	[WHITE_ROOK, WHITE_KNIGHT, WHITE_BISHOP, WHITE_QUEEN, WHITE_KING, WHITE_BISHOP, WHITE_KNIGHT, WHITE_ROOK],
];

$(function() {
	$('#chess tr').each(function(i, elem) {
		$(this).find("td").each(function(j, elem) {
			var itemID = board[i][j];
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
		case WHITE_KNIGHT:
			return getKnightMoves(x, y);
		case WHITE_BISHOP:
			return getBishopMoves(x, y);
		case WHITE_KING:
			return getKingMoves(x, y);
		case WHITE_PAWN:
			return getPawnMoves(x, y);
		case NONE:
			return [];
	}
}

function getRookMoves(x, y) {
	var moves = [];
	var isWhite = board[x][y] == WHITE_ROOK;
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
	var isWhite = board[x][y] == WHITE_BISHOP;
	for (var i = 1; i < 8; i++) {
		moves.push([x + i, y + i]);
		moves.push([x + i, y - i]);
		moves.push([x - i, y + i]);
		moves.push([x - i, y - i]);
	}
	moves = cropOutsiders(moves);
	return moves;
}

function getQueenMoves(x, y) { 
	var moves = getBishopMoves(x, y).concat(getRookMoves(x, y));
	return moves;
}

function getKnightMoves(x, y) {
	var moves = [[x + 2, y + 1], [x + 1, y + 2], [x - 2, y + 1], [x - 1, y + 2],
		 		 [x + 2, y - 1], [x + 1, y - 2], [x - 1, y - 2], [x - 2, y - 1]];
	moves = cropOutsiders(moves);
	moves = cropEngagedMoves(moves);
	return moves;
}

function getPawnMoves(x, y) {
	var moves = [];
	var isWhite = board[x][y] == WHITE_PAWN;
	if (isWhite) {
		moves.push([x - 1, y]);
		if (board[x - 1][y - 1] < NONE) {
			moves.push([x - 1, y - 1]);
		}
		if (board[x - 1][y + 1] < NONE) {
			moves.push([x - 1, y + 1]);
		}
		if (x == 6) {
			moves.push([x - 2, y]);
		}
	} else {
		moves.push([x + 1, y]);	
		if (board[x + 1][y + 1] > NONE) {
			moves.push([x + 1, y + 1]);
		}
		if (board[x + 1][y - 1] > NONE) {
			moves.push([x + 1, y - 1]);
		}
		if (x == 1) {
			moves.push([x + 2, y]);
		}
	}
	moves = cropOutsiders(moves);
	return moves;
}

function getKingMoves(x, y) {
	var moves = [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1],
				 [x + 1, y + 1], [x - 1, y - 1], [x + 1, y - 1], [x - 1, y + 1]];

	moves = cropOutsiders(moves);
	var isWhite = board[x][y] == WHITE_KING;

	var enemies = [];
	for (var i = 0; i < 8; i++) {
		for (var j = 0; j < 8; j++) {
			if (i == x || j == y) {
				continue;
			}
			var item = board[i][j];
			if ((isWhite && item == BLACK_KING) || (!isWhite && item == WHITE_KING)) {
				moves = removeMoves(moves, getKingMoves_(i, j));	
				continue;
			}
			if (isWhite && item < NONE) {
				moves = removeMoves(moves, getItemMoves(item, i, j));
			}
			if (!isWhite && item > NONE) {
				moves = removeMoves(moves, getItemMoves(item, i, j));
			}
		}
	}

	return moves;
}

function getKingMoves_(x, y) {
	return [[x + 1, y + 1], [x - 1, y + 1], [x + 1, y - 1], [x - 1, y - 1], 
			[x - 1, y], [x + 1, y],	[x, y - 1], [x, y + 1]];
}

function cropOutsiders(moves) {
	var correctMoves = [];
	for (var i = 0; i < moves.length; i++) {
		var move = moves[i];
		if (move[0] >= 0 && move[0] < 8 && move[1] >= 0 && move[1] < 8) {
			correctMoves.push(move);	
		}
	}
	return correctMoves;
}

function cropEngagedMoves(moves) {
	var correctMoves = [];
	for (var i = 0; i < moves.length; i++) {
		var move = moves[i];
		if (board[move[0]][move[1]] == NONE) {
			correctMoves.push(move);
		}
	}
	return correctMoves;
}

function removeMoves(moves, itemMoves) {
	var newMoves = moves;
	for (var i = 0; i < newMoves.length; i++) {
		for (var j = 0; j < itemMoves.length; j++) {
			if (newMoves[i][0] == itemMoves[j][0] && newMoves[i][1] == itemMoves[j][1]) {
				newMoves.splice(i--, 1);		   
			}
		}
	}
	return newMoves;
}

function moveAllowed(moves, x, y) {
	for (var i = 0; i < moves.length; i++) {
		if (moves[i][0] == x && moves[i][1] == y) {
			return true;
		}
	}
	return false;
}
