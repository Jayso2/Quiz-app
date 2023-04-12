//declare the variables needed to access all relevant elements from the html

const startButton = document.getElementById('startButton');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answersButtonElement = document.getElementById('answer-buttons');
const startInstructionsElement = document.getElementById('startInstructions');

const status = document.getElementById("status");
const yourScore = document.getElementById("your-score")
const scoreElement = document.getElementById("score-container");

var viewHighScores = document.getElementById("scores-btn");
var submitButton = document.getElementById("submit-btn");
var clearScoreButton = document.getElementById("clear-btn");
var restartButton1 = document.getElementById("restar-btn");
var restartButton = document.getElementById("restart-btn");

var scores = JSON.parse(localStorage.getItem("scores")) || [];

var timeLeft = 70;
var timerEl = document.getElementById("timer");

let right = 0;
var highScores = [];

let shuffledQuestion, currentQuestion

document.getElementById("incorrect").classList.add('hide');
document.getElementById("correct").classList.add('hide');
document.getElementById("status").classList.add('hide');

//Event listener on start button click
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestion++
    setNextQuestion()
})

// timer display and run out of time action
function timeTick() {
    timeLeft--;
    timerEl.textContent = "Time: " + timeLeft + " Secs";
    if (timeLeft <= 0) {
        timerEl.textContent = "GAME OVER !!!" 
        saveScore();
    }
}


// hide start button , make question div visable, start timer, score index set 0 and hide start page intro blurb and high score btn
function startGame() {
    right = 0;
    startButton.classList.add('hide')
    shuffledQuestion = question.sort(() => Math.random() - 0.5)   
    currentQuestion = 0
    viewHighScores.classList.add('hide')
    questionContainerElement.classList.remove('hide')
    startInstructionsElement.classList.add('hide')
    setNextQuestion()
    timerID = setInterval(timeTick, 1000)
    timeTick()
}



// set nxt question unless out of questions
function setNextQuestion () {
    resetState();
    if (shuffledQuestion.length < currentQuestion + 1) {
        clearInterval(score);
        clearInterval(time);
        endQuiz();
    } else {
        showQuestion(shuffledQuestion[currentQuestion])
    }   
}

// append question and corresponding answers options from array
function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answers => {
        const button = document.createElement('button')
        button.innerText = answers.text
        button.classList.add('btn')
        if (answers.correct) {
            button.dataset.correct = answers.correct
        }
        button.addEventListener('click', selectAnswer)
        answersButtonElement.appendChild(button)
    })
}
//stop user selecting diffrent answer button after initial anser selected
function disableChildrenButtons(button) {
    var parent = button.parentElement;
    parent.childNodes.forEach(element => {
        element.disabled = true;
    }); 
}
//clear status r or w, new question set new answer , hide next btn till user selects answer again
function resetState()  {
      nextButton.classList.add("hide")
    document.getElementById("status").classList.add('hide');
    while (answersButtonElement.firstChild) {
        answersButtonElement.removeChild(answersButtonElement.firstChild)
    }
}


// Select answer function if select show hide, diabled extra press, set staus wright ot wrong function
function selectAnswer(e) {
    var selectedButton = e.target;
    disableChildrenButtons(e.target);
    setStatusClass(selectedButton);
    if (shuffledQuestion.length > currentQuestion + 1) {
        nextButton.classList.remove("hide")
    } else {
        saveScore();
    }}


// for each question answered set class colour right ot wrong, show status w or r text at bottem, add to score if correct deduct 10 sec if wrong
function setStatusClass(selectedbutton) {
    document.getElementById("status").classList.remove('hide');
    if (selectedbutton.dataset.correct) {
        selectedbutton.classList.add('correct');
        document.getElementById("incorrect").classList.add('hide');
        document.getElementById("correct").classList.remove('hide');
        right += 10;
    } else {
        selectedbutton.classList.add('wrong');
        document.getElementById("incorrect").classList.remove('hide');
        document.getElementById("correct").classList.add('hide');
        timeLeft -= 10;
    } 
}

 // clear class right or wrong 
  function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
 }


// Array with MC question list
const question = [
    {
        question: 'Who is the best player?',
        answers: [
            {text: 'Messi', correct: false},
            {text: 'Mbape', correct: false},
            {text: 'Ronaldo', correct: true},
            {text: 'Jason', correct: false}]
    },{
        question: 'Which year was Gimpa established?',
        answers: [
            {text: '1999', correct: false},
            {text: '2002', correct: false},
            {text: '2023', correct: false},
            {text: '1976', correct: true}]
    }, 
    {
        question: 'How many days are in a week?',
        answers: [
            {text: '2', correct: false},
            {text: '7', correct: true},
            {text: '10', correct: false},
            {text: '8 and half', correct: false}]
    }, {
        question: 'What is toyota',
        answers: [
            {text: 'book', correct: false},
            {text: 'ship', correct: false},
            {text: 'shape', correct: false},
            {text: 'Car', correct: true}]

    }
]


// Show Final score end quiz section and record name and score form
function saveScore() {
//stop timer
    clearInterval(timerID);

    
 //sec time out to show last question before final score shows up     
    setTimeout(function () {
        questionContainerElement.classList.add('hide')
        scoreElement.classList.remove('hide');
 //set a 1.5 sec time out   
    }, 1500)
    yourScore.textContent = "Your Final Score is " + right + "/10";
}

 // Get score from local storage
var loadScores = function () {
    if (!savedScores) {
        return false;
     }
 // Convert scores from stringfield format into array
    let savedScores = JSON.parse(savedScores);
    var initials = document.querySelector("#initials-field").value;
    var newScore = {
        initials: initials,
        userScore: right,     
    }
    savedScores.push(newScore);
    console.log(savedScores)

    savedScores.forEach(score => {
        initialsField.innerText = score.initials
        scoreField.innerText = score.right
    })
};
// Show high score section 
function showHighScores(initials) {
    document.getElementById("highscores").classList.remove("hide");
    document.getElementById("score-container").classList.add("hide");
    startInstructionsElement.classList.add("hide");
    questionContainerElement.classList.add("hide");
    if (typeof initials == "string") {
        var score = {
            initials: initials,
            userScore: right,          
        }
        scores.push(score)
    }

var highScoreEl = document.getElementById("highscore");
    highScoreEl.innerHTML = "";

//append name and score to high score section, create div for name and div for score
    for (i = 0; i < scores.length; i++) {
        var div1 = document.createElement("div");
        div1.setAttribute("class", "name-div");
        div1.innerText = scores[i].initials;
        var div2 = document.createElement("div");
        div2.setAttribute("class", "score-div");
        div2.innerText = scores[i].userScore;

        highScoreEl.appendChild(div1);
        highScoreEl.appendChild(div2);
    }
localStorage.setItem("scores", JSON.stringify(scores));
};


// View high scores btn on first page
viewHighScores.addEventListener("click", showHighScores);

//get score and name to pass thru and set score, & show highscore section after initials submited
submitButton.addEventListener("click", function (event) {
    event.preventDefault()
    var initials = document.querySelector("#initials-field").value;
    right;
    showHighScores(initials);
});


// Restart or reload the page- submit score section
restartButton1.addEventListener("click", function () {
    window.location.reload();
});
// Restart or reload the page save score section -high score section
restartButton.addEventListener("click", function () {
    window.location.reload();
});


// Clear high score btn - clear localStorage items 
clearScoreButton.addEventListener("click", function () {
    localStorage.clear();
    document.getElementById("highscore").innerHTML = "";
});