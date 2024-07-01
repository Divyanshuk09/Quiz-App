const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("Choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const ProgressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [];

async function fetchQuestions() {
    try {
        const res = await fetch("question.json");
        const loadedQuestions = await res.json();
        console.log(loadedQuestions);
        questions = loadedQuestions;
        startGame();
    } catch (error) {
        console.error('Failed to fetch questions:', error);
    }
}

fetchQuestions();

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 20;

function startGame() {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    
    getNewQuestion();
    game.classList.remove("hidden");
    loader.classList.add("hidden");
}

function getNewQuestion() {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        window.location.href = 'end.html';
        return;
    }

    questionCounter++;
    progressText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
    let progressbarpercent = (questionCounter / MAX_QUESTIONS) * 100;
    ProgressBarFull.style.width = `${progressbarpercent}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        console.log(selectedAnswer == currentQuestion.answer);
        if (selectedAnswer == currentQuestion.answer) {
            score += CORRECT_BONUS;
            scoreText.innerText = score;
        }
        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        selectedChoice.parentElement.classList.add(classToApply);
        
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
            game.classList.remove("hidden");
            loader.classList.add("hidden");
        }, 1000);
    });
});
