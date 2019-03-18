

// Hides tab below the given number, unhides tab of the given number.
function switchtab(number) {
    let ele = document.getElementById("NavBar");
    if (number == 5){
        ele.classList.remove("noclick");
    }
    else {
        ele.classList.add("noclick");
    }

    for (let i = 0; i < 6; i++) {
        let element = document.getElementById("tab-container" + i.toString());
        let element2 = document.getElementById("t" + i.toString());
        if (number == i) {
            element.classList.remove("hidden");
            element2.classList.add("active");
        } else {
            element.classList.add("hidden");
            element2.classList.remove("active");
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

function contbutton(number) {
    let element = document.getElementById("continuebutton" + number.toString());
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