$('#signup-modal').modal({
	backdrop:'static',
	keyboard: 'true'
});
  
$('#signup-modal').modal('toggle');

$('#loginButton').on('click', function(e) {
	
	e.preventDefault();        
	
	$('#signup-modal').modal('toggle');
});

$('#modalSignin').on("click", function (e){
	
	e.preventDefault();        
	
	var userName =   $('#modal-signin-form input[name="user"]').val();
	var pass = $('#modal-signin-form input[name="pass"]').val();
	var remember = $('#modal-signin-form input[name="remember-me"]').val();

	$.post(	"/login", 
			{ userName: userName, password : pass,  rememberUser: remember },
	 		function(data) {
				window.location.reload();
			},
			"json"
	);  
}); 

