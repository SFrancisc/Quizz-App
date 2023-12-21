let questions = window.questionsList;

//Functie ce primeste un array si returneaza array-ul cu elementele intr-o ordine random
const getRandomOrder = (arr) => {
    const result = [];
    while (arr.length > 0) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        result.push(arr[randomIndex]);
        arr.splice(randomIndex, 1);
    }
    return result;
};

//Adaugam variabile pentru cele 3 constante din html (question, answer-button, next-btn)
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

//Cream variabile pentru a stabili indexul de plecare al scorului si currentQuestion
let currentQuestionIndex = 0;
let score = 0;

//Obtinerea array-ului cu elementele, intr-o ordine random, 
// setarea scorului la 0, afisarea intrebarii si a butonului Next care apare doar dupa ce un raspuns a fost ales.
function startQuiz() {
    questions = getRandomOrder(questions)
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

//Functia de showQuestion are ca rol afisarea intrebarii cu indexul incrementat
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    //Obtinerea variantelor de raspuns intr-un ciclu
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

//Functia de resetare a displayului
function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

//Functia de reprezentare a raspunsului(corect/gresit) cu incrementarea scorului
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

//Afiseaza scorul acumulat si functia de Play again daca vrei sa incepi un nou quiz
function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

//Daca nu mai este o alta intrebare la apasarea butonului Next se incepe un quiz nou
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz(); 