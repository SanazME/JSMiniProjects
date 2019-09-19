/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Declare variables
var scores, roundScore, activePlayer;

// Initialize the game
startGame();

// Click Roll button
clickRollDice();

// Click on hold
clickHold();



function startGame() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 1;
    // Hide the dice
    document.querySelector('.dice').style.display = 'none';
}

function clickRollDice() {
    var rollDiceButton = document.querySelector('.btn-roll');
    // console.log(rollDiceButton)
    rollDiceButton.addEventListener('click', function () {
        // Roll the dice
        var dice = Math.floor(Math.random() * 6) + 1;
        // console.log('dice: ', dice)

        // Display dice with correct number
        document.querySelector('.dice').style.display = 'block';
        document.querySelector('.dice').src = 'dice-' + dice + '.png';

        // Set the score based on round Score
        updateScores(dice);
        // Change active player if dice === 1
        updateActivePlayer(dice);
    });
}

function clickHold() {
    document.querySelector('.btn-hold')
    switchActivePlayer();
}

/*
function rollDice() {
    // Roll the dice
    var dice = Math.floor(Math.random() * 6) + 1;
    // console.log('dice: ', dice)

    // Display dice with correct number
    document.querySelector('.dice').style.display = 'block';
    document.querySelector('.dice').src = 'dice-' + dice + '.png';

    // Set the score based on round Score
    updateScores(dice);
    // Change active player if dice === 1
    updateActivePlayer(dice);
}
*/

function switchActivePlayer() {
    return activePlayer = activePlayer === 1 ? 0 : 1;
}

function updateScores(dice) {
    // Calculate roundScore
    roundScore = dice === 1 ? 0 : dice;
    // update current score
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
    // update total score
    scores[activePlayer] += roundScore;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
}

function updateActivePlayer(dice) {
    activePlayer = dice === 1 ? switchActivePlayer() : activePlayer;
}