//TEST
var upper = 0;
var lower = 0;
var testField ="";
function previewcsv() {
    window.location = "/upload2"
}
// Hides tab below the given number, unhides tab of the given number.
function switchtab(number) {
    let ele = document.getElementById("NavBar");
    if (number == 5){
        ele.classList.remove("noclick");
    }

    for (let i = 0; i < 5; i++) {
        let element = document.getElementById("t" + i.toString());
        if (number == i) {
            element.classList.add("active");
        } else {
            element.classList.remove("active");
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

function movepage(page) {
    window.location.replace("/" + page);
}

function datecolupdate() {

    let $available = $('#colnames');
    let $datetimecol = $('#datetimecol');
    $datetimecol.empty();
    $datetimecol.append($available.children().clone());

}

function movetocoldata() {
    var $colnames = $('#colnames');
    var $coldata = $('#coldata');
    var selectedItems = $colnames.val() || [];

    for (var i = 0; i < selectedItems.length; i++) {
        var item = "<option value=\"" + selectedItems[i] + "\">" + selectedItems[i] + "</option>";
        $coldata.append(item);
        $colnames.find('[value="' + selectedItems[i] + '"]').remove();
    }

    datecolupdate();
}

function movetocolname() {
    var $colnames = $('#colnames');
    var $coldata = $('#coldata');
    var selectedItems = $coldata.val() || [];

    for (var i = 0; i < selectedItems.length; i++) {
        var item = "<option value=\"" + selectedItems[i] + "\">" + selectedItems[i] + "</option>";
        $colnames.append(item);
        $coldata.find('[value="' + selectedItems[i] + '"]').remove();
    }

    datecolupdate();
}

function checkdata() {
    var $coldata = $('#coldata').children();
    for (var i = 0; i < $coldata.length; i++) {
        $("#logo").load('api/datacol/' + $coldata[i].innerHTML);
    }
    var $datecol = $('#datetimecol').val() || [];
    movepage('api/date/' + $datecol[0]);
    contbutton(1);
}

function updateDataFieldInfo() {
    let $fields = $('#configdata').val() || [];
    let $field = $fields[0];
    $('#exampleModalLabel').text($field);
    let $metainfo = $('#datafield');
    $metainfo.empty();
    let text = "";
    text += newli('Name: ' + $fields[0]);
    text += newli('Units: Undefined');
    text += newli('Data Type: Undefined');
    text += newli('Time Interval: Undefined');
    text += newli('Time Zone: Undefined');
    $metainfo.html(text);
}

function modDataFieldInfo() {
    let $fields = $('#configdata').val() || [];
    let $field = $fields[0];
    let $metainfo = $('#datafield');
    $metainfo.empty();
    let text = "";
    text += newli('Name: ' + $fields[0]);
    text += newli('Units: ' + $('#unitsInput').val());
    text += newli('Data Type: ' + $('#typeInput').val());
    text += newli('Time Interval: ' + $('#timeInput').val());
    text += newli('Time Zone: ' + $('#zoneInput').val());
    $metainfo.html(text);
}

function newli(string) {
    let text = '<li class="list-group-item">' + string + '</li>';
    return text;
}

function SetThresh() {
    var $test = $('#TestSelector');
    var num = $test.children().length;
    num++;

    var $coldata = $('#configdata');
    var selectedItems = $coldata.val() || [];
    alert(selectedItems[0]);
    testField = selectedItems[0];
    lower = $('#LowThresh').val();
    upper = $('#UpThresh').val();

    var item = "<option value=\"Test" + num + "\">Test " + num + " " + testField + "</option>";
    $test.append(item);
}

function threshSelect() {
    $('#selectedTest').html('THRESHHOLD TEST SELECTED');
    document.getElementById("thresh").classList.remove("hidden");
}