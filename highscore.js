const highscoreTablebody = document.getElementById("highscoreTablebody");
const highscores = JSON.parse(localStorage.getItem("highscores")) || [];

highscoreTablebody.innerHTML = highscores.map(score => {
    return `<tr><td>${score.name}</td><td>${score.score}</td></tr>`;
}).join('');
