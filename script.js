const questions = [
    {
        text: "Who was the founder of MIT?",
        choices: {
            a: "Richard Feynman",
            b: "Alan Turing",
            c: "William Barton Rogers",
            d: "Thomas Edison"
        },
        correct: "c"
    },
    {
        text: "In which year was MIT founded?",
        choices: {
            a: "1829",
            b: "1856",
            c: "1861",
            d: "1890"
        },
        correct: "c"
    },
    {
        text: "What is the official mascot of MIT?",
        choices: {
            a: "Eagle",
            b: "Beaver",
            c: "Lion",
            d: "Tiger"
        },
        correct: "b"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;

const questionText = document.getElementById("question-text");
const choiceButtons = document.querySelectorAll(".choice");
const nextBtn = document.getElementById("next-btn");
const timeLeft = document.getElementById("time-left");

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    questionText.textContent = question.text;
    choiceButtons.forEach((btn, index) => {
        const letter = ["a", "b", "c", "d"][index];
        btn.textContent = `${letter}) ${question.choices[letter]}`;
        btn.classList.remove("selected");
    });
}

choiceButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
        choiceButtons.forEach(button => button.classList.remove("selected"));
        e.currentTarget.classList.add("selected");
        nextBtn.disabled = false;
    });
});

nextBtn.addEventListener("click", () => {
    const selectedChoice = document.querySelector(".choice.selected").getAttribute("data-choice");
    if (questions[currentQuestionIndex].correct === selectedChoice) {
        score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
        nextBtn.disabled = true;
    } else {
        clearInterval(timer);
        showResults();
    }
});

function showResults() {
    const resultsContainer = document.querySelector(".results-container");
    resultsContainer.innerHTML = `
        <h2>Your Score: ${score} / ${questions.length}</h2>
        <button onclick="location.reload()">Retry</button>
        <button onclick="window.close()">Exit</button>
    `;
    document.querySelector(".quiz-container").style.display = "none";
    resultsContainer.style.display = "block";
}

loadQuestion();

timer = setInterval(() => {
    const currentTime = parseInt(timeLeft.textContent);
    if (currentTime <= 0) {
        clearInterval(timer);
        showResults();
    } else {
        timeLeft.textContent = currentTime - 1;
    }
}, 1000);
