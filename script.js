const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "New York", correct: false },
            { text: "London", correct: false },
            { text: "Paris", correct: true },
            { text: "Dublin", correct: false }
        ]
    },
    {
        question: "Who is CEO of Tesla?",
        answers: [
            { text: "Elon Musk", correct: true },
            { text: "Jeff Bezos", correct: false },
            { text: "Bill Gates", correct: false },
            { text: "Tony Stark", correct: false }
        ]
    },
    {
        question: "The iPhone was created by which company?",
        answers: [
            { text: "Apple", correct: true },
            { text: "Intel", correct: false },
            { text: "Amazon", correct: false },
            { text: "Microsoft", correct: false }
        ]
    },
    {
        question: "How many Harry Potter books are there?",
        answers: [
            { text: "1", correct: false },
            { text: "4", correct: false },
            { text: "6", correct: false },
            { text: "7", correct: true }
        ]
    }
];

const quesElement = document.getElementById("question");
const ansButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQues = 0;
let score = 0;

const startQuiz = () => {
    currentQues = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
};

const showQuestion = () => {
    resetState();

    let currQues = questions[currentQues];
    let quesNo = currentQues + 1;
    quesElement.innerText = quesNo + ". " + currQues.question;

    currQues.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        ansButtons.appendChild(button);
        button.dataset.correct = answer.correct; 
        
        button.addEventListener("click", () => {
            if (answer.correct) {
                score++;
                button.classList.add("correct");
            }
            else {
                button.classList.add("wrong");
            }
            [...ansButtons.children].forEach(button => {
                button.disabled = true;
                if(button.dataset.correct === "true"){
                    button.classList.add("correct");
                }
            });
            nextButton.style.display = "block";
        });
    });
}

const resetState = () => {
    nextButton.style.display = "none";
    while (ansButtons.firstChild) {
        ansButtons.removeChild(ansButtons.firstChild);
    }
}   

nextButton.addEventListener("click", () => {
    currentQues++;
    if (currentQues < questions.length) { 
        showQuestion();
    }
    else {
        resetState();
        quesElement.innerText = "Your scored " + score + " out of " + questions.length + " !";
        nextButton.innerHTML = "Restart";
        nextButton.style.display = "block";
        nextButton.addEventListener("click", () => {
            startQuiz();
        });
    }
});

startQuiz();