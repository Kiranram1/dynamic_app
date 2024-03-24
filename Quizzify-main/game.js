const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// Define your own questions
let questions = [
    {
        "question" : "Which keyword is used in C/C++ to allocate memory dynamically?",
        "choice1" : "malloc",
        "choice2" : "new",
        "choice3" : "allocate",
        "choice4" : "dynamic",
        "answer" : 1

    },
    {
        "question" : "How is dynamically allocated memory released in C?",
        "choice1" : "Using delete keyword ",
        "choice2" : "Automatically by the compiler",
        "choice3" : "Using free() function",
        "choice4" : "None",
        "answer" : 3

    },
    {
        "question" : "Which of the following is a potential risk associated with dynamic memory allocation??",
        "choice1" : "Memory fragmentation",
        "choice2" : " Stack overflowr",
        "choice3" : " Buffer overflow",
        "choice4" : "Memory leak",
        "answer" : 4

    },
    {
        "question" : "What is a memory leak??",
        "choice1" : "Allocating more memory than required",
        "choice2" : "Deallocating memory before it is used",
        "choice3" : "Failing to deallocate memory that is no longer needed",
        "choice4" : "Not allocating memory at all",
        "answer" : 3

    },
    {
        "question" : "What is the role of the calloc() function in C?",
        "choice1" : "It allocates memory and initializes it to zero",
        "choice2" : "It deallocates memory previously allocated by malloc()",
        "choice3" : "It dynamically resizes memory blocks",
        "choice4" : " It creates copies of memory blocks",
        "answer" : 1

    },
    {
        "question" : "What happens if the realloc() function fails to resize a memory block in C?",
        "choice1" : "It returns a NULL pointer",
        "choice2" : "It throws a runtime exception",
        "choice3" : "It deallocates the memory block",
        "choice4" : "It returns the original memory block unchanged",
        "answer" : 4

    },
    {
        "question" : "What is fragmentation in the context of dynamic memory allocation??",
        "choice1" : "The process of allocating memory for a specific data type",
        "choice2" : "The process of deallocating memory after it is no longer needed",
        "choice3" : "The division of memory into fixed-size blocks",
        "choice4" : "The inefficient use of memory resulting in small unusable gaps",
        "answer" : 4

    },
    {
        "question" : "Which of the following functions is used to check if memory allocation was successful in C",
        "choice1" : "malloc_success()",
        "choice2" : "memory_status()",
        "choice3" : "alloc_status()",
        "choice4" : " malloc() itself",
        "answer" : 4

    },
    {
        "question" : "How can memory fragmentation be reduced in C?",
        "choice1" : " By increasing the memory allocation size",
        "choice2" : " By using smart pointers instead of raw pointers",
        "choice3" : "By compacting memory blocks to eliminate gaps",
        "choice4" : " By avoiding dynamic memory allocation altogether",
        "answer" : 3

    },
    {
        "question" : "Which function is used to reallocate memory for an array of elements in C",
        "choice1" : "realloc()",
        "choice2" : "resize()",
        "choice3" : "reallocarray()",
        "choice4" : " resizearray()",
        "answer" : 1

    },  
];

// CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = questions.length; // Set to the total number of your questions

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        // Go to the end page or do whatever you want when questions end
        return window.location.assign('./end.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    // Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice, index) => {
        choice.innerText = currentQuestion['choice' + (index + 1)];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};

startGame(); // Start the game
