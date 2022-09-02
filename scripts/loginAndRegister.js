function checkRegisterInfo() {
    // var for checking if str is needed to be checked
    var strPwdCheckBox = document.getElementById("strPwdCheckBox").checked;

    // check email
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById("loginEmailText").value)) {
        document.getElementById("emailLabel").innerHTML = 'Email';
        var emailTest = true;
    } else {
        document.getElementById("emailLabel").innerHTML = 'Email <span id="emailWarn">(Incorrect Email Format)</span>';
        document.getElementById("emailWarn").style.color = 'red';
        var emailTest = false;
    }

    // password requirement regex
    if (strPwdCheckBox && !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,100}$/.test(document.getElementById("loginPwdText").value)) {
        document.getElementById("pwdLabel").innerHTML = 'Password <span id="pwdWarn">(6-100 characters, at least 1 number and 1 special character)<span>';
        document.getElementById("pwdWarn").style.color = 'red';
        var pwdStrTest = false;
    } else {
        if (document.getElementById("loginPwdText").value.length > 3) {
            document.getElementById("pwdLabel").innerHTML = 'Password';
            var pwdStrTest = true;
        } else {
            document.getElementById("pwdLabel").innerHTML = 'Password <span id="pwdWarn">(3+ characters)<span>';
            document.getElementById("pwdWarn").style.color = 'red';
            var pwdStrTest = false;
        }
    }

    //check password match
    if (document.getElementById("loginPwdText").value == document.getElementById("loginCPwdText").value) {
        document.getElementById("cPwdLabel").innerHTML = 'Confirm Password';
        var pwdMatch = true;
    } else {
        document.getElementById("cPwdLabel").innerHTML = 'Confirm Password <span id="cPwdWarn">(Passwords do not match)</span>';
        document.getElementById("cPwdWarn").style.color = 'red';
        var pwdMatch = false;
    }

    return emailTest && pwdStrTest && pwdMatch;
}

function strPwdCheckBoxChange() {
    var strPwdCheckBox = document.getElementById("strPwdCheckBox").checked;
    if (strPwdCheckBox) {
        document.getElementById("loginPwdText").placeholder = "6+ characters, 1+ number and 1+ special";
    } else {
        document.getElementById("loginPwdText").placeholder = "3+ characters";
    }
}

function setBanner(id, string) {
    document.getElementById(id).innerHTML = "<h4>" + string + "</h4>";
    document.getElementById(id).style.margin = '-8px';
}

function delayDelFailBanner() {
    setTimeout(function() {document.getElementById("loginFailed").remove()},5000);
}

function registerPageOnLoad() {
    checkStatus();
}

function loginPageOnLoad() {
    checkStatus();
    delayDelFailBanner();
}

function checkStatus() {
    const queryString = window.location.search; // returns everything after ?
    const urlParams = new URLSearchParams(queryString);
    const status = urlParams.get('status');
    if (status == 'dupEmail') {
        labelError('email', 'Duplicate Email');
    }
    if (status == 'loginFail') {
        setBanner('loginFailed', 'Incorrect Email or Password');
    }
}
// https://jamesbachini.com/passing-url-parameters-get-variables-on-a-php-redirect/
// https://www.sitepoint.com/get-url-parameters-with-javascript/

function labelError(type, errorMsg) { // type = email, pwd, cPwd
    document.getElementById(type + "Label").innerHTML += ' <span id="emailWarn">(' + errorMsg + ')</span>';
    document.getElementById(type + "Warn").style.color = 'red';
    return false;
}