const startButton = document.getElementById('start-btn');
const quizContainer = document.getElementById('quiz-container');
const questionContainer = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const resultContainer = document.getElementById('result');
const timercontainer = document.getElementById('timer');
const highScoresContainer = document.getElementById('high-scores');

let currentQuestionIndex = 0;
let score = 0;
let timer;
let quizEnded = false;
let highScores = [];

const questions = [
    {
        question: 'What does Web API stand for?',
        options: ['Web Application Programming Interface', 'Web Application Program Index', 'Web Array Pairing Interface', ' Web Application Program Initializer'],
        correctAnswer: 'Web Application Programming Interface'
    },
    {
        question: 'What is an event listener?',
        options: ['It places audio on a page', 'It connects the page to the local microphone', 'It listens for a specific event on the page, then executes connected code', 'It listens for any events happening in town'],
        correctAnswer: 'It listens for a specific event on the page, then executes connected code'
    },
    {
        question: 'What does PreventDefault() do?',
        options: ['It prevents the page from using comic sans', 'It prevents a default action, like the page reloading, from occurring', 'It prevents the page from crashing', 'It allows the page to connect JavaScript from within the HTML'],
        correctAnswer: 'It prevents a default action, like the page reloading, from occurring'
    },
    {
        question: 'How many Web APIs are there?',
        options: ['5', '3', '15', 'New Web APIs are created all the time'],
        correctAnswer: 'New Web APIs are created all the time'
    }
];

function loadHighScores() {
    const storedHighScores = localStorage.getItem('highScores');
    highScores = storedHighScores ? JSON.parse(storedHighScores) : [];
}

function saveHighScores() {
    localStorage.setItem('highScores', JSON.stringify(highScores));
}

function displayHighScores() {
    const highScoresList = highScores
        .map(entry => `<li>${entry.initials}: ${entry.score}%</li>`)
        .join('');

    highScoresContainer.innerHTML = `<h2>High Scores</h2><ol>${highScoresList}</ol>`;
}

function startQuiz() {
    startButton.style.display = 'none';
    quizContainer.style.display = 'block';
    setNextQuestion();
    startTimer();
}

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionContainer.innerText = question.question;

    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option');
        button.addEventListener('click', () => selectOption(question, option));
        optionsContainer.appendChild(button);
    });
}

function resetState() {
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
}

function selectOption(question, selectedOption) {
    if (selectedOption === question.correctAnswer) {
        score += 1;
        resultContainer.innerText = 'Correct!';
    } else {
        resultContainer.innerText = 'Incorrect!';
        // Subtract 10 seconds for an incorrect answer
        subtractTime(10);
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        setNextQuestion();
    } else {
        endQuiz();
    }
}

function subtractTime(seconds) {
    let timeRemaining = parseInt(timercontainer.innerText.split(' ')[1]); // Get current time remaining
    timeRemaining -= seconds;
    timercontainer.innerText = `Time: ${timeRemaining}s`;
}

function startTimer() {
    let timeRemaining = 60;

    timer = setInterval(() => {
        timercontainer.innerText = `Time: ${timeRemaining}s`;

        if (timeRemaining <= 0) {
            endQuiz();
        }

        timeRemaining--;
    }, 1000);
}

function endQuiz() {
    clearInterval(timer);
    quizContainer.style.display = 'none';

    const finalScore = (score / questions.length) * 100;

    resultContainer.innerText = `Quiz Over! Your Score: ${finalScore.toFixed(2)}%`;

    highScores.push({
        initials: '',
        score: finalScore.toFixed(2)
    });

    // Prompt for user's initials
    const userInitials = prompt('Enter your initials:');

    // Update the last entry in highScores with user's initials
    highScores[highScores.length - 1].initials = userInitials || 'Anonymous';

    saveHighScores();

    loadHighScores();
    displayHighScores();

    quizEnded = true;
    questionContainer.innerText = "";
}

startButton.addEventListener('click', startQuiz);
