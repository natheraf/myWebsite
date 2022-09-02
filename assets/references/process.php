<?php
$name = $_POST['nameIn']; // name attribute 
$age = $_POST['ageIn'];
$gender = $_POST['genderIn'];
$education = $_POST['educationIn'];
$classes = $_POST['classIn'];
$classesString = "";

echo "<h3>Hello $name! You are $age years old. Your gender is selected as $gender. You have a $education degree. You have taken the following classes:";
// for ($i = 0; $i < count($classes); $i++) {
//     echo " ".$classes[$i];
// }

foreach ($classes as $class) {
    $classesString .= " ".$class;
    echo " ".$class;
}
echo ".</h3><br><br>";

// host_name, user_name, password, database_name
$conn = mysqli_connect("localhost", "root", "root", "user_data");
// sql statement
$sql = "insert into user_data (`user_name`, `age`, `gender`, `education`, `classes`) values ('$name', '$age', '$gender', '$education', '$classesString')";
// execute sql statement
$res = mysqli_query($conn, $sql);

if ($res) {
    echo "Successfully inserted data into database";
} else {
    echo "Error: ".mysqli_error($conn);
}

echo "<br><h4>v0.1</h4>";
?>