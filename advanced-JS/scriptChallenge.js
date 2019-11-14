/////////////////////////////

// CODING CHALLENGE





/*

--- Let's build a fun quiz game in the console! ---
1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)
2. Create a couple of questions using the constructor
3. Store them all inside an array
4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).
5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.
6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).
7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).
*/
/*

( function(){
    function Question(question, answers, correctAnswer) {
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    }

    Question.prototype.displayQuestion = function(){
        // Display question
        console.log(this.question);
        // display answers
        this.answers.forEach(function(ele, idx){
            console.log(idx + ' - ' + ele);
        })
    }

    Question.prototype.checkAnswer = function(input){
        if (Number.isInteger(input)){
            if (input === this.correctAnswer){
                console.log('Correct answer');
            } else {
                console.log('Incorrect answer')
            }

        } else {
            console.log('Provide an integer for the answer')
        }
    }   

    let q1 = new Question('Is JS a cool language?', ['Yes', 'No', 'Maybe'], 0)
    let q2 = new Question('What is the teacher\'s name?', ['Bob', 'Jones', 'John'], 1)
    let q3 = new Question('Is the teacher good?', ['Yes', 'No', 'Not Sure'], 0)
    let questionArr = [q1, q2, q3];

    // Choose a random question
    let randIdx = Math.floor(Math.random() * (questionArr.length));
    let selectedQuestion = questionArr[randIdx];

    // Display question and answers
    selectedQuestion.displayQuestion();

    // Get user input
    let userInput = parseInt(prompt('Please select the correct answer:'));

    // Check user input
    selectedQuestion.checkAnswer(userInput);
})();

*/
/*

--- Expert level ---
8. After you display the result, display the next random question, so that the game never ends (Hint: write a function for this and call it right after displaying the result)
9. Be careful: after Task 8, the game literally never ends. So include the option to quit the game if the user writes 'exit' instead of the answer. In this case, DON'T call the function from task 8.
10. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point to the score (Hint: I'm going to use the power of closures for this, but you don't have to, just do this with the tools you feel more comfortable at this point).
11. Display the score in the console. Use yet another method for this.
*/

(function () {
    // let count = 0;
    function Question(question, answers, correctAnswer) {
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    }

    Question.prototype.displayQuestion = function () {
        // Display question
        console.log(this.question);
        // display answers
        this.answers.forEach(function (ele, idx) {
            console.log(idx + ' - ' + ele);
        })
    }

    Question.prototype.checkAnswer = function (input, keepScore) {
        let sc;
        if (Number.isInteger(input)) {
            if (input === this.correctAnswer) {
                console.log('Correct answer');
                sc = keepScore(true);
            } else {
                console.log('Incorrect answer')
                sc = keepScore(false);
            }

        } else {
            console.log('Provide an integer for the answer')
        }
        this.displayScore(sc);
    }

    Question.prototype.displayScore = function (count) {
        console.log('Your current score : ' + count);
    }

    let q1 = new Question('Is JS a cool language?', ['Yes', 'No', 'Maybe'], 0)
    let q2 = new Question('What is the teacher\'s name?', ['Bob', 'Jones', 'John'], 1)
    let q3 = new Question('Is the teacher good?', ['Yes', 'No', 'Not Sure'], 0)

    let questionArr = [q1, q2, q3];

    var keepScore = score();
    continueGame();

    function continueGame() {
        flag = true;
        while (flag) {
            // Choose a random question
            let randIdx = Math.floor(Math.random() * (questionArr.length));
            let selectedQuestion = questionArr[randIdx];
            // Display question and answers
            selectedQuestion.displayQuestion();
            // Get user input
            let userInput = prompt('Please select the correct answer or type exit:');

            if (userInput === 'exit') {
                flag = false;
            } else {
                // Check user input
                selectedQuestion.checkAnswer(parseInt(userInput));
            }
        }
    }

    function score() {
        let count = 0;
        return function (correct) {
            if (correct) {
                count++;
            }
            return count
        }
    }
})();