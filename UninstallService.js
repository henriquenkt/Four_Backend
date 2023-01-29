	 var Service = require('node-windows').Service;
     // Create a new service object
     var svc = new Service({
          name:'ServerNodeFour',
          description: 'Site Four',
          script: 'C:\\Users\\henri\\Desktop\\Dev\\Four_Backend\\app.js'
     });

     // Listen for the "install" event, which indicates the
     // process is available as a service.

     svc.on('install',function(){
                svc.start();
     });

     svc.uninstall();