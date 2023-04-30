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
let curr_board,
    transformed_board;

function init() {
    resetBoard();
}

function update() {
    //console.log(board)
    if (!hasEmptyTile() && curr_board == transformed_board) {
        score = 0;
        document.getElementById("overlay").style.opacity = 1;
    }
    document.getElementById("score").innerHTML = score;
}

function resetBoard() {
    // board = [
    //     [2, 4, 8, 16],
    //     [32, 64, 128, 256],
    //     [512, 1024, 2048, 4096],
    //     [8192, 0, 0, 0]
    // ];

    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    score = 0;
    curr_board = board;
    transformed_board = board;
    //create 2 or 4 to begin the game
    set_2_or_4()
    set_2_or_4()

    document.getElementById("overlay").style.transition = "opacity 1s";
    document.getElementById("overlay").style.opacity = 0;
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
    curr_board = board;
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;
    }
    transformed_board = board;
}

function slideRight() {
    curr_board = board;
    for (let r = 0; r < rows; r++) {
        let row = board[r]; //[0, 2, 2, 2]
        row.reverse(); //[2, 2, 2, 0]
        row = slide(row) //[4, 2, 0, 0]
        board[r] = row.reverse(); //[0, 0, 2, 4];
    }
    transformed_board = board;
}

function slideUp() {
    curr_board = board
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
    transformed_board = board;
}

function slideDown() {
    curr_board = board;
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
    transformed_board = board;
}

function set_2_or_4() {
    if (!hasEmptyTile()) {
        return;
    }
    let tile = randomInteger(4) % 2 ? 4 : 2;
    let found = false;
    while (!found) {
        //find random row and column to place a 2 in
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        if (board[r][c] == 0) {
            board[r][c] = tile;
        }
        break;
    }
}

function keyup(key) {
    //console.log(key);
    if (key == 65) {
        slideLeft();
        if(curr_board == transformed_board) {
            set_2_or_4();
        }
        console.log(board)
    } else if (key == 68) {
        slideRight();
        if(curr_board == transformed_board) {
            set_2_or_4();
        }
        console.log(board)
    } else if (key == 87) {
        slideUp();
        if(curr_board == transformed_board) {
            set_2_or_4();
        }
        console.log(board)

    } else if (key == 83) {
        slideDown();
        if(curr_board == transformed_board) {
            set_2_or_4();
        }
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
            context.textAlign = "center";
            context.fillText(board[row][col], 100 * col +50, 100 * row + 25, 100);
        }
    }
}