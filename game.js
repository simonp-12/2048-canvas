let board;
let score = 0;
let rows = 4;
let columns = 4;
let bg_colors = {
    0: "#cdc1b5",
    2: "#eee4da",
    4: "#ece0ca",
    8: "#f4b17a",
    16: "#f59575",
    32: "#f57c5f",
    64: "#f65d3b",
    128: "#edce71",
    256: "#edcc63",
    512: "#edc651",
    1024: "#eec744",
    2048: "#ecc230",
    4096: "#fe3d3d",
    8192: "#ff2020"
}
let num_colors = {
    2: "#727371",
    4: "#727371",
    8: "white",
    16: "white",
    32: "white",
    64: "white",
    128: "white",
    256: "white",
    512: "white",
    1024: "white",
    2048: "white",
    4096: "white",
    8192: "white"
}

function init() {
    setGame();
}

function update() {
    //console.log(board)
    if(!hasEmptyTile()) {
        score = 0;
    }
    document.getElementById("score").innerHTML = score
}

function setGame() {
    // board = [
    //     [2, 2, 2, 2],
    //     [2, 2, 2, 2],
    //     [4, 4, 8, 8],
    //     [4, 4, 8, 8]
    // ];

    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {}
    }
    //create 2 to begin the game
    setTwo();
    setTwo();

}

function filterZero(row) {
    return row.filter(num => num != 0); //create new array of all nums != 0
}

function slide(row) {
    //[0, 2, 2, 2] 
    row = filterZero(row); //[2, 2, 2]
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] == row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i];
        }
    } //[4, 0, 2]
    row = filterZero(row); //[4, 2]
    //add zeroes
    while (row.length < columns) {
        row.push(0);
    } //[4, 2, 0, 0]
    return row;
}

function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;
    }
}

function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r]; //[0, 2, 2, 2]
        row.reverse(); //[2, 2, 2, 0]
        row = slide(row) //[4, 2, 0, 0]
        board[r] = row.reverse(); //[0, 0, 2, 4];
    }
}

function slideUp() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];
        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];

        }
    }
}

function slideDown() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];
        for (let r = 0; r < rows; r++) {
            board[r][c] = row[r];
        }
    }
}

function setTwo() {
    if (!hasEmptyTile()) {
        return;
    }
    let found = false;
    while (!found) {
        //find random row and column to place a 2 in
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        if (board[r][c] == 0) {
            board[r][c] = 2;
        }
        break;
    }
}

function keyup(key) {
    //console.log(key);
    if (key == 65) {
        slideLeft();
        setTwo();
        console.log(board)
    } else if (key == 68) {
        slideRight();
        setTwo();
        console.log(board)
    } else if (key == 87) {
        slideUp();
        setTwo();
        console.log(board)

    } else if (key == 83) {
        slideDown();
        setTwo();
        console.log(board)
    }
    document.getElementById("score").innerText = score;
}

function hasEmptyTile() {
    let count = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) { //at least one zero in the board
                return true;
            }
        }
    }
    return false;
}

function draw() {
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            //context.strokeStyle = bg_colors[board[row][col]];
            context.strokeStyle = "black";
            context.fillStyle = bg_colors[board[row][col]];
            context.fillRect(100 * col, 100 * row, (100 * col) + 100, (100 * row) + 100);
            context.fillStyle = num_colors[board[row][col]];
            context.font = "bold 50px Helvetica";
            context.textAlign = "center-text";
            context.fillText(board[row][col], 100 * col, 100 * row + 25, 100);
        }
    }
}