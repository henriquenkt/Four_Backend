	var Service = require('node-windows').Service;

     var svc = new Service({
          name:'ServerNode',
          description: 'Site de Cadastro',
          script: 'C:\\Users\\henri\\Desktop\\Dev\\Cadastro\\app.js'
     });


     svc.on('install',function(){  
                svc.start();
     });

     svc.install();