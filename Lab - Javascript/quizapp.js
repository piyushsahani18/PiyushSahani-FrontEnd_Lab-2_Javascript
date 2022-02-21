function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionNumber = 0;
}

var questions = [
    new Question("Javascript Supports ", ["FUNCTIONS", "XHTML","CSS", "HTML"], "FUNCTIONS"),
    new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery","Django", "NodeJS"], "Django"),
    new Question("Which is used for Connect To Database?", ["PHP", "HTML", "JS", "All"], "PHP"),
    new Question("Which Framework is not  java framework?", ["Spring", "Hibernate", "Angular", "J2EE"], "Angular")
];

Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionNumber];
}

Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().answer_correct(answer)) {
        this.score++;
    }

    this.questionNumber++;
}

Quiz.prototype.quizEnd = function() {
    return this.questionNumber === this.questions.length;
}


function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.answer_correct = function(choice) {
    return this.answer === choice;
}

function populate() {
    if(quiz.quizEnd()) {
        yourScore();
    }
    else {

        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;


        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};

function showProgress() {
    var currentQuestionNumber = quiz.questionNumber + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function yourScore() {
    var FinalScore = "<h1>Your quiz Score is :!</h1>";
    FinalScore += "<h2>Your score is " + quiz.score + "/5 </h2>";
    FinalScore += "<h2>Score in Percentage :-  " + ((quiz.score / quiz.questions.length ) * 100) + "%</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = FinalScore;
};

var quiz = new Quiz(questions);
populate();