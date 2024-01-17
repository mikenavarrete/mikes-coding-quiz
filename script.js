const startButton = document.getElementById('start-btn');
const quizContainer = document.getElementById('quiz-container');
const questionContainer = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const resultContainer = document.getElementById('result');
const timercontainer = document.getElementById('timer');

let currentQuestionIndex = 0;
let score = 0;
let timer; 
let quizEnded = false;

const questions = [
    {
        question: 'What does Web API stand for?',
        options: ['Web Application Programming Interface','Web Application Program Index', 'Web Array Pairing Interface', ' Web Application Program Initializer'],
        correctAnswer: 'Web Application Programming Interface'
    },
    {
        question: 'What is an event lister?',
        options: ['It places audio on a page', 'It connects the page to the local microphone', 'It listens for a specific event on the page, then executes connected code', 'It listens for any events happening in town'],
        correctAnswer:'It listens for a specific event on the page, then executes connected code'
    },
    {
        question: 'What does PreventDefault() do?',
        options: ['It prevents the page from using comic sans', 'It prevents a default action, like the page reloading, from occuring', 'It prevents the page from crashing', 'It allows the page to connect JavaScript from within the HTML'],
        correctAnswer: 'It prevents a default action, like the page reloading, from occuring'
    },
    {
        question: 'How many Web APIs are there?',
        options: ['5', '3', '15', 'New Web APIs are created all the time'],
        correctAnswer: 'New Web APIs are created all the time'
    }
];

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
        quizEnded = false;
    });
}

function resetState() {
    while (optionsContainer.firstChild){
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
}

function selectOption(question, selectedOption) {
    if (selectedOption === question.correctAnswer) {
        score+= 1;
        resultContainer.innerText = 'Correct!';
    }
    else{
        resultContainer.innerText = 'Incorrect!';
    }

    currentQuestionIndex++;
    
    if (currentQuestionIndex < question.length) {
        setNextQuestion();
    }
    else {
        endQuiz();
    }
}

function startTimer() {
    let timeRemaining = 60;

    timer = setInterval(() => {
        timercontainer.innerText = `Time: ${timeRemaining}s`;

        if (timeRemaining <= 0){
            endQuiz();
        }

        timeRemaining--;
    },1000);
}

function endQuiz() {
    clearInterval(timer);
    quizContainer.style.display = 'none';
    const finalScore = (score/ questions.length) * 100;
    resultContainer.innerText = `Quiz Over! Your Score: ${finalScore.toFixed(2)}%`;
    quizEnded = true;
}

startButton, addEventListener('click', startQuiz);