var tabbedOut = false;

function onload() {
    addEventListener();
    updateChat();
}

// https://stackoverflow.com/questions/18169933/submit-form-without-reloading-page
// interesting alternative but not what I'm looking for: https://stackoverflow.com/questions/2866063/submit-form-without-page-reloading
function submitChat() {
    if (document.getElementById('username').value != '' && document.getElementById('input_text').value != '') {
        var http = new XMLHttpRequest();
        http.open("POST", "../scripts/livechat.php", true);
        http.setRequestHeader("Content-type","application/x-www-form-urlencoded"); // allows params to be passed to php
        var params = 'name=' + document.getElementById("username").value + '&input=' + document.getElementById("input_text").value;
        document.getElementById("input_text").value = '';
        http.send(params);
        // http.onload = function() {
        //     alert(http.responseText);
        // }
    } else {
        document.getElementById('username').placeholder = 'required';
        document.getElementById('input_text').placeholder = 'required';
        window.alert('Name and Text cannot be blank');
    }
}

var chatlog = '';
var newlog = '';
function updateChat() {
    if (!tabbedOut) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) { 
                newlog = this.responseText;
                console.log(chatlog != newlog);
                if (chatlog != newlog) {
                    chatlog = newlog;
                    document.getElementById('chat').innerHTML = this.responseText;
                    document.getElementById('chat').scrollTo(0, document.getElementById('chat').scrollHeight) // scrolls to bottom, source: https://stackoverflow.com/questions/11715646/scroll-automatically-to-the-bottom-of-the-page
                }
            }
        };
        xhttp.open("GET", "../files/livechat/livechat.txt", true);
        xhttp.send();
    }
    setTimeout(updateChat, 500);
}

function chatResetPassword() {
    let password = prompt('Chat Reset Password');
    return password == 'cisc3667gamedev' || password == '11214' || password == 'momoty11214';
}

function addEventListener() { // allows user to submit input text with the 'enter' key
    // Execute a function when the user presses a key on the keyboard
    document.getElementById('input_text').addEventListener("keypress", function(event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("submit_button").click();
        }
    });

    // https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp
}

// checks if tabbed out
document.addEventListener('visibilitychange', function (event) {
    if (document.hidden) {
        tabbedOut = true;
    } else {
        tabbedOut = false;
    }
});
