/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Declare variables
var scores, roundScore, activePlayer, gameEnd;

// Initialize the game
resetGame();

// Click Roll button
clickRollDice();

// Click on hold
clickHold();

// Click on New button
document.querySelector('.btn-new').addEventListener('click', resetGame);

function resetGame() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    // reset scores
    resetCurrentScore();
    document.querySelector('#score-0').textContent = 0;
    document.querySelector('#score-1').textContent = 0;
    // Rest names
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    // Remove winner class
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    // 
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

function clickRollDice() {
    var rollDiceButton = document.querySelector('.btn-roll');
    // console.log(rollDiceButton)
    rollDiceButton.addEventListener('click', function () {
        // Roll the dice
        var dice = Math.floor(Math.random() * 6) + 1;
        // console.log('dice: ', dice)

        // Display dice with correct number
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        // Set the score based on round Score
        updateScores(dice);
        // Change active player if dice === 1
        updateActivePlayer(dice);
    });
}

function clickHold() {
    document.querySelector('.btn-hold').addEventListener('click', () => {
        // Update global score with the current score
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if user has won
        if (scores[activePlayer] >= 20) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            // resetGame();
        } else {
            // Switch user
            switchActivePlayer();
        }
    })
}

function switchActivePlayer() {
    // switch active player
    activePlayer = activePlayer === 1 ? 0 : 1;
    // Toggle active class to active player
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    // Reset current score
    resetCurrentScore();

    return activePlayer
}

function updateScores(dice) {
    // Calculate roundScore
    roundScore += dice === 1 ? 0 : dice;
    // update current score
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
}

function updateActivePlayer(dice) {
    activePlayer = dice === 1 ? switchActivePlayer() : activePlayer;
}

function resetCurrentScore() {
    // Set current- and score- ids to zero
    roundScore = 0
    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;
    // Hide dice
    document.querySelector('.dice').style.display = 'none';
}