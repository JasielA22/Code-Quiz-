var initials = document.getElementById('initials');
var saveScoreBtn = document.getElementById('saveScoreBtn');
var finalScore = document.getElementById('finalScore');
var mostRecentScore = localStorage.getItem('mostRecentScore')

var highScores =JSON.parse(localStorage.getItem('highScores')) || [];

console.log(highScores);
finalScore.innerText = mostRecentScore;

initials.addEventListener('keyup', () =>{
    saveScoreBtn.disabled = !initials.value; //disabled if there is nothing in the input
})

function saveHighScore(event) {
    event.preventDefault();

    var score = {
        score: mostRecentScore,
        initials: initials.value
    };
    highScores.push(score);
    highScores.sort((a,b) =>{
        return b.score - a.score; //if b.score is bigger than a.score, put if before a.score
    })
    highScores.splice(5);
    localStorage.setItem('highScores', JSON.stringify(highScores)); // saves even if refreshed
    window.location.assign ('./highScore.html');
    console.log(highScores);
};