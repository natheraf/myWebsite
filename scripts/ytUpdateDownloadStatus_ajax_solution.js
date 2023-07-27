var entireOutput = ""; // tracks entire output from previous loop
var outputLoop = ""; // takes entire output from current loop
var outputBuffer = ""; // holds the difference between the current output and the previous output

function on_download_page_load() {
    // showDownloadForm(); #change1
    ajax_download_info();
    check_if_status();
    check_if_busy()
}

function download_start() {
    hideDownloadForm();
    document.getElementById("status").innerHTML = "Downloading...";
    document.getElementById("output").style.overflowY = "scroll";
    document.getElementById("output").style.visibility = "visible";
    document.getElementById("output").style.minHeight = "60vh";
}

function ajax_download_info() {
    if (document.getElementById("status").innerHTML == "Downloading...") {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                outputBuffer = ""; // sets outputBuffer to empty string
                outputLoop = this.responseText; // sets outputLoop to the current iteration's output
                if (outputLoop != entireOutput) { // if current iteration is different from previous iteration
                    outputBuffer = outputLoop.replace(entireOutput, ""); // sets outputBuffer to the difference between the current and previous iterations
                    entireOutput = outputLoop; // sets entireOutput to the current iteration's output
                }
                if (outputBuffer != "") { // if outputBuffer is not empty (if there is a change in the output)
                    document.getElementById("output").innerHTML = outputBuffer + '<br>' + document.getElementById("output").innerHTML;
                    document.getElementById("output").scrollTo(top);
                }
            }
        };
        xhttp.open("GET", "../files/ytdownloads/stream.txt", true);
        xhttp.send();
    }
    setTimeout(ajax_download_info, 200);
}

function hideDownloadForm() {
    document.getElementById("download_form").style.visibility = 'hidden';
    document.getElementById("download_form").style.height = '0px';
    document.getElementById("helpDiv").style.visibility = 'hidden';
    document.getElementById("helpDiv").style.height = '0px';
}

function showDownloadForm() {
    document.getElementById("download_form").style.visibility = 'visible';
    document.getElementById("download_form").style.height = 'auto';
}

function toggleMultithreadSettings() {
    if (document.getElementById("multithreaded").checked) {
        document.getElementById("multithreadedArgs").style.visibility = 'visible';
        document.getElementById("multithreadedArgs").style.height = 'auto';
    } else {
        document.getElementById("showExplanation").checked = false;
        document.getElementById("multithreadedArgs").style.visibility = 'hidden';
        document.getElementById("multithreadedArgs").style.height = '0';
        toggleMTArgExplanation();
    }
}

function toggleMTArgExplanation() {
    if (document.getElementById("showExplanation").checked) {
        document.getElementById("mTArgumentExplanation").style.visibility = 'visible';
        document.getElementById("mTArgumentExplanation").style.height = 'auto';
    } else {
        document.getElementById("mTArgumentExplanation").style.visibility = 'hidden';
        document.getElementById("mTArgumentExplanation").style.height = '0';
    }
}

function toggleShowHelp() {
    if (document.getElementById("showHelp").checked) {
        document.getElementById("helpDiv").style.visibility = 'visible';
        document.getElementById("helpDiv").style.height = 'auto';
    } else {
        document.getElementById("helpDiv").style.visibility = 'hidden';
        document.getElementById("helpDiv").style.height = '0';
    }
}

function onDownloadCompletePageLoad() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var filename = this.responseText.replace(/^.*[\\\/]/, '');
            document.getElementById("download_link").href += filename;
        }
    };
    xhttp.open("GET", "../files/ytdownloads/filename.txt", true);
    xhttp.send();
}

function check_if_status() {
    const queryString = window.location.search; // returns everything after ?
    const urlParams = new URLSearchParams(queryString);
    const status = urlParams.get('status');
    if (status == 'formatted') {
        document.getElementById("format_out").innerHTML = '<a href="../files/ytdownloads/formatOut.txt" target="_blank">Link to Format</a>';
    }
    if (status == 'notIdel') {
        document.getElementById("warning").innerHTML = 'Please wait until status is IDLE';
    }
}

function check_if_busy() { // true if not busy
    var xhttp = new XMLHttpRequest();
    xhttp.onload = function() { // check if status.txt file is not found
        if (this.status == 404) {
            document.getElementById("status").innerHTML = "Status on load: UNKNOWN";
            return false;
        }
    }
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText == 'busy') {
                document.getElementById("status").innerHTML = "Status on load: BUSY";
                return false;
            } else if (this.responseText == 'idle') {
                document.getElementById("status").innerHTML = "Status on load: IDLE";
                return true;
            } else {
                document.getElementById("status").innerHTML = "Status on load: UNKNOWN";
                return false;
            }
        }
    };
    xhttp.open("GET", "../files/ytdownloads/status.txt", true);
    xhttp.send();
}
