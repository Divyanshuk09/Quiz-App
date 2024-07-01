const username = document.getElementById("username");
const finalscore = document.getElementById("finalscore")
const SaveScoreBtn = document.getElementById("SaveScorebtn");
const mostRecentScore = localStorage.getItem("mostRecentScore");


const highscores = JSON.parse(localStorage.getItem("highscores")) || [];

const MAX_HIGH_SCORES = 5;
finalscore.innerText=mostRecentScore;

username.addEventListener('keyup',() =>{
    SaveScoreBtn.disabled = !username.value;
})

saveHighScore = e =>{
    console.log("Clicked the Save Score");
    e.preventDefault();
    
    const score = {
        score : mostRecentScore,
        name : username.value
    }
    highscores.push(score)
    
    highscores.sort((a,b)=> b.score - a.score)
    highscores.splice(5)
    localStorage.setItem("highscores",JSON.stringify(highscores));
    window.location.href= "home.html"
}