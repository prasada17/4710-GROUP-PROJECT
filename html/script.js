

// Hides tab below the given number, unhides tab of the given number.
function switchtab(number) {
    let element = document.getElementById("tab-container" + (number-1).toString());
    let element2 = document.getElementById("t" + (number-1).toString());
    element.classList.add("hidden");
    element2.classList.remove("active");

    element = document.getElementById("tab-container" + number.toString());
    element2 = document.getElementById("t" + number.toString());
    element.classList.remove("hidden");
    element2.classList.add("active");

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
    element.innerHTML = document.getElementById("filebutton").innerHTML;
}

function contbutton() {
    let element = document.getElementById("continuebutton");
    element.classList.remove("inactive");
    element.classList.add("active");
    element.innerHTML = "<h3 id=\"test2\">Continue</h3>";
}