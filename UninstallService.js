	 var Service = require('node-windows').Service;
     // Create a new service object
     var svc = new Service({
          name:'ServerNode',
          description: 'Site de Cadastro',
          script: 'C:\\Users\\henri\\Desktop\\Dev\\Cadastro\\app.js'
     });

     // Listen for the "install" event, which indicates the
     // process is available as a service.

     svc.on('install',function(){
                svc.start();
     });

     svc.uninstall();