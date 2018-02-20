const minuteToMilli = (minutes) => minutes * 60000;
let sessionTimer, breakTimer;
let sessionTime = minuteToMilli(5);
let breakTime = minuteToMilli(5);
let curMode = "Session";

function incrementTime(type) {
    if(type == "break") {
        let time = Number($("#breakLength").text());
        if(time < 60) {
            $("#breakLength").text(time + 1);   
            if(curMode == "Break") {
                update(minuteToMilli(time + 1));
            }
            breakTime = minuteToMilli(time + 1);
        }
    }   
    else {
        let time = Number($("#sessionLength").text());
        if(time < 60) {
            $("#sessionLength").text(time + 1);   
            if(curMode == "Session") {
                update(minuteToMilli(time + 1));
            }
            sessionTime = minuteToMilli(time + 1);
        }
    }
}

function decrementTime(type) {
    if(type == "break") {
        let time = Number($("#breakLength").text());
        if(time > 1) {
            $("#breakLength").text(time - 1);   
            if(curMode == "Break") {
                update(minuteToMilli(time - 1));
            }
            breakTime = minuteToMilli(time - 1);
        }
    }
    else {
        let time = Number($("#sessionLength").text());
        if(time > 1) {
            $("#sessionLength").text(time - 1);   
            if(curMode == "Session") {
                update(minuteToMilli(time - 1));
            }
            sessionTime = minuteToMilli(time - 1);
        }
    }
}

function resetTime() {
    $("#breakLength, #sessionLength").text(5);
    update(minuteToMilli(5));
}

// time in milliseconds
function getRemainingTime(time) {
    return {
    	minutes: (time / 1000 / 60) % 60 != 0 ? Math.floor((time / 1000 / 60) % 60) : 60,
    	seconds: Math.floor((time / 1000) % 60)
    };
}

function startTimer() {
    $("#startBtn").addClass("hide");
    $("#pauseBtn").removeClass("hide");
    $("#resetBtn, #breakDiv > div > a, #sessionDiv > div > a").addClass("disabled");
    if(curMode == "Session") {
        $("#status").text("Session");
        sessionTimer = setInterval(countDownSession, 1000);
    }
    else {
        $("#status").text("Break");
        breakTimer = setInterval(countDownBreak, 1000);
    }
}

function pauseTimer() {
    $("#pauseBtn").addClass("hide");
    $("#startBtn").removeClass("hide");
    $("#resetBtn, #breakDiv > div > a, #sessionDiv > div > a").removeClass("disabled");
    $("#status").text("Paused");
    if(curMode == "Session") {
        clearInterval(sessionTimer);   
    }
    else {
        clearInterval(breakTimer);   
    }
}

function countDownSession() {
    $("#status").text("Session");
    update(sessionTime);
    sessionTime -= 1000;

    if(sessionTime <= 0) {
        curMode = "Break";
        sessionTime = minuteToMilli(Number($("#sessionLength").text()));
        clearInterval(sessionTimer);
        breakTimer = setInterval(countDownBreak, 1000);

        return;
    }
}

function countDownBreak() {
    $("#status").text("Break");
    update(breakTime);
    breakTime -= 1000;
    if(breakTime <= 0) {
        curMode = "Session";
        breakTime = minuteToMilli(Number($("#breakLength").text()));
        clearInterval(breakTimer);
        sessionTimer = setInterval(countDownSession, 1000);

        return;
    }
}

function update(time) {
    let t = getRemainingTime(time);
    $("#minuteDisplay").text(('0' + t.minutes).slice(-2));
    $("#secondDisplay").text(('0' + t.seconds).slice(-2));   
}