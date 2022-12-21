var question = document.getElementById("question");
var choices = Array.from(document.getElementsByClassName("choice-text"));
var questionCounterText = document.getElementById('questionCounter');
var scoreText = document.getElementById('score');

var currentQuestion = {}; //Object to keep track of question
var acceptingAnswers = false; // Does not let the user answer until everything is loaded
var score = 0;   
var questionCounter = 0;           //Keep track of score 
var availableQuestions = []; // which questions are in the page
var timer = document.getElementById('timer');
var timeLeft = 59;

var questions = [ //question array
    {
        question: 'What part of the HTML do you link the Javascript file?',
        choice1: '<Head>',
        choice2: '<Body>',
        choice3: '<Footer>',
        choice4: '<Nav>',
        answer: 2,
    },
    {
        question:
            "What is the proper syntax to assign a varriable to an Id?",
        choice1: "var x =  #idName",
        choice2: "var x = idName(document.getElementById)",
        choice3: "var x = document.getElementById('idName')",
        choice4: "var x = document.getElementByClassName('idName')",
        answer: 3,
    },
    {
        question: "What do we use to make Javascript a little shorter?",
        choice1: "JQuery",
        choice2: "CSS",
        choice3: "HTML",
        choice4: "Java",
        answer: 1,
    },
];

const maxQuestions = 3;
const correctBonus = 10;
const incorrectPenalty = -5;

function startGame() {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]; // Make a full copy
    console.log(availableQuestions);
}

//Gets new question in a random order after answer
function getNewQuestion() {
    if (availableQuestions.length === 0 || questionCounter >= maxQuestions) {
        localStorage.setItem("mostRecentScore", score);
        return window.location.href = './end.html'; // home location
    }
    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + maxQuestions;

    var questionIndex = Math.floor(Math.random() * availableQuestions.length);
    //picks a whole number at random
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question; //Text for the question
    choices.forEach((choice) => {  //New way to type a function aka arrow functions
        var number = choice.dataset ['number']; // gets the data number from html to see what question we are on
        choice.innerText = currentQuestion['choice' + number]; //Writes the corresponding question 
        
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
  }

  changeScore = num => {
    score +=num;
    scoreText.innerText = score;
  }

  
  //gets the data from the choice clicked on
  choices.forEach(choice => {
    choice.addEventListener('click', event => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        var selectedChoice = event.target;
        var selectedAnswer = selectedChoice.dataset['number'];

        var classToApply = 'incorrect';
        if(selectedAnswer == currentQuestion.answer) {
            classToApply = 'correct' ;
        }else {
            timeLeft -= 10;
        }
      
        console.log(classToApply);

        if(classToApply === 'correct') {
            changeScore(correctBonus);
        }else if (score != 0){
            changeScore(incorrectPenalty);
        };

        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout (() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    })
  })

  function countdown() {
    var timeInterval = setInterval(function () {
      timer.innerHTML = timeLeft;
      timeLeft--;
      if(timeLeft < 0) {
        clearInterval(timeInterval);
        return window.location.href = './end.html';
      }
    }, 1000);
}

startGame();
getNewQuestion();
countdown();
