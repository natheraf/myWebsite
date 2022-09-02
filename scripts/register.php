<?php
$userEmail = trim($_POST['userEmail']);
$userPassword = $_POST['userPassword'];
$userCPassword = $_POST['userCPassword'];
date_default_timezone_set('America/New_York');
$date_created = date("Y-m-d H:i:s");

// check duplicate email
$conn = mysqli_connect("localhost", "root", "x2Wt*XjvaW9fp9b&", "user_data");
$sql = "select * from login_info where `email` = '$userEmail'";
$res = $conn -> query($sql);

// if duplicate email
if ($res -> num_rows > 0) {
    header("Location: ../pages/register.html".'?'.'status=dupEmail');
} else { // no duplicate? insert account to database
    if (strlen($userPassword) >= 3 && $userPassword == $userCPassword) {
        $userPassword = password_hash($userPassword, PASSWORD_DEFAULT);
        $sql = "insert into login_info (`id`, `email`, `password`, `last_login`, `date_created`) values (NULL,'$userEmail', '$userPassword', '$date_created', '$date_created')";
        $res = mysqli_query($conn, $sql);
    
        if ($res) {
            echo "<h1>Successful: Account Created";
        } else {
            echo "<h1>Error: ".mysqli_error($conn);
        }
    } else {
        echo "<h1>Passwords do not match or too short";
    }
}
?>