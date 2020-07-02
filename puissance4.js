let activePlayer = 1;
let grid = [];
let playHistory = [];
let player1 = prompt("Who's gonna play first?");
let player2 = prompt("Who's gonna play second?");

if (player1 === null) {
    player1 = "Player 1";
}
if (player2 === null) {
    player2 = "Player 2";
}

let color1 = prompt("What's the color of " + player1 + "'s circles? (red, yellow, black, pink, green, grey, blue)");
let color2 = prompt("What's the color of " + player2 + "'s circles? (red, yellow, black, pink, green, grey, blue)");
let colors = ["red", "yellow", "black", "pink", "green", "grey", "blue"];
let X = prompt("How many columns do you want? (between 4 and 9)");
let Y = prompt("How many rows do you want? (between 4 and 8)");

if (!colors.includes(color1)) {
    color1 = prompt("Please write a color that is in the array, " + player1 + "! (red, yellow, black, pink, green, grey, blue)");
}
if (!colors.includes(color2)) {
    color2 = prompt("Please write a color that is in the array, " + player2 + "! (red, yellow, black, pink, green, grey, blue)");
}
if (color1 == color2) {
    color1 = "red";
    color2 = "yellow";
}

if (color1 === null) {
    color1 = "red";
}
if (color2 === null) {
    color2 = "yellow";
}

if (X === null || !parseInt(X)) {
    X = 7;
}
if (Y === null || !parseInt(Y)) {
    Y = 6;
}

let gridXY = [X, Y];
let playerColors = { 1: color1, 2: color2 };
let gameOptions = { gridXY, playerColors };

$(document).ready(function () {
    let container = $("#container")[0]
    $("body").puissance4(gameOptions);


});

$.fn.puissance4 = function (options) {
    // bouton reset
    $(".img-fluid").click(function () {
        $("body").puissance4(gameOptions);
        $(".deleteme")[1].remove();
    });

    $("#goback").click(function () {
        if (activePlayer == 1 && typeof playHistory[0] !== 'undefined') {
            let removePlay = playHistory[playHistory.length - 1];
            let boxId = "#" + (removePlay[1] + 1) + "-" + (removePlay[0] + 1) + " div";
            playHistory.pop();
            $(boxId).css("background-color", "white");
            grid[removePlay[0]][removePlay[1]] = 0;
            activePlayer = 2;
        }
        else if (typeof playHistory[0] !== 'undefined') {
            let removePlay = playHistory[playHistory.length - 1];
            let boxId = "#" + (removePlay[1] + 1) + "-" + (removePlay[0] + 1) + " div";
            playHistory.pop();
            $(boxId).css("background-color", "white");
            grid[removePlay[0]][removePlay[1]] = 0;
            activePlayer = 1;
        }
    });
    $(container).empty();
    $(".playerscores").append('<h1 class="deleteme">' + player1 + ':<small id="score1"></small> VS ' + player2 + ':<small id="score2"></small></h1>');
    let settings = $.extend({
        gridXY: [7, 6],
        playerColors: { 1: "red", 2: "yellow" }
    }, options);
    grid = [];

    // MAX SIZE of X is 9 || MIN SIZE of X is 4
    if (settings.gridXY[0] > 9) {
        settings.gridXY[0] = 9;
    }
    else if (settings.gridXY[0] < 4) {
        settings.gridXY[0] = 4;
    }

    // MAX SIZE of Y is 9 || MIN SIZE of Y is 4
    if (settings.gridXY[1] > 8) {
        settings.gridXY[1] = 8;
    }
    else if (settings.gridXY[1] < 4) {
        settings.gridXY[1] = 4;
    }

    // GENERATE THE GRID
    for (y = 0; y <= settings.gridXY[1]; y++) {
        if (y != 0) {
            grid.push([]);
        }
        $(container).append('<div id="row' + y + '" class="row h-100 justify-content-center align-items-center">')
        for (x = 1; x <= settings.gridXY[0]; x++) {
            if (y == 0) {
                $("#row" + y).append('<div id="play-' + x + '" class="play"><div></div></div>')
            }
            else {
                $("#row" + y).append('<div id="' + x + "-" + y + '" class="box column' + x + '"><div space="empty"></div></div>')
                grid[y - 1].push(0);
            }
        }
        $("#box").append('</div>')
    }

    $(".play").click(function () {
        let rowToAdd = this.id.split("-")[1];
        addCircle(rowToAdd);
    });

    for (x = 1; x <= settings.gridXY[0]; x++) {
        let column = ".column" + x;
        $(column).click(function () {
            let rowToAdd = this.id.split("-")[0];
            addCircle(rowToAdd);
        });
    }

    function addCircle(x) {
        let i = 0;
        let time = 20;
        for (i = settings.gridXY[1] - 1; i >= 0; i--) {
            if (grid[i][x - 1] == 0) {
                grid[i][x - 1] = activePlayer;
                let boxId = "#" + x + "-" + (i + 1) + " div";
                if (activePlayer == 1) {
                    for (z = 1; z <= settings.gridXY[1]; z++) {
                        let boxIdToAnimate = "#" + x + "-" + z + " div";
                        $(boxId).attr("space", "filled");
                        if ($(boxIdToAnimate).attr("space") == "empty") {
                            setTimeout(function () {
                                $(boxIdToAnimate).css("background-color", settings.playerColors[1]);
                            }, time);
                            setTimeout(function () {
                                $(boxIdToAnimate).css("background-color", "white");
                            }, time + 20);
                            time += 20;
                        }
                    }
                    setTimeout(function () {
                        $(boxId).css("background-color", settings.playerColors[1]);
                    }, time);
                    checkVictory(activePlayer, time);
                    activePlayer = 2;
                    playHistory.push([i, x - 1]);
                    return;
                }
                else {
                    for (z = 1; z <= settings.gridXY[1]; z++) {
                        let boxIdToAnimate = "#" + x + "-" + z + " div";
                        $(boxId).attr("space", "filled");
                        if ($(boxIdToAnimate).attr("space") == "empty") {
                            setTimeout(function () {
                                $(boxIdToAnimate).css("background-color", settings.playerColors[2]);
                            }, time);
                            setTimeout(function () {
                                $(boxIdToAnimate).css("background-color", "white");
                            }, time + 20);
                            time += 20;
                        }
                    }
                    setTimeout(function () {
                        $(boxId).css("background-color", settings.playerColors[2]);
                    }, time);
                    checkVictory(activePlayer, time);
                    activePlayer = 1;
                    playHistory.push([i, x - 1]);
                    return;
                }
            }
        }
    }

    function checkVictory(activePlayer, time) {
        setTimeout(function () {
            let counter = 0;
            for (row = 0; row < settings.gridXY[1]; row++) {
                for (col = 0; col < settings.gridXY[0]; col++) {
                    if (grid[row][col] == 0) {
                        counter++;
                    }
                }
            }
            if (counter == 0) {
                alert("You all suck. Nobody wins.");
                $("body").puissance4(gameOptions);
                $(".deleteme")[1].remove();
            }
            else {
                horizontalWin(activePlayer);
                verticalWin(activePlayer);
                diagonalWin(activePlayer);
            }
        }, time);
    }

    function horizontalWin(player) {
        for (row = 0; row < settings.gridXY[1]; row++) {
            for (col = 0; col < settings.gridXY[0]; col++) {
                if (grid[row][col] == player && grid[row][col + 1] == player && grid[row][col + 2] == player && grid[row][col + 3] == player) {
                    showWinner(grid[row][col]);
                    $("body").puissance4(gameOptions);
                    addScore(activePlayer);
                    break;
                }
            }
        }
    }

    function verticalWin(player) {
        for (col = 0; col < settings.gridXY[0]; col++) {
            for (row = 0; row < settings.gridXY[1] - 3; row++) {
                if (grid[row][col] == player && grid[row + 1][col] == player && grid[row + 2][col] == player && grid[row + 3][col] == player) {
                    showWinner(grid[row][col]);
                    $("body").puissance4(gameOptions);
                    addScore(activePlayer);
                    break;
                }
            }
        }
    }

    function diagonalWin(player) {
        for (col = 0; col < settings.gridXY[0]; col++) {
            for (row = settings.gridXY[1] - 1; row > 2; row--) {
                if (grid[row][col] == player && grid[row - 1][col + 1] == player && grid[row - 2][col + 2] == player && grid[row - 3][col + 3] == player) {
                    showWinner(grid[row][col]);
                    $("body").puissance4(gameOptions);
                    addScore(activePlayer);
                    break;
                }
                else if (grid[row][col] == player && grid[row - 1][col - 1] == player && grid[row - 2][col - 2] == player && grid[row - 3][col - 3] == player) {
                    showWinner(grid[row][col]);
                    $("body").puissance4(gameOptions);
                    addScore(activePlayer);
                    break;
                }
            }
        }
    }

    function showWinner(value) {
        $("#result").remove();
        if (value == 1) {
            $(".deleteme").append('<h1 id="result">' + player1 + " WINS");
        } else {
            $(".deleteme").append('<h1 id="result">' + player2 + " wins!");
        }
    }

    function addScore(activePlayer) {
        let scoreId = "#score" + activePlayer;
        let currentScore = 1;
        if (!$(scoreId).text() == "") {
            currentScore = parseInt($(scoreId).text()) + 1;
        }
        $(scoreId).empty();
        $(".deleteme")[1].remove();
        $(scoreId).append(currentScore);
    }
}
