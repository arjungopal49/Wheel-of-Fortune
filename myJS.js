var vowels = ["a", "e", "i", "o", "u"];
var used = [];
var puzzleChoices = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "Wisconsin", "Wyoming"];
var puzzle;
var letterDisplay = [];
var userInput;
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
var money;
var totalMoney = 0;
var check1 = false;
var boughtVowel = false;

function startGame() {
    document.getElementById("startButton").style.display = "none";
    document.getElementById("display").innerHTML = "Choose your mode";
    document.getElementById("singleButton").style.display = "inline";
    document.getElementById("computerEasyButton").style.display = "inline";
    document.getElementById("computerHardButton").style.display = "inline";
    document.getElementById("multiButton").style.display = "inline";

}

function singlePlayer() {
    totalMoney = 0;
    puzzle = puzzleChoices[Math.floor(Math.random() * 50)];
    letterDisplay = [];
    alphabet.push(puzzle);
    used = [];
    for (i = 0; i < puzzle.length; i++) {
        letterDisplay[i] = "*"
    }
    document.getElementById("display").innerHTML = letterDisplay.join("");
    document.getElementById("spinButton").style.display = "block";
    document.getElementById("singleButton").style.display = "none";
    document.getElementById("computerEasyButton").style.display = "none";
    document.getElementById("computerHardButton").style.display = "none";
    document.getElementById("multiButton").style.display = "none";
    document.getElementById("display4").style.display = "block";
    document.getElementById("display5").style.display = "block";
    document.getElementById("display35").style.display = "block";
    document.getElementById("display2").style.display = "block";

}

function menuButton() {
    document.getElementById("display").innerHTML = "Choose your mode";
    document.getElementById("display2").style.display = "none";
    document.getElementById("display3").style.display = "none";
    document.getElementById("display4").style.display = "none";
    document.getElementById("singleButton").style.display = "inline";
    document.getElementById("computerEasyButton").style.display = "inline";
    document.getElementById("computerHardButton").style.display = "inline";
    document.getElementById("multiButton").style.display = "inline";
    document.getElementById("menuButton").style.display = "none";
}

function letterGuess() {
    userInput = prompt("Letter?");
    check1 = false;
    for (i = 0; i < alphabet.length; i++) {
        if (userInput === alphabet[i]) {
            check1 = true;
        }
    }
    if (check1 === true) {
        checkVowel(userInput);
        if (check1 === true) {
            checkUsed(userInput);
        }
    } else {
        alert("Please enter 1 lowercase letter.");
    }
    if (check1 === true) {
        boughtVowel = false;
        userMove()
    }
}

function checkVowel(a) {
    for (i = 0; i <= 4; i++) {
        if (a === vowels[i]) {
            alert("You cannot enter a vowel. Please try again.");
            check1 = false;
        }
    }
}

function checkUsed(a) {
    for (i = 0; i < 21; i++) {
        if (a === used[i]) {
            alert("This letter has been used. Please try again.");
            check1 = false;
        }
    }
}

function userMove() {
    used[used.length] = userInput;
    document.getElementById("display2").innerHTML = "Used Letters: " + used;
    var numberCorrect = 0;
    for (i = 0; i < puzzle.length; i++) {
        if (puzzle.substring(i, i + 1) === userInput) {
            letterDisplay[i] = userInput;
            numberCorrect = numberCorrect + 1
        }
        if (puzzle.substring(i, i + 1) === userInput.toUpperCase()) {
            letterDisplay[i] = userInput.toUpperCase();
            numberCorrect = numberCorrect + 1
        }
    }
    if (userInput == puzzle) {
        for (i = 0; i < puzzle.length; i++) {
            letterDisplay[i] = puzzle.substring(i, i + 1)
            numberCorrect = 1;
        }
    }
    if (boughtVowel == false) {
        totalMoney = totalMoney + money * numberCorrect;
    } else {
        numberCorrect = 0;
    }
    var gameDone = true;
    for (i = 0; i < letterDisplay.length; i++) {
        if (letterDisplay[i] === "*") {
            gameDone = false;
        }
    }

    if (gameDone === true) {
        document.getElementById("display3").innerHTML = " Congratulations! You won $" + totalMoney;
        used = [];
        document.getElementById("display4").innerHTML = ""
        document.getElementById("display").innerHTML = letterDisplay.join("");
        document.getElementById("display4").style.display = "none";
        document.getElementById("display2").style.display = "none";
        document.getElementById("spinButton").style.display = "none";
        document.getElementById("guessButton").style.display = "none";
        document.getElementById("buyButton").style.display = "none";
        document.getElementById("menuButton").style.display = "block";
        alphabet.pop();
    } else {
        document.getElementById("display3").innerHTML = "Total Money: $" + totalMoney;
        document.getElementById("display").innerHTML = letterDisplay.join("");
        document.getElementById("display4").innerHTML = "You earned $" + money * numberCorrect + " from this turn";
        document.getElementById("spinButton").style.display = "block";
        document.getElementById("guessButton").style.display = "none";
        document.getElementById("buyButton").style.display = "block";
    }
}

function spinButton() {
    money = (Math.floor(Math.random() * (10)) + 1) * 100;
    document.getElementById("display4").innerHTML = "You spun $" + money + ".";
    document.getElementById("spinButton").style.display = "none";
    document.getElementById("guessButton").style.display = "block";
    document.getElementById("buyButton").style.display = "none";
}

function buyVowel() {
    userInput = prompt("Which vowel would you like?")
    var checkVowel = false;
    for (i = 0; i < 5; i++) {
        if (userInput === vowels[i]) {
            checkVowel = true;
        }
    }
    check1 = true;
    if (checkVowel === true) {
        checkUsed(userInput)
        if (totalMoney < 250) {
            alert("You don't have enough money to buy a vowel.")
        } else {
            if (check1 == true) {
                totalMoney = totalMoney - 250;
                boughtVowel = true;
                userMove()
            }
        }
    } else {
        alert("Please enter a vowel")
    }
}

var player1In;
var player2In;
var totalMoney1 = 0;
var totalMoney2 = 0;

function multiPlayer() {
    totalMoney1 = 0;
    totalMoney2 = 0;
    puzzle = puzzleChoices[Math.floor(Math.random() * 50)];
    letterDisplay = [];
    alphabet.push(puzzle);
    used = [];
    for (i = 0; i < puzzle.length; i++) {
        letterDisplay[i] = "*"
    }
    document.getElementById("display").innerHTML = letterDisplay.join("");
    document.getElementById("display5").innerHTML = "Player 1's turn:";
    document.getElementById("multispinButton").style.display = "block";
    document.getElementById("singleButton").style.display = "none";
    document.getElementById("computerEasyButton").style.display = "none";
    document.getElementById("computerHardButton").style.display = "none";
    document.getElementById("multiButton").style.display = "none";
    document.getElementById("display4").style.display = "block";
    document.getElementById("display5").style.display = "block";
    document.getElementById("display35").style.display = "block";
    document.getElementById("display2").style.display = "block";
}

var playerTurn = 1;

function multiGuess() {
    if (playerTurn == 1) {
        player1In = prompt("Letter?");
        check1 = false;
        for (i = 0; i < alphabet.length; i++) {
            if (player1In === alphabet[i]) {
                check1 = true;
            }
        }
        if (check1 === true) {
            checkVowel(player1In);
            if (check1 === true) {
                checkUsed(player1In);
            }
        } else {
            alert("Please enter 1 lowercase letter.");
        }
        if (check1 === true) {
            boughtVowel = false;
            multiMove()
        }
    } else {
        player2In = prompt("Letter?");
        check1 = false;
        for (i = 0; i < alphabet.length; i++) {
            if (player2In === alphabet[i]) {
                check1 = true;
            }
        }
        if (check1 === true) {
            checkVowel(player2In);
            if (check1 === true) {
                checkUsed(player2In);
            }
        } else {
            alert("Please enter 1 lowercase letter.");
        }
        if (check1 === true) {
            boughtVowel = false;
            multiMove()
        }
    }
}

function multiMove() {
    if (playerTurn == 1) {
        used[used.length] = player1In;
        document.getElementById("display2").innerHTML = "Used Letters: " + used;
        var numberCorrect = 0;
        for (i = 0; i < puzzle.length; i++) {
            if (puzzle.substring(i, i + 1) === player1In) {
                letterDisplay[i] = player1In;
                numberCorrect = numberCorrect + 1
            }
            if (puzzle.substring(i, i + 1) === player1In.toUpperCase()) {
                letterDisplay[i] = player1In.toUpperCase();
                numberCorrect = numberCorrect + 1
            }
        }
        if (player1In == puzzle) {
            for (i = 0; i < puzzle.length; i++) {
                letterDisplay[i] = puzzle.substring(i, i + 1)
                numberCorrect = 1;
            }
        }
        if (boughtVowel == false) {
            totalMoney1 = totalMoney1 + money * numberCorrect;
        } else {
            numberCorrect = 0;
        }
        var gameDone = true;
        for (i = 0; i < letterDisplay.length; i++) {
            if (letterDisplay[i] === "*") {
                gameDone = false;
            }
        }

        if (gameDone === true) {
            if (totalMoney1 > totalMoney2) {
                document.getElementById("display3").innerHTML = " Congratulations Player 1! You won with $" + totalMoney1;
            } else {
                document.getElementById("display3").innerHTML = " Congratulations Player 2! You won with $" + totalMoney2;
            }
            used = [];
            document.getElementById("display4").innerHTML = ""
            document.getElementById("display").innerHTML = letterDisplay.join("");
            document.getElementById("display35").style.display = "none";
            document.getElementById("display4").style.display = "none";
            document.getElementById("display2").style.display = "none";
            document.getElementById("display5").style.display = "none";
            document.getElementById("multispinButton").style.display = "none";
            document.getElementById("multiguessButton").style.display = "none";
            document.getElementById("multibuyButton").style.display = "none";
            document.getElementById("menuButton").style.display = "block";
            alphabet.pop()
        } else {
            document.getElementById("display3").innerHTML = "Player 1's Total Money: $" + totalMoney1;
            document.getElementById("display").innerHTML = letterDisplay.join("");
            document.getElementById("display4").innerHTML = "You earned $" + money * numberCorrect + " from this turn";
            document.getElementById("display5").innerHTML = "Player 2's turn:"
            document.getElementById("multispinButton").style.display = "block";
            document.getElementById("multiguessButton").style.display = "none";
            document.getElementById("multibuyButton").style.display = "block";
            playerTurn = 0;
        }
    } else {
        used[used.length] = player2In;
        document.getElementById("display2").innerHTML = "Used Letters: " + used;
        var numberCorrect = 0;
        for (i = 0; i < puzzle.length; i++) {
            if (puzzle.substring(i, i + 1) === player2In) {
                letterDisplay[i] = player2In;
                numberCorrect = numberCorrect + 1
            }
            if (puzzle.substring(i, i + 1) === player2In.toUpperCase()) {
                letterDisplay[i] = player2In.toUpperCase();
                numberCorrect = numberCorrect + 1
            }
        }
        if (player2In == puzzle) {
            for (i = 0; i < puzzle.length; i++) {
                letterDisplay[i] = puzzle.substring(i, i + 1)
                numberCorrect = 1;
            }
        }
        if (boughtVowel == false) {
            totalMoney2 = totalMoney2 + money * numberCorrect;
        } else {
            numberCorrect = 0;
        }
        var gameDone = true;
        for (i = 0; i < letterDisplay.length; i++) {
            if (letterDisplay[i] === "*") {
                gameDone = false;
            }
        }

        if (gameDone === true) {
            if (totalMoney1 > totalMoney2) {
                document.getElementById("display3").innerHTML = " Congratulations Player 1! You won with $" + totalMoney1;
            } else {
                document.getElementById("display3").innerHTML = " Congratulations Player 2! You won with $" + totalMoney2;
            }
            used = [];
            document.getElementById("display4").innerHTML = ""
            document.getElementById("display").innerHTML = letterDisplay.join("");
            document.getElementById("display4").style.display = "none";
            document.getElementById("display2").style.display = "none";
            document.getElementById("display5").style.display = "none";
            document.getElementById("display35").style.display = "none";
            document.getElementById("multispinButton").style.display = "none";
            document.getElementById("multiguessButton").style.display = "none";
            document.getElementById("multibuyButton").style.display = "none";
            document.getElementById("menuButton").style.display = "block";
            alphabet.pop()
        } else {
            document.getElementById("display35").innerHTML = "Player 2's Total Money: $" + totalMoney2;
            document.getElementById("display").innerHTML = letterDisplay.join("");
            document.getElementById("display4").innerHTML = "You earned $" + money * numberCorrect + " from this turn";
            document.getElementById("display5").innerHTML = "Player 1's turn:";
            document.getElementById("multispinButton").style.display = "block";
            document.getElementById("multiguessButton").style.display = "none";
            document.getElementById("multibuyButton").style.display = "block";
            playerTurn = 1;
        }
    }
}

function multispinButton() {
    money = (Math.floor(Math.random() * (10)) + 1) * 100;
    document.getElementById("display4").innerHTML = "You spun $" + money + ".";
    document.getElementById("multispinButton").style.display = "none";
    document.getElementById("multiguessButton").style.display = "block";
    document.getElementById("buyButton").style.display = "none";
}

function multibuyVowel() {
    if (playerTurn == 1) {
        player1In = prompt("Which vowel would you like?");
        var checkVowel = false;
        for (i = 0; i < 5; i++) {
            if (player1In === vowels[i]) {
                checkVowel = true;
            }
        }
        check1 = true;
        if (checkVowel === true) {
            checkUsed(player1In)
            if (totalMoney1 < 250) {
                alert("You don't have enough money to buy a vowel.")
            } else {
                if (check1 === true) {
                    totalMoney1 = totalMoney1 - 250;
                    boughtVowel = true;
                    multiMove()
                }
            }
        } else {
            alert("Please enter a vowel")
        }
    } else {
        player2In = prompt("Which vowel would you like?")
        var checkVowel = false;
        for (i = 0; i < 5; i++) {
            if (player2In === vowels[i]) {
                checkVowel = true;
            }
        }
        check1 = true;
        if (checkVowel === true) {
            checkUsed(player2In)
            if (totalMoney2 < 250) {
                alert("You don't have enough money to buy a vowel.")
            } else {
                if (check1 == true) {
                    totalMoney2 = totalMoney2 - 250;
                    boughtVowel = true;
                    multiMove()
                }
            }
        } else {
            alert("Please enter a vowel")
        }
    }
}

var computerMoney = 0;
var hardOn = false;
function computerEasy() {
    hardOn = false;
    totalMoney = 0;
    computerMoney = 0;
    puzzle = puzzleChoices[Math.floor(Math.random() * 50)];
    letterDisplay = [];
    alphabet.push(puzzle);
    used = [];
    for (i = 0; i < puzzle.length; i++) {
        letterDisplay[i] = "*"
    }
    document.getElementById("display").innerHTML = letterDisplay.join("");
    document.getElementById("computerspinButton").style.display = "block";
    document.getElementById("singleButton").style.display = "none";
    document.getElementById("computerEasyButton").style.display = "none";
    document.getElementById("computerHardButton").style.display = "none";
    document.getElementById("multiButton").style.display = "none";
    document.getElementById("display4").style.display = "block";
    document.getElementById("display5").style.display = "block";
    document.getElementById("display35").style.display = "block";
    document.getElementById("display2").style.display = "block";
}

function computerHard() {
    hardOn = true
    totalMoney = 0;
    computerMoney = 0;
    puzzle = puzzleChoices[Math.floor(Math.random() * 50)];
    letterDisplay = [];
    alphabet.push(puzzle);
    used = [];
    for (i = 0; i < puzzle.length; i++) {
        letterDisplay[i] = "*"
    }
    document.getElementById("display").innerHTML = letterDisplay.join("");
    document.getElementById("computerspinButton").style.display = "block";
    document.getElementById("singleButton").style.display = "none";
    document.getElementById("computerEasyButton").style.display = "none";
    document.getElementById("computerHardButton").style.display = "none";
    document.getElementById("multiButton").style.display = "none";
    document.getElementById("display4").style.display = "block";
    document.getElementById("display5").style.display = "block";
    document.getElementById("display35").style.display = "block";
    document.getElementById("display2").style.display = "block";
}

function computerspinButton() {
    money = (Math.floor(Math.random() * (10)) + 1) * 100;
    document.getElementById("display4").innerHTML = "You spun $" + money + ".";
    document.getElementById("computerspinButton").style.display = "none";
    document.getElementById("computerguessButton").style.display = "block";
    document.getElementById("computerbuyButton").style.display = "none";
}

function computerGuess() {
    userInput = prompt("Letter?");
    check1 = false;
    for (i = 0; i < alphabet.length; i++) {
        if (userInput === alphabet[i]) {
            check1 = true;
        }
    }
    if (check1 === true) {
        checkVowel(userInput);
        if (check1 === true) {
            checkUsed(userInput);
        }
    } else {
        alert("Please enter 1 lowercase letter.");
    }
    if (check1 === true) {
        boughtVowel = false;
        computermodeuserMove()
    }
}

function computermodeuserMove() {
    used[used.length] = userInput;
    document.getElementById("display2").innerHTML = "Used Letters: " + used;
    var numberCorrect = 0;
    for (i = 0; i < puzzle.length; i++) {
        if (puzzle.substring(i, i + 1) === userInput) {
            letterDisplay[i] = userInput;
            numberCorrect = numberCorrect + 1
        }
        if (puzzle.substring(i, i + 1) === userInput.toUpperCase()) {
            letterDisplay[i] = userInput.toUpperCase();
            numberCorrect = numberCorrect + 1
        }
    }
    if (userInput == puzzle) {
        for (i = 0; i < puzzle.length; i++) {
            letterDisplay[i] = puzzle.substring(i, i + 1)
            numberCorrect = 1;
        }
    }
    if (boughtVowel == false) {
        totalMoney = totalMoney + money * numberCorrect;
    } else {
        numberCorrect = 0;
    }
    var gameDone = true;
    for (i = 0; i < letterDisplay.length; i++) {
        if (letterDisplay[i] === "*") {
            gameDone = false;
        }
    }

    if (gameDone === true) {
        if (totalMoney > computerMoney) {
            document.getElementById("display3").innerHTML = " Congratulations! You won with $" + totalMoney;
        } else {
            document.getElementById("display3").innerHTML = "You lost. The computer won with $" + computerMoney;
        }
        used = [];
        document.getElementById("display4").innerHTML = ""
        document.getElementById("display").innerHTML = letterDisplay.join("");
        document.getElementById("display4").style.display = "none";
        document.getElementById("display2").style.display = "none";
        document.getElementById("display5").style.display = "none";
        document.getElementById("display35").style.display = "none";
        document.getElementById("computerspinButton").style.display = "none";
        document.getElementById("computerguessButton").style.display = "none";
        document.getElementById("computerbuyButton").style.display = "none";
        document.getElementById("menuButton").style.display = "block";
        alphabet.pop();
    } else {
        document.getElementById("display3").innerHTML = "Your Total Money: $" + totalMoney;
        document.getElementById("display").innerHTML = letterDisplay.join("");
        document.getElementById("display4").innerHTML = "You earned $" + money * numberCorrect + " from this turn";
        document.getElementById("display5").innerHTML = "Computer's turn:";
        document.getElementById("computerguessButton").style.display = "none";
        money = (Math.floor(Math.random() * (10)) + 1) * 100;
        document.getElementById("display4").innerHTML = "The computer spun $" + money + ".";
        if (hardOn == true) {
            setTimeout(hardComputerbot, 3000)
        } else {
            setTimeout(easyComputerbot, 3000)
        }
    }
}

function easyComputerbot() {
    var computerInput;
    computerInput = alphabet[Math.floor(Math.random() * alphabet.length)]
    for (i = 0; i < alphabet.length; i++) {
        if (computerInput == vowels[i] || computerInput == used[i]) {
            computerInput = alphabet[Math.floor(Math.random() * alphabet.length)]
            i = -1;
        }
    }
    used[used.length] = computerInput;
    document.getElementById("display2").innerHTML = "Used Letters: " + used;
    var numberCorrect = 0;
    for (i = 0; i < puzzle.length; i++) {
        if (puzzle.substring(i, i + 1) === computerInput) {
            letterDisplay[i] = computerInput;
            numberCorrect = numberCorrect + 1
        }
    }
    if (computerInput == puzzle) {
        for (i = 0; i < puzzle.length; i++) {
            letterDisplay[i] = puzzle.substring(i, i + 1)
            numberCorrect = 1;
        }
    }
    computerMoney = computerMoney + money * numberCorrect;
    var gameDone = true;
    for (i = 0; i < letterDisplay.length; i++) {
        if (letterDisplay[i] === "*") {
            gameDone = false;
        }
    }

    if (gameDone === true) {
        if (totalMoney > computerMoney) {
            document.getElementById("display3").innerHTML = " Congratulations! You won with $" + totalMoney;
        } else {
            document.getElementById("display3").innerHTML = "You lost. The computer won with $" + computerMoney;
        }
        used = [];
        document.getElementById("display4").innerHTML = ""
        document.getElementById("display").innerHTML = letterDisplay.join("");
        document.getElementById("display4").style.display = "none";
        document.getElementById("display5").style.display = "none";
        document.getElementById("display35").style.display = "none";
        document.getElementById("display2").style.display = "none";
        document.getElementById("computerspinButton").style.display = "none";
        document.getElementById("computerguessButton").style.display = "none";
        document.getElementById("computerbuyButton").style.display = "none";
        document.getElementById("menuButton").style.display = "block";
        alphabet.pop();
    } else {
        document.getElementById("display35").innerHTML = "Computer's Total Money: $" + computerMoney;
        document.getElementById("display").innerHTML = letterDisplay.join("");
        document.getElementById("display4").innerHTML = "Computer earned $" + money * numberCorrect + " from this turn";
        document.getElementById("display5").innerHTML = "Your turn:";
        document.getElementById("computerspinButton").style.display = "block";
        document.getElementById("computerguessButton").style.display = "none";
        document.getElementById("computerbuyButton").style.display = "block";
    }

}

var popularLetters = ["t", "n", "s", "r", "h", "l", "d", "c", "m", "f", "p", "g", "w", "y", "b", "v", "k", "x", "j", "q", "z"]
var popularVowels = ["e", "a", "o", "i", "u"]

function hardComputerbot() {
    var computerInput;
    var a = false;
    var j =0;
    var vowelcons = Math.floor(Math.random() * 3) + 1;
    for (i=0; i<used.length; i++) {
        if (vowels[i] == used[i] ){
            j = j + 1;
        }
    }
    if (j == vowels.length) {
        a = true;
    }
    if (computerMoney > 250 && vowelcons == 1) {
        for (i = 0; i < popularVowels.length; i++) {
            computerInput = popularVowels[i]
            if (computerInput !== used[i]) {
                i = 30;
            }
        }
    }
    if (computerMoney < 250 || vowelcons !== 1 || a == true) {
        var x = 0;
        while (x < popularLetters.length) {
            computerInput = popularLetters[x]
            if (computerInput == used[x]) {
                x = x+1;
            } else {
                x = 30;
                boughtVowel = false;
            }
        }
    }

    used[used.length] = computerInput;
    document.getElementById("display2").innerHTML = "Used Letters: " + used;
    var numberCorrect = 0;
    for (i = 0; i < puzzle.length; i++) {
        if (puzzle.substring(i, i + 1) === computerInput) {
            letterDisplay[i] = computerInput;
            numberCorrect = numberCorrect + 1
        }
    }
    if (computerInput == puzzle) {
        for (i = 0; i < puzzle.length; i++) {
            letterDisplay[i] = puzzle.substring(i, i + 1)
            numberCorrect = 1;
        }
    }
    if (boughtVowel == false) {
        computerMoney = computerMoney + money * numberCorrect;
    } else {
        numberCorrect = 0;
        computerMoney = computerMoney - 250
    }
    var gameDone = true;
    for (i = 0; i < letterDisplay.length; i++) {
        if (letterDisplay[i] === "*") {
            gameDone = false;
        }
    }

    if (gameDone === true) {
        if (totalMoney > computerMoney) {
            document.getElementById("display3").innerHTML = " Congratulations! You won with $" + totalMoney;
        } else {
            document.getElementById("display3").innerHTML = "You lost. The computer won with $" + computerMoney;
        }
        used = [];
        document.getElementById("display4").innerHTML = ""
        document.getElementById("display").innerHTML = letterDisplay.join("");
        document.getElementById("display4").style.display = "none";
        document.getElementById("display5").style.display = "none";
        document.getElementById("display35").style.display = "none";
        document.getElementById("display2").style.display = "none";
        document.getElementById("computerspinButton").style.display = "none";
        document.getElementById("computerguessButton").style.display = "none";
        document.getElementById("computerbuyButton").style.display = "none";
        document.getElementById("menuButton").style.display = "block";
        alphabet.pop();
    } else {
        document.getElementById("display35").innerHTML = "Computer's Total Money: $" + computerMoney;
        document.getElementById("display").innerHTML = letterDisplay.join("");
        document.getElementById("display4").innerHTML = "Computer earned $" + money * numberCorrect + " from this turn";
        document.getElementById("display5").innerHTML = "Your turn:";
        document.getElementById("computerspinButton").style.display = "block";
        document.getElementById("computerguessButton").style.display = "none";
        document.getElementById("computerbuyButton").style.display = "block";
    }

}

function computerbuyVowel() {
    userInput = prompt("Which vowel would you like?")
    var checkVowel = false;
    for (i = 0; i < 5; i++) {
        if (userInput === vowels[i]) {
            checkVowel = true;
        }
    }
    check1 = true;
    if (checkVowel === true) {
        checkUsed(userInput)
        if (totalMoney < 250) {
            alert("You don't have enough money to buy a vowel.")
        } else {
            if (check1 == true) {
                totalMoney = totalMoney - 250;
                boughtVowel = true;
                document.getElementById("computerspinButton").style.display = "none";
                document.getElementById("computerbuyButton").style.display = "none";
                computermodeuserMove()
            }
        }
    } else {
        alert("Please enter a vowel")
    }
}
