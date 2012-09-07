$('#pageSignin').on("click", function (e){
	
	e.preventDefault;        
	
	var userName =   $('#page-signin-form input[name="user"]').val();
	var pass = $('#page-signin-form input[name="pass"]').val();
	var remember = $('#page-signin-form input[name="remember-me"]').val();
	
	$.post(	"/login", 
			{ userName: userName, password : pass,  rememberUser: remember },
	 		function(data) {
				window.location.replace(data.target)
			},
			"json"
	);
});