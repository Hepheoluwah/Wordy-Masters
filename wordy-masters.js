
const letters = document.querySelectorAll('.scoreboard-letter');
const loadingDiv = document.querySelector('.info-bar');
const ANSWER_LENGTH = 5;
const ROUNDS = 7;


async function init () {
    let currentGuess = '';
    let currentRow = 0;
    let isLoading = true; 

    const res = await fetch("https://words.dev-apis.com/word-of-the-day?random=true");
    const resObj = await res.json();
    const word = resObj.word.toUpperCase();
    const wordParts = word.split("");
    let done = false;
    setLoading(false);
    isLoading = false;
    console.log(word);

    function addLetter (letter) {
        if (currentGuess.length < ANSWER_LENGTH) {
            //Add letter
            currentGuess += letter;
        } else {
            currentGuess = currentGuess.substring(0, currentGuess.length -1) + letter;
            // Replace last letter when length is greater than 5
        }
        letters[ANSWER_LENGTH * currentRow + currentGuess.length -1].innerText = letter;
        // Display letter
    }

    async function commit() {
        if (currentGuess.length !== ANSWER_LENGTH) {
            //Do Nothing 
            return;
        }

        isLoading = true;
        setLoading(true);
        const res = await fetch("https://words.dev-apis.com/validate-word", {
            method: "POST",
            body: JSON.stringify({word: currentGuess})
        });

        const resObj = await res.json();
        const validWord = resObj.validWord;
        //const { validWord } = resObj;

        isLoading= false;
        setLoading(false);

        if (!validWord) {
          markInvalidWord()
          return;  
        }

        const guessParts = currentGuess.split("");
        const map = makeMap(wordParts);
        console.log(map);

        //TODO Do all marking as "correct" "close" or "wrong"

        for (let i = 0; i < ANSWER_LENGTH; i++ ) {
            // Mark as correct
            if (guessParts[i] === wordParts[i]) {
                letters[currentRow * ANSWER_LENGTH + i].classList.add('correct');
                map[guessParts[i]]--;
            }
        }

        for (let i = 0; i < ANSWER_LENGTH; i++) {
            if (guessParts[i] === wordParts[i]) {
                //Do Nothing
            } else if (wordParts.includes(guessParts[i]) && map[guessParts[i]] > 0) {
                // Mark as Close
                letters[currentRow * ANSWER_LENGTH + i].classList.add('close');
                map[guessParts[i]]--;
            } else {
                letters[currentRow * ANSWER_LENGTH + i].classList.add('wrong');
            }
        }

        currentRow++;
        if (currentGuess === word){
            // You won
            alert('You Won!');
            document.querySelector('.brand').classList.add("winner")
            done = true;
        } else if (currentRow === ROUNDS) {
            alert(`You loose, the correct word is ${word}`);
            // alert("You loose , your correct word is" + word + "!!!")
            done = true;
        }
        currentGuess = '';
    }


    function backspace() {
        currentGuess = currentGuess.substring(0, currentGuess.length -1);
        letters[ANSWER_LENGTH * currentRow + currentGuess.length].innerText = "";
    }

    function  markInvalidWord() {
        for (let i = 0; i < ANSWER_LENGTH; i++) {
            letters[currentRow * ANSWER_LENGTH + i].classList.remove("invalid");
            //alert('Not a valid word');

            setTimeout(function () {
            letters[currentRow * ANSWER_LENGTH + i].classList.add("invalid");
            }, 10);
       }
    }



    document.addEventListener('keydown', function handleKeyPress (event){
        if (done || isLoading) {
            // Do Nothing 
            return;
        }


        const action = event.key;

        console.log(action);

        if (action === 'Enter') {
            commit ();
        } else if (action === 'Backspace') {
            backspace();
        } else if (isLetter(action)) {
            addLetter(action.toUpperCase()) 
        } else {
            // Do Nothing
        }
    });    
}

function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
}

function setLoading(isLoading) {
    loadingDiv.classList.toggle('show', isLoading);
    // if (isLoading === false) {
    //     loadingDiv.classList.add('hidden');
    // }
}


function makeMap (array) {
    const obj = {};
    for (let i = 0; i < array.length; i++) {
        const letter = array[i];
        if (obj[letter]) {
            obj[letter]++;
        } else {
            obj[letter] = 1;
        }
    }

    return obj;
}
 
init();

const letters = document.querySelectorAll('.scoreboard-letter');
const loadingDiv = document.querySelector('.info-bar');
const ANSWER_LENGTH = 5;
const ROUNDS = 7;


async function init () {
    let currentGuess = '';
    let currentRow = 0;
    let isLoading = true; 

    const res = await fetch("https://words.dev-apis.com/word-of-the-day?random=true");
    const resObj = await res.json();
    const word = resObj.word.toUpperCase();
    const wordParts = word.split("");
    let done = false;
    setLoading(false);
    isLoading = false;
    console.log(word);

    function addLetter (letter) {
        if (currentGuess.length < ANSWER_LENGTH) {
            //Add letter
            currentGuess += letter;
        } else {
            currentGuess = currentGuess.substring(0, currentGuess.length -1) + letter;
            // Replace last letter when length is greater than 5
        }
        letters[ANSWER_LENGTH * currentRow + currentGuess.length -1].innerText = letter;
        // Display letter
    }

    async function commit() {
        if (currentGuess.length !== ANSWER_LENGTH) {
            //Do Nothing 
            return;
        }

        isLoading = true;
        setLoading(true);
        const res = await fetch("https://words.dev-apis.com/validate-word", {
            method: "POST",
            body: JSON.stringify({word: currentGuess})
        });

        const resObj = await res.json();
        const validWord = resObj.validWord;
        //const { validWord } = resObj;

        isLoading= false;
        setLoading(false);

        if (!validWord) {
          markInvalidWord()
          return;  
        }

        const guessParts = currentGuess.split("");
        const map = makeMap(wordParts);
        console.log(map);

        //TODO Do all marking as "correct" "close" or "wrong"

        for (let i = 0; i < ANSWER_LENGTH; i++ ) {
            // Mark as correct
            if (guessParts[i] === wordParts[i]) {
                letters[currentRow * ANSWER_LENGTH + i].classList.add('correct');
                map[guessParts[i]]--;
            }
        }

        for (let i = 0; i < ANSWER_LENGTH; i++) {
            if (guessParts[i] === wordParts[i]) {
                //Do Nothing
            } else if (wordParts.includes(guessParts[i]) && map[guessParts[i]] > 0) {
                // Mark as Close
                letters[currentRow * ANSWER_LENGTH + i].classList.add('close');
                map[guessParts[i]]--;
            } else {
                letters[currentRow * ANSWER_LENGTH + i].classList.add('wrong');
            }
        }

        currentRow++;
        if (currentGuess === word){
            // You won
            alert('You Won!');
            document.querySelector('.brand').classList.add("winner")
            done = true;
        } else if (currentRow === ROUNDS) {
            alert(`You loose, the correct word is ${word}`);
            // alert("You loose , your correct word is" + word + "!!!")
            done = true;
        }
        currentGuess = '';
    }


    function backspace() {
        currentGuess = currentGuess.substring(0, currentGuess.length -1);
        letters[ANSWER_LENGTH * currentRow + currentGuess.length].innerText = "";
    }

    function  markInvalidWord() {
        for (let i = 0; i < ANSWER_LENGTH; i++) {
            letters[currentRow * ANSWER_LENGTH + i].classList.remove("invalid");
            //alert('Not a valid word');

            setTimeout(function () {
            letters[currentRow * ANSWER_LENGTH + i].classList.add("invalid");
            }, 10);
       }
    }



    document.addEventListener('keydown', function handleKeyPress (event){
        if (done || isLoading) {
            // Do Nothing 
            return;
        }


        const action = event.key;

        console.log(action);

        if (action === 'Enter') {
            commit ();
        } else if (action === 'Backspace') {
            backspace();
        } else if (isLetter(action)) {
            addLetter(action.toUpperCase()) 
        } else {
            // Do Nothing
        }
    });    
}

function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
}

function setLoading(isLoading) {
    loadingDiv.classList.toggle('show', isLoading);
    // if (isLoading === false) {
    //     loadingDiv.classList.add('hidden');
    // }
}


function makeMap (array) {
    const obj = {};
    for (let i = 0; i < array.length; i++) {
        const letter = array[i];
        if (obj[letter]) {
            obj[letter]++;
        } else {
            obj[letter] = 1;
        }
    }

    return obj;
}
 
init();
