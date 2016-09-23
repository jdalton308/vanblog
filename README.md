#Van Blog

###Description
This is a self-hosted blog site, built on a Node.js server that is running on an AWS EC2 instance.

###Creating a new post
1. Write the post
2. Save the file as `[overall post #]-[main category]-[title]`. For example, `1-van-modelchoice.html`. This is just for convention, and does not impact any logic.
3. Update the `server-post-ref.js` file with post details
4. Update the `server-path-ref.js` file, after deciding on the URL to be used

##Server
####Logging in
Log into the server through an SSH client, and sign-in using the user 'ec2-user'

####Monitoring
The `server.js` script is run using the [pm2 process manager](http://pm2.keymetrics.io/). This keeps the site up even if Node throws an error, and also handles deployments without momentarily taking the site down.

The only issue is that all `pm2` commands need to be run with `sudo`, since the server is running on port 80.

####Updating Files
1. SSH into the EC2 server.
2. Go into the `/vanblog` directory, and pull the `production` branch of this here repository down to the server
3. From any file, run `sudo pm2 reload server`, which should reload the files with zero downtime