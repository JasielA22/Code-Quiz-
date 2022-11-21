var initials = document.getElementById('initials');
var saveScoreBtn = document.getElementById('saveScoreBtn');
var finalScore = document.getElementById('finalScore');
var mostRecentScore = localStorage.getItem('mostRecentScore')

var highScores =JSON.parse(localStorage.getItem('highScores'));
console.log(JSON.parse(localStorage.getItem('highScores')));
finalScore.innerText = mostRecentScore;

initials.addEventListener('keyup', () =>{
    console.log(initials.value);
    saveScoreBtn.disabled = !initials.value; //disabled if there is nothing in the input
})

function saveHighScore(event) {
    console.log("clicked the save btn");
    event.preventDefault();
};