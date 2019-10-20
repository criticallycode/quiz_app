const startBtn = document.getElementById('start-button')
const nextBtn = document.getElementById('next-button')
const questionsContainer = document.getElementById('questions')
const questionObj = document.getElementById('question')
const answers = document.getElementById('answers')

/* Will be used to shuffle the questions in the array, currently undefined */
let shuffled, current_idx 

/* alternate way of doing arrays */
const questions = [
    {
        question: 'Test question 1',
        answers: [
            { text: 'Correct', correct: true},
            { text: 'Incorrect', correct: false}
        ]
    },
    {
        question: 'Test question 2',
        answers: [
            { text: 'Incorrect', correct: false},
            { text: 'Correct', correct: true}
        ]
    },
    {
        question: 'Test question 3',
        answers: [
            { text: 'Incorrect', correct: false},
            { text: 'Incorrect', correct: false},
            { text: 'Correct', correct: true}
        ]
    },
    {
        question: 'Test question 4',
        answers: [
            { text: 'Correct', correct: true},
            { text: 'Incorrect', correct: false},
            { text: 'Incorrect', correct: false}
        ]
    },
    {
        question: 'Test question 5',
        answers: [
            { text: 'Incorrect', correct: false},
            { text: 'Correct', correct: true},
            { text: 'Incorrect', correct: false},
            { text: 'Incorect', correct: false}
        ]
    }
    
]

startBtn.addEventListener('click', start)
nextBtn.addEventListener('click', () => {
    current_idx++
    next()
})

function start(){
    /* update the classes of the button to hide it*/
    startBtn.classList.add('hide')
    /* math.random() returns number between 1 and 0, 
    subtratcing .5 should give a number below 0 or above 50% of the time, which should essentially be a random array */
    shuffled = questions.sort(() => Math.random() - .5)
    current_idx = 0
    questionsContainer.classList.remove('hide')
    next()
}

/* Sets the current question to the next question in the index */
function next(){
    /* Need to clear container whenever a new question in generated */
    reset()
    show(shuffled[current_idx])
}

function show(question){
    questionObj.innerText = question.question
    /* Create a new button element for the different possible answers */
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        /* Make it a button class */
        button.classList.add('btn')
        /* Dataset adds a data attribute - Add correct attribute to the button which represents the correct answer */
        if (answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', answerSelect)
        answers.appendChild(button)
    });
}

function answerSelect(e){
    const selected = e.target
    const correct = selected.dataset.correct
    /* will take in the body of the document passed in and check for a parameter (correct) */
    setStatus(document.body, correct)
    /* Conver to array for use with forEach */
    Array.from(answers.children).forEach(button => {
        /* Only if correct, set to correct */
        setStatus(button, button.dataset.correct)
    })
    if (shuffled.length > current_idx + 1){
        nextBtn.classList.remove('hide')
    }
    else
    {
        startBtn.innerText = 'Restart'
        startBtn.classList.remove('hide')
    }
}

function setStatus(element, correct){
    clearStatus(element)
    if (correct){
        element.classList.add('correct')
    }
    else
    {
        element.classList.add('wrong')
    }
}

function clearStatus(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

function reset(){
    clearStatus(document.body)
    /* rehide next-button after answer selected */
    nextBtn.classList.add('hide')
    while (answers.firstChild){
        answers.removeChild(answers.firstChild)
    }
}