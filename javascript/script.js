
$("#submit").hover(function () {
    $("#submit").css("background-color", "green")
});
$("document").ready(function () {
    $(".question").hide();
    $(".start").show();
    $(".result").hide();
})
$(".start").on("click", function () {
    $(".start").hide();
    $(".question").show();
    $(".result").hide();

    generateQuiz();
    run();
});
function generateQuiz() {
    for (var i = 0; i < 12; i++) {
        var a = randomNum();
        var b = randomNum();
        var operation = randomOP();
        var d;
        if (i <= 3) {
            d = 1
            questionGen(a, b, operation, d, i)
        }
        else if (i > 3 && i <= 7) {
            d = 2
            questionGen(a, b, operation, d, i)
        }
        else if (i > 7 && i <= 12) {
            d = 3
            questionGen(a, b, operation, d, i)
        }

    }
}
function solutionFinder(a, b, c) {
    if (c == "+")
        return (a + b)
    if (c == "-")
        return (a - b)
    if (c == "*")
        return (a * b)
}
function generateButton(x, a, b, c, i) {
    var queGroup = "que" + i
    if (x == solutionFinder(a, b, c)) {
        var btn = $("<input type='radio' value='true'/>")
        btn.attr("name", queGroup)
        return btn
    }
    else {
        var btn = $("<input type='radio' value='false'/>")
        btn.attr("name", queGroup)
        return btn
    }
}
function ensureNoRpt(x) {
    for (var i = 1; i < x.length; i++) {
        if (i == 1) {
            if (x[i] == x[i - 1] || x[i] == x[i + 1] || x[i] == x[i + 2])
                x[i] += questionVary()

        }
        if (i == 2) {
            if (x[i] == x[i - 2] || x[i] == x[i - 1] || x[i] == x[i + 1])
                x[i] += questionVary()

        }
        if (i == 3) {
            if (x[i] == x[i - 3] || x[i] == x[i - 2] || x[i] == x[i - 1])
                x[i] += questionVary()

        }
    }
    return x;
}
function randomNum() {
    return Math.floor(Math.random() * 31)
}
function randomOP() {
    var operation = Math.floor(Math.random() * 3);
    switch (operation) {
        case 0:
            return "+"
        case 1:
            return "-"
        case 2:
            return "*"
    }
}
function questionVary() {
    return Math.floor(Math.random() * 10)
}
function questionGen(a, b, operation, d, i) {
    var queDiv = $("<div>")
    queDiv.html("<strong>" + (i + 1) + ")  " + a + " " + operation + " " + b + "</strong><br>")
    $("#quiz" + d).append(queDiv)
    var soln = solutionFinder(a, b, operation);
    var possibleAnswers = [soln, solutionFinder(a + questionVary(), b + questionVary(), operation), solutionFinder(a - questionVary(), b + questionVary(), operation), solutionFinder(a + questionVary(), b - questionVary(), operation)]
    possibleAnswers = ensureNoRpt(possibleAnswers)
    possibleAnswers = shuffle(possibleAnswers)
    for (var j = 0; j < possibleAnswers.length; j++) {

        var btn = $("<div>")

        btn.html(generateButton(possibleAnswers[j], a, b, operation, i))
        $("#quiz" + d).append(possibleAnswers[j])
        $("#quiz" + d).append(btn)


    }
}
function gradeQuiz() {
    var unanswered = 0;
    var correct = 0;
    var wrong = 0;
    for (var i = 0; i < 12; i++) {
        var btnValue = $("input[name=que" + i + "]:checked").attr("value");
        if (btnValue == "true") {
            correct++;
            //unanswered--;
        }
        else if (btnValue == "false") {
            wrong++;
            //unanswered--;

        }
        else {
            (alert(i))
            unanswered++
        }
    }
    alert("correct " + correct)
    alert("incorrect " + wrong)
    alert("unanswered " + unanswered)
    $("#correct").html("<h3>" + correct + "</h3>")
    $("#incorrect").html("<h3>" + wrong + "</h3>")
    $("#unanswered").html("<h3>" + unanswered + "</h3>")
}
var number = 30;
var intervalID;
$("#timer").html("<h3>" + number + "</h3>");
function run(number) {

    intervalId = setInterval(decrement, 1000);
}
function decrement() {

    number--;
    $("#timer").html("<h3>" + number + "</h3>");
    if (number === 0) {
        stop();
        alert("Time Up!");
    }
}
function stop() {

    clearInterval(intervalId);
    $(".start").hide()
    $(".question").hide()
    $(".result").show()
    gradeQuiz()
}
function submit() {
    stop()
}
function shuffle(x) {
    var temp;
    var random;
    for (var i = 0; i < x.length; i++) {
        random = Math.floor(Math.random() * x.length)
        temp = x[i]
        x[i] = x[random]
        x[random] = temp
    }
    return x
}
