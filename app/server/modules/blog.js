var ObjectID = require('mongodb').ObjectID;

var theBlog = {}  

module.exports = theBlog;

theBlog.updatePost = function(newData, action, callback) {
	if (action == 'update' ){
		console.dir(newData);
		
		ID = newData._id;
		delete newData._id;
		console.log(newData);
		theBlog.blogposts.update({_id: ObjectID(ID)}, newData, {safe:true}, function (e, o){
			newData.date = theBlog.moment().format('MMMM Do YYYY, h:mm:ss a');
			if(!o) {
				callback(e);
			} else {
				callback(null, o );
			}
		});
	} else {
		theBlog.blogposts.findOne({slug:newData.slug}, function(e, o) {
			if (o) {
				callback('Sorry, that slug ( ' + newData.slug + ' ) has been taken.');
	 		} else {
				console.log('newish');
			    // append date stamp when record was created //
				newData.date = theBlog.moment().format('MMMM Do YYYY, h:mm:ss a');
				console.dir(newData);
				theBlog.blogposts.insert(newData, function (e, o){
					if (!o) {
						console.log('no objecto');
						callback(e);
					} else {
						console.log('soy object');
						callback(null, o);
					}
				});

			}
		});
	}
}

theBlog.findBySlug = function (slug, callback) {
	theBlog.blogposts.findOne({slug: slug}, function(e, o) {
		if (!o) {
			callback ('no-post');
		} else {
			callback (null,  o);
		}
	});
}

theBlog.getPostSet = function (params, callback) {
	callback ('pooped myself');
}


theBlog.recentPostList = function (callback) {
	theBlog.blogposts.find( function(e, o) {
		if (!o) {
			callback ('no-collection');
		} else {
			o.toArray(function(error, results) {
				if( error ) callback(error)
				else{
					callback(null, results);
				}
			});
		}
	});
}

theBlog.deletePost = function (postID, callback) {
	console.log('object? ' + ObjectID(postID.id) );
	
	theBlog.blogposts.remove({_id: ObjectID(postID.id) }, function(e) {
			callback (e);
	});
}