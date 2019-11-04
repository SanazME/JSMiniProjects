/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

Change the game to follow these rules:
1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/


// Declare variables
var scores, roundScore, activePlayer, gameEnd, isGamePlaying, previousRoll;

// Initialize the game
resetGame();

// Click Roll button
document.querySelector('.btn-roll').addEventListener('click', rollDice);

// Click on hold
document.querySelector('.btn-hold').addEventListener('click', holdGame);

// Click on New button
document.querySelector('.btn-new').addEventListener('click', resetGame);

function resetGame() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    isGamePlaying = true;
    previousRoll = Infinity;

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

function rollDice() {
    if (isGamePlaying) {

        // console.log(rollDiceButton)
        // Roll the dice

        // Display dice with correct number
        var diceDOM = document.querySelectorAll('.dice');

        for (let i = 0; i < diceDOM.length; i++) {
            diceDOM[i].style.display = 'block';
            // Roll dice
            var dice = Math.floor(Math.random() * 6) + 1;
            diceDOM[i].src = 'dice-' + dice + '.png';
            // Set score based on round Score
            console.log('diceDOM' + i + ':' + dice)
            updateScores(dice);
            if (dice === 1) {
                break;
            }
        }

        // document.querySelectorAll('.dice').forEach(function (diceDOM) {
        //     diceDOM.style.display = 'block';
        //     // Roll the dice
        //     var dice = Math.floor(Math.random() * 6) + 1;
        //     diceDOM.src = 'dice-' + dice + '.png';
        //     // Set the score based on round Score
        //     console.log(dice)
        //     updateScores(dice);
        // })

    }
}

function updateScores(dice) {
    /*
    if the player rolls two 6 in a row:
    - set the total score to zero 
    - update the score display of active player
    - switch active player
    - reset current score
    - reset previousRoll variable
    */
    if (dice === 1) {
        // scores[activePlayer] = 0;
        // Update the score display for active player
        // document.querySelector('#score-' + activePlayer).textContent = '0';
        switchActivePlayer();
    } else {
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }


    // Challenge 2
    // if (dice === 6 && previousRoll === 6) {
    //     scores[activePlayer] = 0
    //     // Update the score display for active player
    //     document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    //     switchActivePlayer();

    // } else if (dice === 1) {
    //     switchActivePlayer();

    // } else {
    //     roundScore += dice;
    //     document.querySelector('#current-' + activePlayer).textContent = roundScore;
    //     // Update previousRoll
    //     previousRoll = dice;
    // }
}

function holdGame() {
    if (isGamePlaying) {
        // Update global score with the current score
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if user has won
        // Get winning score
        var inputFinalScore = Number(document.querySelector('.winning-score').value);
        var winningScore;

        if (inputFinalScore) {
            winningScore = inputFinalScore;
        } else {
            winningScore = 100;
        }

        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            isGamePlaying = false;
            // resetGame();
        } else {
            // Switch user
            switchActivePlayer();
        }
    }
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

function resetCurrentScore() {
    // Set current- and score- ids to zero
    roundScore = 0
    previousRoll = Infinity;
    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;
    // Hide dice
    // document.querySelector('.dice').style.display = 'none';
    document.querySelectorAll('.dice').forEach(function (dice) {
        dice.style.display = 'none';
    })

    // document.querySelector('#dice-1').style.display = 'none';
    // document.querySelector('#dice-2').style.display = 'none';
}
