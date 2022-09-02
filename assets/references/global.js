function titleColorLoop() {
    document.getElementsByClassName("top_title")[0].style.color = "#" + Math.round(Math.random()*1000000);
    document.getElementsByClassName("top_details")[0].style.color = "#" + Math.round(Math.random()*1000000);
    setTimeout(titleColorLoop, 300);
  }
  
  function difference_in_date() {
    var curr_date = new Date();
    var target_date = new Date(2023, 5, 20, 0, 0, 0); // y m d h m s
    var diff = target_date - curr_date;
    document.getElementById("countdown").innerHTML = Math.floor(diff / (1000 * 60 * 60 * 24)) + " days, " + Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + " hours, " + Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)) + " minutes, " + Math.floor((diff % (1000 * 60)) / (1000)) + " seconds until I graduate!";
    document.getElementById("countdown").style.color = "#" + Math.round(Math.random()*1000000);
    setTimeout(difference_in_date, 1000);
  }
  
  var mode = "light";
  
  function LDmodebtn() {
    if (mode == "light") {
      mode = "black";
      document.body.style.backgroundColor = "black";
      document.getElementById("form").style.backgroundColor = "darkred";
      document.getElementById("table").style.color = "lightblue";
      document.getElementById("table").style.backgroundColor = "darkred";
    } else {
      mode = "light";
      document.body.style.backgroundColor = "white";
      document.getElementById("form").style.backgroundColor = "blue";
      document.getElementById("table").style.color = "black";
      document.getElementById("table").style.backgroundColor = "white";
    }
  }