module.exports = function(app) {
    var value = 990;
    var fs = require('fs');
  
	app.get('/api/chartbot/a', function(req, res) {	     
        value = value + 10;
        if(value<1000)  
            res.send('Value :' + value);
        else
            res.status(400).send("value should not be greater than 1000");
    });	
    app.get('/api/chartbot/b', function(req, res) {	     
        value = value - 10;
        if(value>0)  
            res.send('Value :' + value);
        else
            res.status(400).send("value should not be Less than 0");
    });	
    app.get('/api/chartbot/printerlist', function(req, res) {	
        fs.readFile("../Sample API/app/data/data.json",'utf8',function (err, data) {
            if (err) throw err;
            var printerObj=JSON.parse(data);
            res.send('result:'+JSON.stringify(printerObj));
          });
       
    });	
};