var startBtn = document.getElementById("start-btn")
var introSectionEl = document.getElementById("intro-section")

var questionSectionEl = document.getElementById("question-section")
var initialSectionEl = document.getElementById("initial-section")
var titleEl = document.getElementById('title')
var timerEl = document.getElementById('timerParagraph')
var saveButtonEl = document.getElementById('save-btn')
var highscoreSectionEl = document.getElementById('highscore-section')
var clearHistoryEl = document.getElementById('clear-btn')
var goBackEl = document.getElementById('go-back-bt')
var choicesEl = document.querySelectorAll(".choices")
var questionIndex = 0
var questionsArray = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["Strings", "Booleans", "Alerts", "Numbers"],
        answer: "Alerts"
    },
    {
        title: "q 2",
        choices: ["c1", "c2", "c3", "c4"],
        answer: "c1"
    },
    {
        title: "q 3",
        choices: ["c1", "c2", "c3", "c4"],
        answer: "c4"
    },
    {
        title: "q 4",
        choices: ["c1", "c2", "c3", "c4"],
        answer: "c2"
    },
    {
        title: "q 5",
        choices: ["c1", "c2", "c3", "c4"],
        answer: "c4"
    }
]
var resultsArray = [];

var displayTime = 0;

/*
  1. hide intro section
  2. start timer
  3. show questions
  4. data structure to store questions and choices

*/

var setIntervalId = 0;
var timeLeft = 0;

function startQuiz() {
    //  introSectionEl.classList.add("hide")
    introSectionEl.setAttribute("class", "hide")
    questionSectionEl.removeAttribute("class")
    setIntervalId = setInterval(countDown, 1000)
    showQuestions()
    timeLeft = questionsArray.length * 15
}

function countDown() {
    timerEl.textContent = "Time: "+timeLeft--
    if (timeLeft === 0) {
        clearInterval(setIntervalId)
    }
}

function showQuestions() {
    titleEl.textContent = questionsArray[questionIndex].title
    choicesEl[0].textContent = questionsArray[questionIndex].choices[0]
    choicesEl[1].textContent = questionsArray[questionIndex].choices[1]
    choicesEl[2].textContent = questionsArray[questionIndex].choices[2]
    choicesEl[3].textContent = questionsArray[questionIndex].choices[3]
}

function nextQuestion(event) {
    var currentElement = event.target
    var userChoice = event.target.innerText
    document.getElementById("answerFeedback").innerHTML = "";
    if (currentElement.matches("button")) {
        if(userChoice == questionsArray[questionIndex].answer){
            // display correct message
            document.getElementById("answerFeedback").innerHTML = "Correct!";
        } else {
            // display incorrect message
            document.getElementById("answerFeedback").innerHTML = "Wrong!";
            // subtract time from clock
            timeLeft -= 15
        }
        questionIndex++
        if(questionIndex < questionsArray.length){
            showQuestions()
        } else {
            timerEl.setAttribute("class", "hide")
            questionSectionEl.setAttribute("class", "hide")
            initialSectionEl.removeAttribute("class")
            displayTime = timeLeft
            document.getElementById("score").innerHTML = ""+displayTime;
        }
    }
}

function createNode(s, parent){
    return feedbackText = document.createTextNode(s);
}

// https://stackoverflow.com/questions/3450593/how-do-i-clear-the-content-of-a-div-using-javascript
function clearBox(elementID)
{
    document.getElementById(elementID).innerHTML = "";
}

function saveResult(){
    var value = document.getElementById('initial-input').value
    document.getElementById('initial-input').value = ""
    resultsArray.push({initials: value, result: displayTime})
    initialSectionEl.setAttribute("class", "hide")
    highscoreSectionEl.removeAttribute("class")
    document.getElementById("answerFeedback").innerHTML = ""
    for(var i=0; i < resultsArray.length; i++){
        const li = document.createElement('li');
        const ol = document.querySelector("#highscore-list");
        const text = document.createTextNode(resultsArray[i].initials+": "+resultsArray[i].result);
        li.appendChild(text);
        ol.appendChild(li);
    }
}

function clearHistory(){
    resultsArray = []
    document.getElementById('highscore-list').innerHTML = ""
    document.getElementById('answerFeedback').innerHTML = ""
}

function startOver(){
    highscoreSectionEl.setAttribute("class", "hide")
    introSectionEl.removeAttribute("class")
    timerEl.removeAttribute("class")
    questionIndex = 0
    document.getElementById('highscore-list').innerHTML = ""
}

startBtn.addEventListener("click", startQuiz)

questionSectionEl.addEventListener("click", nextQuestion)

saveButtonEl.addEventListener("click", saveResult)

clearHistoryEl.addEventListener("click", clearHistory)

goBackEl.addEventListener("click", startOver)