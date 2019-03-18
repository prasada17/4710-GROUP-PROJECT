

// Hides tab below the given number, unhides tab of the given number.
function switchtab(number) {
    for (let i = 0; i < 5; i++) {
        let element = document.getElementById("tab-container" + i.toString());
        if (number == i) {
            element.classList.remove("hidden");
        } else {
            element.classList.add("hidden");
        }
    }
}

function loading() {
    let element = document.getElementById("load");
    element.classList.remove("hidden");
}

function unload() {
    let element = document.getElementById("load");
    element.classList.add("hidden");
}

function showtable() {
    let element = document.getElementById("filedrop");
    element.innerHTML = document.getElementById("filetable").innerHTML;
}

function showdatamodtable() {
    let element = document.getElementById("datamodtablecont");
    element.innerHTML = document.getElementById("datamodtable").innerHTML;
}

function contbutton() {
    let element = document.getElementById("continuebutton");
    element.classList.remove("inactive");
    element.classList.add("active");
    element.innerHTML = "<h3 id=\"test2\">Continue</h3>";
}

function RunTests() {
    let pBarH = document.getElementById("ProgressBarHolder");
    pBarH.classList.remove("hidden");

    let pBar = document.getElementById("ProgressBar");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
        if (width >= 100) {
            clearInterval(id);
            switchtab(4)
        } else {
            width++;
            pBar.style.width = width + '%';
            pBar.innerHTML = width * 1  + '%';
        }

    }
}