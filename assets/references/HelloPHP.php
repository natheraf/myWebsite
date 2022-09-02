<!DOCTYPE html>
<html>
	<head>
		<title>Hello PHP!</title>
	</head>

	<body>
		<?php
			echo "<h1>hello PHP!!!</h1>";
		?>
		<form action="process.php" method="POST">
			<label for="name">Name: </label><br>
			<input type="text" name="nameIn" id="name"><br><br>

			<label for="age">Age: </label><br>
			<input type="text" name="ageIn" id="age"><br><br>

			<label for="gender">Gender: </label><br>
			<label for="malerb"><input id="malerb" type="radio" name="genderIn" value="male">Male</label><br>
			<label for="femalerb"><input id="femalerb" type="radio" name="genderIn" value="female">Female</label><br>
			<label for="otherrb"><input id="otherrb" type="radio" name="genderIn" value="other">Other</label><br><br>

			<label for="dropdown_education">Education</label>
			<select name="educationIn">
				<option value="highschool">High School</option>
				<option value="college">College</option>
				<option value="masters">Masters</option>
				<option value="phd">PhD</option>
			</select><br><br>

			<label for="class">Class:     </label>
			<label for="class3115"><input type="checkbox" name="classIn[]" id="class3115" value="3115">3115</label>
			<label for="class3140"><input type="checkbox" name="classIn[]" id="class3140" value="3116">3140</label>
			<label for="class3310"><input type="checkbox" name="classIn[]" id="class3310" value="3117">3310</label>
			<label for="class3130"><input type="checkbox" name="classIn[]" id="class3130" value="3118">3130</label><br><br>

			<input type="submit" value="Submit" />
			<input type="reset" value="Reset" />
		</form>
	</body>

</html>