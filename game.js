var question = document.getElementById("question");
var choices = Array.from(document.getElementsByClassName("choice-text"));

var currentQuestion = {}; //Object to keep track of question
var acceptingAnswers = false; // Does not let the user answer until everything is loaded
var score = 0;              //Keep track of score 
var availableQuestions = []; // which questions are in the page

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

function startGame() {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]; // Make a full copy
    console.log(availableQuestions);
}

function getNewQuestion() {
    if (availableQuestions.length === 0 || questionCounter >= maxQuestions) {
        return window.location.assign ('/end.html'); // home location
    } else
    questionCounter++;
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

  //gets the data from the chocie clicked on
  choices.forEach(choice => {
    choice.addEventListener('click', event => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        var selectedChoice = event.target;
        var selectedAnswer = selectedChoice.dataset['number'];

        var classToApply = 'incorrect';
        if(selectedAnswer == currentQuestion.answer) {
            classToApply = 'correct' ;
        }
        console.log(classToApply);


        getNewQuestion();
    })
  })
startGame();
getNewQuestion();