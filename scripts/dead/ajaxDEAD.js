function ajax_download_info() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("output").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "../../files/ytdownloads/output.txt", true);
    xhttp.send();
}

function send_download() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("output").innerHTML = this.responseText;
      }
    };
    xmlhttp.open("POST", "/cmdphp.php", true);
    xmlhttp.send();
}
