<?php
$userEmail = trim($_POST['userEmail']);
$userPassword = $_POST['userPassword'];
date_default_timezone_set('America/New_York');
$last_login = date("Y-m-d H:i:s");

$conn = mysqli_connect("localhost", "root", "x2Wt*XjvaW9fp9b&", "user_data");
$sql = "select * from login_info where `email` = '$userEmail'";
$res = $conn -> query($sql);

while($row = mysqli_fetch_assoc($res)) {
    $checkPwd = password_verify($userPassword, $row['password']);
}

if ($res -> num_rows > 0 && $checkPwd) {
    $sql = "update login_info set `last_login` = '$last_login' where `email` = '$userEmail'";
    $res = $conn -> query($sql);
    echo "<h1>Successfully logged in";
} else {
    echo "<h1>Invalid email or password. Please try again";
    header("location: ../pages/loginPage.html".'?'.'status=loginFail');
}
?>