var a = angular.module("myApp", ["ngRoute"])

a.config(function($routeProvider, $locationProvider){
	// new WOW().init();

    // $locationProvider.html5Mode(true).hashPrefix("!");
	$routeProvider
	.when("/",{
		templateUrl : "dashpage.htm"
	})
	.when("/dashboard",{
		templateUrl : 'dashpage.htm',
		controller : 'dashControl'
	})
	.when("/attendance",{
		templateUrl : "attendancepage.htm",
		controller : 'attControl'
	})
	.when("/staffs",{
		templateUrl : "staffpage.htm",
		controller : 'staffControl'
	})
	.when("/students",{
		templateUrl : "studentpage.htm",
		controller : 'studentControl'
	})
	.when("/courses",{
		templateUrl : "coursepage.htm",
		controller : 'courseControl'
	})
	.when("/viewattendance",{
		templateUrl : "viewattendancepage.htm",
		controller : 'viewAttControl'
	})
	.when("/messages",{
		templateUrl : "messages.htm",
		controller : 'messagesControl'
	})
	.when("/timetable",{
		templateUrl : "timetablepage.htm",
		controller : 'timetableControl'
	})
	.when("/notifications",{
		templateUrl : "notificationpage.htm",
		controller : 'notificationControl'
	})
	.otherwise({
		redirectTo:"/dashpage"
	});
	// if(window.history && window.history.pushState){
    	// $locationProvider.html5Mode(true);
  	// }
});
//dashboard Controller
a.controller("dashControl", function($scope, $http){
	// var ctx = document.getElementById("myChart").getContext('2d');
	$scope.staffList;
	$scope.studentList;
	$scope.courseList;
	$scope.notificationsList = [
		'All staffs are enjoined to present their professional cerfiticates',
		'Second Semester Examinations starts on 03/06/2018'
	]

	$scope.getStaffs = () => {
		$http({
			method: 'GET',
			url: '../student-attendance-system-api/getstaffs.php',
		}).then(function (response) {
			$scope.staffList = response.data;
		}, function (response) {
			console.log('Server Error');
			// console.log(response.data, response.status);
		});
	};
	$scope.getStaffs();

	$scope.getStudents = () => {
		$http({
			method: 'GET',
			url: '../student-attendance-system-api/getstudents.php',
		}).then(function (response) {
			$scope.studentList = response.data;
		}, function (response) {
			console.log('Server Error');
			// console.log(response.data, response.status);
		});
	}
	$scope.getStudents();

	$scope.getCourse = () => {
		$http({
			method: 'GET',
			url: '../student-attendance-system-api/getcourse.php',
		}).then(function (response) {
			$scope.courseList = response.data;
		}, function (response) {
			console.log('Server Error');
			// console.log(response.data, response.status);
		});
	};
	$scope.getCourse();
});
// staffpage controller
a.controller("staffControl", function($scope, $http){
	$scope.staffList;

	$scope.add = () => {
		$scope.staffInfo = { firstname:$scope.fname, lastname:$scope.lname, email:$scope.emailadd, gender:$scope.gender,
								position:$scope.position, password:$scope.pwd, phone:$scope.pnumber }
		$http({
			method: 'POST',
			url: '../student-attendance-system-api/staffregisteration.php',
			data: $scope.staffInfo
		}).then(function (response) {
			console.log(response.data);
			$scope.getStaffs();
		}, function (response) {
			console.log(response.data, response.status);
		});
		this.fname = '';
		this.lname = '';
		this.matno = '';
		this.department = '';
		this.pnumber = '';
    	this.emailadd = '';
	}
	$scope.getStaffs = () => {
		$http({
			method: 'GET',
			url: '../student-attendance-system-api/getstaffs.php',
		}).then(function (response) {
			// console.log(response.data);
			$scope.staffList = response.data;
		}, function (response) {
			console.log('Server Error');
			// console.log(response.data, response.status);
		});
	};
	$http({
		method: 'GET',
		url: '../student-attendance-system-api/getadminposition.php',
	}).then(function (response) {
		$scope.adminPositionList = response.data;
	}, function (response) {
		console.log('Server Error');
		// console.log(response.data, response.status);
	});
	$scope.deleteStaff = (id) => {
		$http({
			method: 'POST',
			url: '../student-attendance-system-api/deletestaff.php',
			data: { staffId : id }
		}).then(function (response) {
			$scope.getStaffs();
		}, function (response) {
			console.log('Server Error');
			// console.log(response.data, response.status);
		});
	};
	$scope.getStaffs();
});
// studentpage controller
a.controller("studentControl", function($scope, $http){
	$scope.studentList;

	$scope.add = () => {
		$scope.studentInfo = {firstname:$scope.fname, lastname:$scope.lname, matricno:$scope.matno,
								department:$scope.department, phone:$scope.pnumber, email:$scope.emailadd}
		$http({
			method: 'POST',
			url: '../student-attendance-system-api/registeration.php',
			data: $scope.studentInfo
		}).then(function (response) {
			$scope.getStudents();
			// console.log(response.data);

			$scope.resp = response.data;
		}, function (response) {
			console.log('Server Error');
			// alert("ERROR: "+response.data, response.status);
			// console.log(response.data, response.status);
		});

		// this.fname = '';
		// this.lname = '';
		// this.matno = '';
		// this.department = '';
		// this.pnumber = '';
  //   	this.emailadd = '';
	}
	$scope.getStudents = () => {
		$http({
			method: 'GET',
			url: '../student-attendance-system-api/getstudents.php',
		}).then(function (response) {
			$scope.studentList = response.data;
		}, function (response) {
			console.log('Server Error');
			// console.log(response.data, response.status);
		});
	}
	$scope.updateStudent = (id) => {
		$http({
			method: 'POST',
			url: '../student-attendance-system-api/updatestudent.php',
			data: { studentId : id }
		}).then(function (response) {
			$scope.getStudents();
		}, function (response) {
			console.log('Server Error');
			// console.log(response.data, response.status);
		});
	};
	$scope.deleteStudent = (id) => {
		$http({
			method: 'POST',
			url: '../student-attendance-system-api/deletestudent.php',
			data: { studentId : id }
		}).then(function (response) {
			$scope.getStudents();
		}, function (response) {
			console.log('Server Error');
			// console.log(response.data, response.status);
		});
	};
	$scope.getStudents();
});
//course controller
a.controller("courseControl", function($scope, $http, $timeout){
	$scope.getStaff = () => {
		$http({
			method: 'GET',
			url: '../student-attendance-system-api/getstaffs.php',
		}).then(function (response) {
			$scope.staffList = response.data;
		}, function (response) {
			console.log('Server Error');
			// console.log(response.data, response.status);
		});
	};
	$timeout(function(){
		angular.element("#getStaffBtn").triggerHandler('click');
	}, 0);

	$scope.addCourse = () => {
		$http({
			method: 'POST',
			url: '../student-attendance-system-api/postcourse.php',
			data: { title: $scope.courseTitle, detail: $scope.courseDetail, lecturer: $scope.courseLecturer }
		}).then(function (response) {
			// console.log(response.data);
			$scope.getCourse();
		}, function (response) {
			console.log('Server Error');
			// console.log(response.data, response.status);
		});
	};
	$scope.getCourse = () => {
		$http({
			method: 'GET',
			url: '../student-attendance-system-api/getcourse.php',
		}).then(function (response) {
			// console.log(response.data);
			$scope.courseList = response.data;
		}, function (response) {
			console.log('Server Error');
			// console.log(response.data, response.status);
		});
	};
	$timeout(function(){
		angular.element("#getCourse").triggerHandler('click');
	}, 0);

});
//attendancepage controller
a.controller("attControl",function($scope, $http, $timeout, $routeParams){
	$scope.myDate = new Date();

	$timeout(function(){
		angular.element("#getCourse").triggerHandler('click');
	}, 0);

	$scope.getCourse = () => {
		$http({
			method: 'GET',
			url: '../student-attendance-system-api/getcourse.php',
		}).then((response) => {
			$scope.courseList = response.data;
		}, (response) => {
			console.log('Server Error');
			// console.log(response.data, response.status);
		});
	};
	$timeout(function(){
		angular.element("#getCourse").triggerHandler('click');
	}, 0);

	$scope.getStudents = () => {
		$http({
			method: 'GET',
			url: '../student-attendance-system-api/getstudentsattendance.php',
		}).then(function (response) {
			// console.log(response.data);
			$scope.studentList = response.data;

			// var studentsIds = studentList.map(function(student){
			// 	console.log(student.id);
			// 	// return student.id;
			// });

		}, function (response) {
			// console.log(response.data, response.status);
			alert("ERROR: "+response.status);
		});
	}
	$timeout(function(){
		angular.element('#retrieveListBtn').triggerHandler('click');
	}, 0);

	$scope.markAttendance = (id,course) => {
		$scope.attInfo = { studentId : id, courseId: course, };
		if($scope.attInfo.courseId == undefined || $scope.attInfo.courseId == "1"){
			alert("No Course Selected");
		} else {
			$http({
				method: 'POST',
				url: '../student-attendance-system-api/markattendance.php',
				data: $scope.attInfo
			}).then(function (response) {
				// console.log(response.data);
				if(response.data === 'TRUE'){
					$scope.studentList.find(x => x.id === id).feedback = 'MARKED';
				} else {
					$scope.feedback = 'FALSE';
					alert(response.data);
				}
			}, function (response) {
				// console.log(response.data, response.status);
				alert("ERROR: "+response.status);
			});
		}
	}
	$scope.unmarkAttendance = (id,course) => {
		$scope.attInfo = { studentId : id, courseId: course, };
		if($scope.attInfo.courseId == undefined || $scope.attInfo.courseId == "1"){
			alert("No Course Selected");
		} else {
			$http({
				method: 'POST',
				url: '../student-attendance-system-api/unmarkattendance.php',
				data: $scope.attInfo
			}).then(function (response) {
				// console.log(response.data);
				if(response.data === 'TRUE'){
					$scope.studentList.find(x => x.id === id).feedback = 'UNMARKED';
				} else {
					$scope.feedback = 'FALSE';
				}
			}, function (response) {
				// console.log(response.data, response.status);
				alert("ERROR: "+response.status);
			});
		}
	}
});

//view Attendance Controller
a.controller("viewAttControl",function($scope, $http, $window){
	// $scope.getCourse = function(){
	$http({
		method: 'GET',
		url: '../student-attendance-system-api/getcourse.php',
	}).then(function (response) {
		$scope.courseList = response.data;
	}, function (response) {
		console.log('Server Error');
		// console.log(response.data, response.status);
	});
	// };

	$scope.change_course_id = (course_id) => {
		$http({
			method: 'POST',
			url: '../student-attendance-system-api/viewattendance.php',
			data: { courseId: course_id, }
		}).then(function (response) {
			$scope.attList = response.data;
		}, function (response) {
			// console.log(response.data, response.status);
			console.log('Server Error');
			// alert("ERROR: "+response.status);
		});
	}
	$scope.printAttendance = () => {
		// $window.print(div.)
	}
});
//messages Controller
a.controller("messagesControl",function($scope){
	$scope.btn = () => {
		alert('messages page working');
	}
});
//messages Controller
a.controller("timetableControl",function($scope){
	$scope.btn = () => {
		alert('timetable page working');
	}
});
//notification Controller
a.controller("notificationControl",function($scope){
	$scope.btn = () => {
		alert('notification page working');
	}
});