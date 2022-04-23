const secretPhrases = ["never", "you", "that", "bullet", "break", "game", "rain", "nature", "programming", "this", "name", "end"];

let randomItem = "";
let clicked = [];
let result = "";
let mistakes = 0;
// Random selection of a word
function selectRandomItem() {
    randomItem = secretPhrases[Math.floor(Math.random() * secretPhrases.length)];
    document.getElementById("letters").addEventListener("click", buttonHandler)
    window.addEventListener("keydown", keyHandler)
    console.log(randomItem)
}
// If the word is correct, it will be in the right place
function setUnderScores() {
    let splitedWord = randomItem.split("");
    let mappedWord = splitedWord.map(letter => (clicked.indexOf(letter) >= 0 ? letter : "_"))
    result = mappedWord.join("");
    document.getElementById("clue").innerHTML = `<p>${result}</p>`
}
// checks if you won shows the winning photo
function checkIfWon() {
    if (randomItem === result) {
        document.getElementById("winner").querySelector("p").style.display = "block";
        document.getElementById("image").querySelector("img").src = "assets/winner.png";
    }
}
// check if you loses, shows the correct answer
function checkIflost() {
    if (mistakes === 6) {
        document.getElementById("gameover").querySelector("p").style.display = "block";
        document.getElementById("clue").innerHTML = `<p>Random word is: ${randomItem}</p>`
    }
}
// Shows the next photo if you make a mistake
function updateHangmanPicture() {
    const image = document.getElementById("image").querySelector("img");
    image.src = `assets/hangman${mistakes}.png`
}
// Checks if the entered letter is correct or not
function letterHandler(letter) {
    letter = letter.toLowerCase();
    clicked.indexOf(letter) === -1 ? clicked.push(letter) : null;
    document.getElementById(letter.toUpperCase()).className = "used";
    if (randomItem.indexOf(letter) >= 0) {
        setUnderScores();
        checkIfWon();
    } else if (randomItem.indexOf(letter) === -1) {
        mistakes++;
        checkIflost();
        updateHangmanPicture()
    }
}
// Input letter by click
function buttonHandler(event) {
    letterHandler(event.target.id)
}
// Input letter with key
function keyHandler(event) {
    letterHandler(event.key)
}

selectRandomItem();
setUnderScores();