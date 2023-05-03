const words = [
    'Metal Pipe', 
    '"Nouuur"', 
    'You guys are sick', 
    'We get raided', 
    'She says Piss', 
    'Someone #FUNDS THE LUBE', 
    'She dances', 
    'Heart rate over 99', 
    '"Im a little crusty"', 
    'She mentions another streamer', 
    'Embarrassing life story',
    '"Hey. Hey."',
    'BEBEBE',
    'brain power',
    'Calls Herself not flat',
    'Chat gaslights her',
    'Talks about her massive dumpy',
    'Boxing Team comes up',
    'She says “Im normal, I swear”',
    'She Gets Called Mort',
    'She talks about feet/toes',
    'She talks about the basement',
    'She mentions how she always busy',
    'New toemaniac (follower)',
    'Im not a strawberry',
    'We raid someone from the Dork Club',
    'Is the BGM okay',
    'She makes us piss',
    'Piss in my heart (10 gifted subs)',
    'Scuff happens',
    'She says HUH',
    'She opens MS Paint',
    'Fart Sound Effect',
    'She says Among Us'
];

const freeSpace = 'Toma starts late';

const cells = document.querySelectorAll('.cell');

var bingo_flag = false;

function newGame() {
    const selectedWords = [];
    while (selectedWords.length < 25) {
        if (selectedWords.length === 12) {
            selectedWords.push(freeSpace);
            continue;
        }
        const randomIndex = Math.floor(Math.random() * words.length);
        const randomWord = words[randomIndex];
        if (!selectedWords.includes(randomWord)) {
            selectedWords.push(randomWord);
        }
    }

    cells.forEach((cell, index) => {
        cell.textContent = selectedWords[index];
        cell.classList.remove('selected');
    });
}

cells.forEach((cell) => {
    cell.addEventListener('click', () => {
        cell.classList.toggle('selected');
        checkForBingo();
    });
});

//const newGameBtn = document.getElementById('new-game-btn');
//newGameBtn.addEventListener('click', newGame);

function resizeTextToFit() {
    const cells = document.querySelectorAll('.cell');

    cells.forEach(cell => {
        let fontSize = 100;
        cell.style.fontSize = fontSize + 'px';
        while (cell.scrollWidth > cell.offsetWidth || cell.scrollHeight > cell.offsetHeight) {
            fontSize -= 1;
            cell.style.fontSize = fontSize + 'px';
        }
    });
}

function checkForBingo() {
    if (bingo_flag) {
        return;
    }
    const rows = document.querySelectorAll('.row');
    const cols = document.querySelectorAll('.cell');
    const diag1 = document.querySelectorAll('.row:nth-child(1) .cell:nth-child(1), .row:nth-child(2) .cell:nth-child(2), .row:nth-child(3) .cell:nth-child(3), .row:nth-child(4) .cell:nth-child(4), .row:nth-child(5) .cell:nth-child(5)');
    const diag2 = document.querySelectorAll('.row:nth-child(1) .cell:nth-child(5), .row:nth-child(2) .cell:nth-child(4), .row:nth-child(3) .cell:nth-child(3), .row:nth-child(4) .cell:nth-child(2), .row:nth-child(5) .cell:nth-child(1)');

    // check rows
    for (let i = 0; i < rows.length; i++) {
        if (rows[i].querySelectorAll('.selected').length === 5) {
            bingo_flag = true;
            break;
        }
    }

    // check columns
    for (let i = 0; i < cols.length; i++) {
        if (document.querySelectorAll(`.row .cell:nth-child(${i + 1}).selected`).length === 5) {
            bingo_flag = true;
            break;
        }
    }

    // check diagonals
    if (diag1.length === 5 && diag1[0].classList.contains('selected') && diag1[1].classList.contains('selected') && diag1[2].classList.contains('selected') && diag1[3].classList.contains('selected') && diag1[4].classList.contains('selected')) {
        bingo_flag = true;
    }

    if (diag2.length === 5 && diag2[0].classList.contains('selected') && diag2[1].classList.contains('selected') && diag2[2].classList.contains('selected') && diag2[3].classList.contains('selected') && diag2[4].classList.contains('selected')) {
        bingo_flag = true;
    }

    if (bingo_flag) {
        bingo();
    }
}

function bingo() {
    let bingoGif = document.createElement("img");
    bingoGif.src = "img/toma_yippee.gif";
    bingoGif.style.position = "fixed";
    bingoGif.style.top = "50%";
    bingoGif.style.left = "50%";
    //bingoGif.style.transform = "translate(-50%, -50%)";
    bingoGif.style.width = "150px";
    bingoGif.style.height = "150px";
    document.body.appendChild(bingoGif);

    let dx = 2;
    let dy = 2;

    setInterval(function () {
        let x = parseInt(bingoGif.style.left);
        let y = parseInt(bingoGif.style.top);
        let w = bingoGif.offsetWidth;
        let h = bingoGif.offsetHeight;

        if (x + dx < 0 || x + dx > window.innerWidth - w) {
            dx = -dx;
        }

        if (y + dy < 0 || y + dy > window.innerHeight - h) {
            dy = -dy;
        }

        bingoGif.style.left = (x + dx) + "px";
        bingoGif.style.top = (y + dy) + "px";
    }, 16);
}

// make the gif bounce around the window
function moveGif() {
    const gif = document.querySelector('.bingo-gif');
    if (gif) {
        const x = Math.floor(Math.random() * window.innerWidth);
        const y = Math.floor(Math.random() * window.innerHeight);
        gif.style.left = x + 'px';
        gif.style.top = y + 'px';
    }
}

// move the gif every 100ms
setInterval(moveGif, 100);


// Call the function when the page loads and when it resizes
window.addEventListener('load', resizeTextToFit);
window.addEventListener('resize', resizeTextToFit);
//newGameBtn.addEventListener('click', resizeTextToFit);

newGame();
