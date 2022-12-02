var highScoresList = document.getElementById('highScoresList');
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoresList.innerHTML =highScores
.map(score => {  //arrow function are fun & map is to convert arrays ionto something else
    return`<li class="high-score">${score.initials} - ${score.score} </li>`// ` and ' are different, never knew that
}).join('')

