var templateData = require('./modules/pageData');

var db = require('./modules/database');

var accountManger = require('./modules/account-manager');
accountManger.accounts = db.accounts;

var blog = require('./modules/blog');
blog.blogposts = db.blogPosts;

var moment = require('moment');
accountManger.moment = moment;
blog.moment = moment;



module.exports = function(app) {

	// public pages
	
	app.get('/', function(req, res){
		accountManger.manualLogin(req.cookies.user, req.cookies.user, function(e, user){
			res.render('index', { templateInfo: templateData, udata: user });
		});
	});
	
	app.get('/blog', function(req, res){
		accountManger.manualLogin(req.cookies.user, req.cookies.user, function(e, user){
			blog.recentPostList( function(e, o){
				if (o){
					templateData.postlist = o;
					res.render('blog', { title: 'GAT Blog', templateInfo: templateData, udata: user })
				} else {
					res.send(e, 500);
				}
			});
		})
	});
		
	app.get('/about', function(req, res){
		accountManger.manualLogin(req.cookies.user, req.cookies.user, function(e, user){
			res.render('about', { templateInfo: templateData, udata: user });
		});
	});
	
	app.get('/status', function(req, res){
		accountManger.manualLogin(req.cookies.user, req.cookies.user, function(e, user){
			res.render('blog', { title: 'Page Not Found', templateInfo: templateData, udata: user })
		});
	});
	
	// user management pages
	
	app.get('/login', function(req, res){
		if (req.cookies.user == undefined || req.cookies.pass == undefined){
			var loginError="";
			if (req.param('credentialError') == 1 ){
			  loginError = "Dang it all to heck. Those credentials didn't work.";
			} 
			res.render('login', { templateInfo: templateData, loginError: loginError });
		} else {
			accountManger.autoLogin(req.cookies.user, req.cookies.pass, function(o){
				if (o != null){
				    req.session.user = o;
					res.redirect('/account');
				} else {
					res.render('login', { templateInfo: templateData , loginError: ""});
				}
			});
		}
		
	});
	
	app.post('/login', function(req, res){   
		accountManger.manualLogin(req.param('userName'), req.param('password'), function(e, o){
			if (!o){
				res.send({target: '/login/?credentialError=1'}, 200);
			} else {
			    req.session.user = o;
				if (req.param('remember-me') == 'true'){
					res.cookie('user', o.user, { maxAge: 900000 });
					res.cookie('pass', o.pass, { maxAge: 900000 });
				} else {
					res.cookie('user', o.user);
					res.cookie('pass', o.pass);
				}
				res.send({target: '/account'}, 200);
			}
		});
		
	});

	app.get('/logout', function(req, res){ 
			res.clearCookie('user');
			res.clearCookie('pass');
			req.session.destroy(function(e){ res.redirect('/')});
	});
		
	app.post('/logout', function(req, res){ 
		if (req.param('logout') == 'true'){
			res.clearCookie('user');
			res.clearCookie('pass');
			req.session.destroy(function(e){ res.send('ok', 200); });
		} else {
			res.send('ok', 400); 
		}
	});
	
	app.get('/account', function(req, res) {
		accountManger.manualLogin(req.cookies.user, req.cookies.user, function(e, user){
			if (!user){
				res.redirect('/');
			} else {
					res.render('account', { title : 'Account Data', templateInfo: templateData, udata: user   });
			}
		});
	});
	
	app.get('/users/print', function(req, res) {
		accountManger.manualLogin(req.cookies.user, req.cookies.user, function(e, user){
			if (!user){
				res.redirect('/');
			} else {
				accountManger.getAllRecords( function(e, accounts){
					res.render('print', { title : 'Account List', accts : accounts, templateInfo: templateData, udata: user   });
				});
			}
		});
	});
	
	// TODO create new account page
	
	//for now, we can do it pretty easily like this:
	
	/*
	app.get('/signup/bob', function(req, res){
		accountManger.signup({
			name 	: "bob",
			email 	: "bob@gmail.com",
			user 	: "bob",
			pass	: "bob",
			country : "ZM",
			role	: "Super"
		}, function(e, o){
			if (e){
				res.send(e, 400);
			}	else{
				res.send('ok', 200);
			}
		});
		res.redirect('/?madeUserJohn');
	});
	*/	

	// blog CRUD routing
	app.get('/blog/new', function(req, res) { 
		accountManger.manualLogin(req.cookies.user, req.cookies.user, function(e, user){
			if (user.role = "Super") {
		    	res.render('blogEdit', { title : 'Account Data', templateInfo: templateData, udata: user, pdata: {}   });
			} else {
				res.redirect('/');
			}
		});
	});
	
	app.post('/blog/update', function(req, res) {
		accountManger.manualLogin(req.cookies.user, req.cookies.user, function(e, user){
			if (user.role = "Super") {
				postData = {
					title 	: req.param('postTitle'),
					slug	: req.param('postSlug'),
					author 	: req.param('userName'),
					content : req.param('postBody'),
					_id		: req.param('_id'),
					public	: true
				}
				
				console.log('TODO -- Serverside validation of new blogpost');
				/*
				if ( !postData.title || ){
					
				}*/
				
				blog.updatePost( postData, req.param('action'), function(e, o){
					if (o){
						res.send({target: templateData.data.url + '/blog', status: "post-created"}, 200);
					} else {
						res.send({error: e } , 200);
					}
				});
			} else {
				res.send('badUser', 200);
			}
		});
	});

	app.get('/blog/:slug', function(req, res){
		accountManger.manualLogin(req.cookies.user, req.cookies.user, function(e, user){
			blog.findBySlug(req.param('slug'), function(e, o){
				if (!o) {
					res.render('404', { title: 'Page Not Found', templateInfo: templateData, udata: user });
				} else {
					res.render('blogSingle', { title: 'GAT Blog', templateInfo: templateData, udata: user, pdata: o });
				}
			});
		});
	});
	
	app.get('/blog/edit/:slug', function(req, res) {
		accountManger.manualLogin(req.cookies.user, req.cookies.user, function(e, user){
			if (user.role = "Super") {
				blog.findBySlug(req.param('slug'), function(e, o){
					if (!o) {
						res.render('404', { title: 'Page Not Found', templateInfo: templateData, udata: user });
					} else {
						res.render('blogEdit', { title : 'Account Data', templateInfo: templateData, udata: user, pdata: o   });
					}
				});
			} else {
				res.send('badUser', 200);
			}
		});
	});

	app.post('/blog/delete/:slug', function(req, res) {
		accountManger.manualLogin(req.cookies.user, req.cookies.user, function(e, user){
			if (user.role = "Super") {
				postData = {
					id 		: req.param('slug'),
				}
				blog.deletePost( postData, function(e){
					if (!e){
						res.send({target: templateData.data.url + '/blog'}, 200);
					} else {
						res.send(e, 500);
					}
				});
			} else {
				res.send('badUser', 200);
			}
		});
	});	
	
	// 404
	
	app.get('*', function(req, res) { 
		accountManger.manualLogin(req.cookies.user, req.cookies.user, function(e, user){
			res.render('404', { title: 'Page Not Found', templateInfo: templateData, udata: user });
		});
	});	
}