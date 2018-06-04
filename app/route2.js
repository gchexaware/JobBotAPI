module.exports = function(app) {
    var value = 990;
    var fs = require('fs');
    var http=require("http");
    var https=require("https");
    const express = require('express');
    const bodyParser = require('body-parser');
    var server = express()
    var querystring = require('querystring');

    server.use(bodyParser.urlencoded({
        extended: true
    }));
    server.use(bodyParser.json());

    app.post('/postJBot', (req, res) => {
      var mycustomresponse = "";
      var inputAction = "keywordsearch";
      //var inputAction = req.body.result.action;
      var replies = new Array();
      switch(inputAction)
      {
        case 'keywordsearch':
        //let returnData = searchByKeyWord("DotNet");
        let data ="";
        var http = require("http");
        var https = require("https");
        
        //var data = req.body.data;
        var postdata = '{"countryCode":"USA","language":"en","keyWord":"' + data + '","locationId":"","maxDistance":"100","distanceUnit":"KM","startIndex":"1","numberOfResults":"50"}';
          var options = {

                host: 'dtuat.candidate.manpower.com',
                port: 443,
                path: '/DirectTalent_CandidateMobile_REST/jaxrs/jobslist/USCampus/USA/en',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            };
            var port = options.port == 443 ? https : http;
            var reqPost = port.request(options, function(resPost)
            {
                var output = '';
                resPost.setEncoding('utf8');
        
                resPost.on('data', function (chunk) {
                    output += chunk;
                });
        
                resPost.on('end', function() {
                    var obj = JSON.parse(output);  
                    var x ="";
                    
                    var replyObj = {}
                    var key = 'replies';
                    replyObj[key] = [];

                    for (i in obj.advertisementList) {
                        x += "<h2>" + obj.advertisementList[i].jobTitle + "</h2>";
                        replyObj[key].push(obj.advertisementList[i].jobTitle);
                       
                    }      
                    console.log(x);
                    //res.send(replyObj);       
                    return res.json({
                        
                                    "fulfillmentText": "hello world",        
                                    "fulfillmentMessages": [
                              {
                                "text": {
                                  "text": [
                                    "Hi. Welcome. Please select one of the options below"
                                  ]
                                }
                              },
                              {
                                "payload": {
                                  "replies": [
                                    "Candidate",
                                    "Recruiter",
                                    "Associate"
                                  ]
                                }
                              }
                            ]
                                });             
                });
            });
            // post the data
            reqPost.write(postdata);
            reqPost.on('error', function(err) {
                //res.send('error: ' + err.message);
                console.log(err);
            });        
            reqPost.end();            
            console.log("4");
         break;
        default:
        break;
      }  
    });

    function getresumeTips() {  
        var data = "{obj}";      
        res.status(200).send(data);
    };
    app.get('/api/careertips', function(req, res) {  
        res.status(200).send("resumetips");   
    });
    app.get('/api/discoverpath', function(req, res) {   
        res.status(200).send("Please find some of the links to discover your career path. To view <a href='https://www.manpower.com/pathways/'> Click here</a>");    
    });
    app.get('/api/learnskill', function(req, res) { 
        res.status(200).send("resumetips");    
    });
    app.get('/api/manageprofile', function(req, res) {
        res.status(200).send("resumetips");      
    });
    app.get('/api/hotjobs', function(req, res) {
        res.status(200).send("resumetips");      
    });
    app.get('/api/industryjobs', function(req, res) {   
        res.status(200).send("resumetips");    
    });
    app.get('/api/locationjobs', function(req, res) {   
        res.status(200).send("resumetips");    
    });
    app.get('/api/viewprofile', function(req, res) {
        res.status(200).send("resumetips");      
    });
    app.get('/api/updateprofile', function(req, res) {
        res.status(200).send("resumetips");      
    });
    app.get('/api/viewskill', function(req, res) {  
        res.status(200).send("resumetips");    
    });
    app.get('/api/vieweducation', function(req, res) {
        res.status(200).send("resumetips");      
    });
    app.get('/api/viewexperience', function(req, res) {
        res.status(200).send("resumetips");      
    });
    app.get('/api/viewcontact', function(req, res) {
        res.status(200).send("resumetips");      
    });
    app.get('/api/sharejob', function(req, res) {
        res.status(200).send("resumetips");      
    });
    app.get('/api/savejob', function(req, res) {    
        res.status(200).send("resumetips");    
    });
    app.get('/api/applyjob', function(req, res) {   
        res.status(200).send("applyjob");    
    });
    app.get('/api/register', function(req, res) {
        res.status(200).send("resumetips");      
    });
    app.get('/api/login', function(req, res) {  
        res.status(200).send("resumetips");    
    });
    function searchByKeyWord(data) {       
        console.log("1");
    }            
};
