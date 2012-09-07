#Node.js Basic Blog 

Summary:

	This is just a learning project for me to try and work out how the hell to work with node js

Background:

	I'm a pretty hack WordPress developer for my day job, but I'm trying to get better at being a programmer.
	
	As a WP freelancer I do pretty well, but I'd like to move into doing more interesting projects than rolling out markeiting sites for people.  So here is a project where I am leveraging what I know about Javascript and the front end and what I've figured out about programming patterns and anti-patterns.  I'm mostly trying to add a bunch of tools that Ihav eheard about but haven't had much call for as a cowboy programmer doing little PHP based sites.
	
	All in all, it's a fun, fun learning experinece, but please don't expect that the code in this repo is somethign that you'd really want to use; this is just exercise.
	
The Project:

	This is my first attempt at setting up basic site functionailty in nodejs.  It uses express and jade for the general architecture and Mongo as the database.  Although I know HTML/CSS/JS  pretty well, I've opted to just use bootstrap because it looks pretty and has a bunch of functions that I like.
	
	Basic functionality should be there.  There are users, static pages, and posts.  While I'm still working out the users, the posts have a complete CRUD functionality.  There is no init for the database... if you want to create a user, un comment out the end point for the create a user and hit it.
	
	The project is certainly at the "baby" stage of development, though it is "born".  There are obviously a whole, whole lot of problems that I haven't noticed, functionality to be added, stuff to do, etc.  But it is what it is.

Credits:

	At this point, I'm a certainly unsure of where I've gotten the various parts of the code.  Lots of it was rewritten from exisitng modules that other folks had written, but I'm not sure what is original and what I swiped.

TODOs:

	users
		finish user account page update functionality
		implement add user page
		add delete/edit tools to list users page
		implement user role system
	
	posts
		published/unpublished status functionaility