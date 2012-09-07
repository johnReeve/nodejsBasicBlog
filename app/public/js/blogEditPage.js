// new blogpost

$('#updateBlog').on("click", function (e){
	
	e.preventDefault;        
	
	var userName =   $('#blogEntry input[name="userName"]').val();
	var postTitle =  $('#blogEntry input[name="postTitle"]').val();
	var postSlug =   $('#blogEntry input[name="postSlug"]').val();
	var postBody =   $('#blogEntry #postBody').val();
	var action =   $('#blogEntry input[name="action"]').val();
	var _id =   $('#blogEntry input[name="_id"]').val();
	
	$.post(	"/blog/update", 
			{ userName: userName, postTitle : postTitle,  postSlug: postSlug, postBody: postBody, action: action, _id: _id },
	 		function(data) {
				if (data.status == "post-created"){
					window.location.replace(data.target);
				} else {
					console.log("postNotCreated!!: " + data.error);
					$('#messageBox').html(data.error);
				}
			},
			"json"
	);
});

$(document).ready(function(){
	$('#blogEntry').validate(
		{
			debug: true,
			rules: {
				postTitle: {
					minlength: 5,
					required: true
				},
				postSlug: {
					required: true,
					minlength: 5
				},
				'postBody': {
					minlength: 2,
					required: true
				}
			},
			messages: {
				postSlug: "This is the post slug that will be made HTML friendly. But make it at least 10 characters, okay!"
			},
	});
 }); // end document.ready


//destroy blogpost

$('.signup-modal').modal({
	backdrop:'static',
	keyboard: 'true'
});
  
$('.signup-modal').modal('toggle');

$('#deleteButton').on('click', function(e) {
	e.preventDefault();        
	$('.modal-confirm').modal('toggle');
});

$('#singleDelete').on("click", function (e){
	
	e.preventDefault;        

	var postId =   $('#postID').val();
	
	console.log('try to delete ' + postId);
	
	$.post(	"/blog/delete/" + postId,
			{ok: 'ok'},
	 		function(data) {
				window.location.replace(data.target)
			},
			"json"
	);
});