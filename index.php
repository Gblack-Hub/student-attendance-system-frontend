<?php session_start();

	require '../student-attendance-system-api/connect.php';
	require '../student-attendance-system-api/handler.php';
	$connect = connect();

	if(loggedIn()){
		$email = $_SESSION['email'];
		#echo $cookieEmail = $_COOKIE['cookieEmail'];

		$query = mysqli_query($connect, "SELECT first_name, last_name, position FROM admin_tb JOIN admin_position_tb USING (id) WHERE email = '$email'");
		$result = mysqli_fetch_assoc($query);

		$firstname = $result['first_name'];
		$lastname =  $result['last_name'];
		$position =  $result['position'];
?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Student Attendance System</title>
	<link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="./styles/myStyle.css">
	<!-- <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"> -->
	<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.1.0/css/all.css">
	<!-- <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"> -->
	<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">
	<script rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.js"></script>
	<!-- <base href="/Student-Attendance-System!" /> -->
</head>
<body ng-app="myApp" class="bg-light">
	<!-- side view -->
	<div id="mySidenav" class="sidenav">
		<a href="" class="closebtn" onclick="closeNav()">&times;</a>
		<div class="text-center"><a href="#!dashboard" class="navbar-brand text-white text-uppercase"><strong>G'Admin</strong></a></div>

		<hr width="80%" class="bg-light" />
		<div class="text-center">
			<img src="./images/img_avatar3.png" class="rounded-circle mb-2" style="height: 70px; width: 70px;" />
			<div class="text-white"><?php echo $firstname ." ".$lastname; ?></div>
			<div class="text-light font-italic"><small><?php echo "(".$position.")"; ?></small></div>
		</div>
		<hr width="80%" class="bg-light" />

		<div><a href="#!dashboard" class="nav-link"><span class="mr-2"><i class="fa fa-home"></i></span>Dashboard</a></div>
		<div><a href="#!staffs" class="nav-link"><span class="mr-2"><i class="fa fa-user"></i></span>Admin & Staffs</a></div>
		<div><a href="#!courses" class="nav-link"><span class="mr-2"><i class="fa fa-list"></i></span>Courses & Lecturers</a></div>
		<div><a href="#!students" class="nav-link"><span class="mr-2"><i class="fa fa-users"></i></span>Students</a></div>
		<div><a href="#!attendance" class="nav-link"><span class="mr-2"><i class="fa fa-check-square"></i></span>Attendance</a></div>
		<div><a href="#!viewattendance" class="nav-link"><span class="mr-2"><i class="fa fa-book"></i></span>View Attendance</a></div>
		<!-- <div><a href="#!timetable" class="nav-link"><span class="mr-2"><i class="fa fa-table"></i></span>Timetable</a></div> -->
		<!-- <div>
			<a href="#!notifications" class="nav-link"><span class="mr-2"><i class="fa fa-bell"></i></span>Notifications
				<span class="badge badge-danger"></span>
			</a>
		</div> -->
		<div><a href="../api-angular/logout.php" class="nav-link"><span class="mr-2"><i class="fa fa-power-off"></i></span>Logout</a></div>
	</div>
	<span class="cursor-pointer open-bar text-white px-2 py-1 bg-secondary" onclick="openNav()">
		<span><i class="fa fa-bars"></i></span>
	</span>
	<!-- main view -->
	<div id="main">
		<ng-view></ng-view>
	</div>

	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.js"></script>
	<script type="text/javascript" src="https://unpkg.com/@popperjs/core@2"></script>
	<script type="text/javascript" src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.8.2/angular.js"></script>
	<!-- <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular-route.js"></script> -->
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/angular-route/1.7.0/angular-route.js"></script>

	<script type="text/javascript" src="./scripts/myScript.js"></script>
	<script type="text/javascript" src="./scripts/myJScript.js"></script>
</body>
</html>
<?php
}
else {
	$_SESSION['loginMsg'] = "Please Login first";
	header("Location: homepage.php");
}
?>