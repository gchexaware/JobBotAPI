module.exports = function(app) {
    var value = 990;
    var fs = require('fs');
    var http=require("http");
    var https=require("https");
    const express = require('express');
    const bodyParser = require('body-parser');
    var server = express()
    var querystring = require('querystring');
    //var NodeGeocoder = require('node-geocoder');

    // Service hosting details
    var hostname = 'm.manpower.com'//'dtuat.candidate.manpower.com';
    var siteName = 'USCampus';
    var siteCode = 'USA';
    var language = 'en';

    //User details for call authenticated service
    var username = 'balajiwcmdev@gmail.com';//"siva@raman5.com";
    var passw = 'manpower1';
    var auth = 'Basic ' + new Buffer(username + ':' + passw).toString('base64');
    console.log("autheeeee= "+auth);

    var SKILLS = 'skills'
    var EDUCATION = 'education'
    var EXPERIENCE = 'experience'
    var CONTACT = 'contact'
    var OTP = 'otp'
    

   
    server.use(bodyParser.urlencoded({
        extended: true
    }));
    server.use(bodyParser.json());

    app.post('/postJBot', (req, res) => {
      var mycustomresponse = "";
      //var inputAction = "locationsearch";
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>> = "+JSON.stringify(req.body, null, 4));
      var inputAction = req.body.queryResult.action;

      var replies = new Array();
      var http = require("http");
      var https = require("https");
      switch(inputAction)
      {
        case 'keywordsearch':
       
            var keyword = req.body.queryResult.queryText;
           
           // console.log("keyword="+keyword);
            var lat = "";
            var long = "";
            searchByKeyWord(res,keyword,lat,long);
        break;
        case 'locationsearch':
            var location = "chennai"//req.body.data;

            // var options = {
            //     provider: 'google',
              
            //     // Optional depending on the providers
            //     httpAdapter: 'https', // Default
            //     apiKey: 'AIzaSyDwH56E1XKZruHK0JbKEZsCnlV9qam4NSs', // for Mapquest, OpenCage, Google Premier
            //     formatter: null         // 'gpx', 'string', ...
            //   };
            // var geocoder = NodeGeocoder(options);
            // geocoder.geocode(location, function ( err, data ) {
            //     console.log(JSON.stringify(data, null, 4));
            // })
            
            var keyWord = "";
            var lat = "43.038902";
            var long = "-87.906471";
            searchByKeyWord(res,keyWord,lat,long);
            
        break;

        case 'jobDetail':
            var advertId = req.body.originalDetectIntentRequest.payload.jobID;
            console.log("adv id "+advertId);            
            getJobDetails(res,advertId);
        break;

        case 'hotjobs':           
            getHotJobs(res);
        break;

        case 'saveJob':
            var advertId = req.body.originalDetectIntentRequest.payload.jobID;
            console.log("adv id "+advertId);            
            saveJob(res,advertId);
        break;

        case 'applyJob':
            var advertId = req.body.originalDetectIntentRequest.payload.jobID;
            console.log("adv id "+advertId);            
            applyJob(res,advertId);
        break;
        case 'shareJobEmail':
            var advertId = req.body.originalDetectIntentRequest.payload.jobID;
            var receiverEmail = req.body.originalDetectIntentRequest.payload.receiverEmail;
            console.log("adv id "+advertId);            
       
            //var receiverEmail = "thani.mca@gmail.com"
            var senderFirstName = "Thani"
            var senderLastName = ""
            var receiverName = ""
            var senderEmail = "thani.mca@gmail.com"
            var message = "This is interesting job is posted on Manpower. Please have a look.."
            var postdata = '{"advertId":"'+advertId+'","receiverEmail":"'+receiverEmail+'","senderFirstName":"'+senderFirstName+'","senderLastName":"'+senderLastName+'","receiverName":"'+receiverName+'","personalMessage":"'+message+'","senderEmail":"'+senderEmail+'"}';
            shareJobEmail(res,postdata);
        break;
        case 'registerUser':
            var userEmail ="rest1122334@expind1.com";
            var password ="password";//"MA4P0W3r123";
            var firstName ="Thani";
            var lastname ="testing";
            registerUser(res,userEmail,password,firstName,lastname); 
        break;
        case 'getAllEnumurations':            
            getAllEnumurations(res);
        break;         
        case 'candidateProfile':
            var required ="";
            getCandidateProfile(res,required);
        break;  
        
        case 'candidateSkill':            
            getCandidateProfile(res,SKILLS);
        break;  

        case 'candidateEducation':            
            getCandidateProfile(res,EDUCATION);
        break; 

        case 'candidateExperience':           
            getCandidateProfile(res,EXPERIENCE);
        break; 
        case 'candidateContact':           
            getCandidateProfile(res,CONTACT);
        break; 
        // case 'updatecandidateContact':           
        //     updateCandidateContact(res,CONTACT);
        // break; 
        // case 'updatecandidateSkills':           
        //     getCandidateProfile(res,CONTACT);
        // break;
        // case 'updatecandidateEducation':           
        //     getCandidateProfile(res,CONTACT);
        // break; 
        // case 'updatecandidateExperience':           
        //     getCandidateProfile(res,CONTACT);
        // break; 
        case 'getBranchLocator':           
            getBranchLocation(res);
        break;  
        case 'generateOTP': 
           // var mobileNo = "";//9502842849//req.body.originalDetectIntentRequest.payload.mobileNo;
           // getCandidateProfile(res,OTP);
           // generateOTP(res,mobileNo);
        break;
        case 'associateOTP': 
        var mobileNo = "9502842849";//9502842849//req.body.originalDetectIntentRequest.payload.mobileNo;
        // getCandidateProfile(res,OTP);
         //generateOTP(res,mobileNo);
     break;
        case 'verifyOTP': 
             var sessionId = req.body.originalDetectIntentRequest.payload.sessionId;
             var otp = req.body.originalDetectIntentRequest.payload.otp;   
            //var sessionId = 'c8035802-7b90-11e8-a895-0200cd936042';
            //var otp ='828114';         
            VerifyOTP(res,sessionId,otp);
        break;
        case 'checkUserExist':  
        var emailId = req.body.originalDetectIntentRequest.payload.emailID;             
            checkUserExist(res,emailId);
        break;  
        case 'getSavedJobs':        
            getSavedJobs(res);
        break;
        case 'getAppliedJobs':        
            getAppliedJobs(res);
         break;
        default:
        break;
      }  
    });

    //for serach by keyword method

    function searchByKeyWord(response,keyword,latitude,longitude) {       
        //keyword =""; 
        var locationLatLong ="";
        if(latitude != ""){
            locationLatLong = '"latitude":"'+latitude+'","longitude":"'+longitude+'",';
        }      
        

        var postdata = '{"countryCode":"'+siteCode+'","language":"en","keyWord":"' + keyword + '","locationId":"",'+locationLatLong+'"maxDistance":"100","distanceUnit":"KM","startIndex":"1","numberOfResults":"50"}';
        console.log(postdata);
          var options = {

                host: hostname,
                port: 443,
                path: '/DirectTalent_CandidateMobile_REST/jaxrs/jobslist/'+siteName+'/'+siteCode+'/'+language,
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
                    console.log("output is = "+output);
                    var obj = JSON.parse(output); 
                    searchByKeyWordCB(response,obj); 
                       
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
    }    
    
    function searchByKeyWordCB(res,responseObj){
        var x ="";
        var replyObj = {}
        var key = 'replies';
        replyObj[key] = [];

        for (i in responseObj.advertisementList) {
            x += "<h2>" + responseObj.advertisementList[i].jobTitle + "</h2>";
            replyObj[key].push(responseObj.advertisementList[i].jobTitle);
           
        }      
        console.log(x);
        //res.send(replyObj);       
        return res.json({
            
                        "fulfillmentText": "List of jobs",        
                        "fulfillmentMessages": [
                  {
                    "text": {
                      "text": [
                        "Hi. Welcome. Please select one of the options below"
                      ]
                    }
                  },
                  {
                    "payload": responseObj
                  }
                ]
            });  
    }

    function getAllEnumurations(response) {       
        
          var postdata = '{"enumTypes":["contractType","hoursWorked","workShifts","sortingCriteria","industrySectors","company","country","phoneType","month","year","educationDegrees","dashboardContent","residenceStatus","nationality","yearsOfExp","skillLevel"]}';
            var options = {
  
                  host: hostname,
                  port: 443,
                  path: '/DirectTalent_CandidateMobile_REST/jaxrs/enumerations/findMultiple/'+siteName+'/'+siteCode+'/'+language,
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
                      getAllEnumurationsCB(response,obj); 
                         
                  });
              });
              // post the data
              reqPost.write(postdata);
              reqPost.on('error', function(err) {
                  //res.send('error: ' + err.message);
                  console.log(err);
              });        
              reqPost.end();            
             
      }    
      
      function getAllEnumurationsCB(res,responseObj){
       
          //res.send(replyObj);       
          return res.json({
              
                          "fulfillmentText": "List of jobs",        
                          "fulfillmentMessages": [
                    {
                      "text": {
                        "text": [
                          "List of Enumurations"
                        ]
                      }
                    },
                    {
                      "payload": responseObj
                    }
                  ]
                      });  
      }

    //Get Job details

    function getJobDetails(response,advertId) {       
      
        var postdata = '{"advertId":'+advertId+',"shortDetails":"false"}';
          var options = {

                host: hostname,
                port: 443,
                path: '/DirectTalent_CandidateMobile_REST/jaxrs/jobdetails/'+siteName+'/'+siteCode+'/'+language,
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
                    getJobDetailsCB(response,obj); 
                       
                });
            });
            // post the data
            reqPost.write(postdata);
            reqPost.on('error', function(err) {
                //res.send('error: ' + err.message);
                console.log(err);
            });        
            reqPost.end();            
           
    }    
    
    function getJobDetailsCB(res,responseObj){
     
        //res.send(replyObj);       
        return res.json({
            
                        "fulfillmentText": "List of jobs",        
                        "fulfillmentMessages": [
                  {
                    "text": {
                      "text": [
                        "Hi. Welcome. Please select one of the options below"
                      ]
                    }
                  },
                  {
                    "payload": responseObj
                  }
                ]
                    });  
    }


    function getHotJobs(response) {       
        
            var options = {
  
                  host: 'manpower.com',
                  port: 443,
                  path: '/wps/wcm/connect/USA-en/Manpower/Footer%20Jobs/Default?srv=cmpnt&source=library&cmpntname=USA-en/JSON/Nav_Industry_Location_HotJobs',
                  method: 'GET',
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
                      getHotJobsCB(response,obj); 
                         
                  });
              });
              // post the data
              //reqPost.write(postdata);
              reqPost.on('error', function(err) {
                  //res.send('error: ' + err.message);
                  console.log(err);
              });        
              reqPost.end();            
             
      }    
      
      function getHotJobsCB(res,responseObj){
       
          //res.send(replyObj);       
          return res.json({
              
                          "fulfillmentText": "List of jobs",        
                          "fulfillmentMessages": [
                    {
                      "text": {
                        "text": [
                          "List of Hot Jobs"
                        ]
                      }
                    },
                    {
                      "payload": responseObj
                    }
                  ]
                      });  
      }

    function saveJob(response,advertId) {       
        
        var options = {
            host: hostname,
            port: 443,
            path: '/DirectTalent_CandidateMobile_REST/jaxrs/candidatejobs/save/'+siteName+'/'+siteCode+'/'+language+'/'+username+'/'+advertId,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth
            },                
        };
        
        console.log("auth = "+auth);
        var port = options.port == 443 ? https : http;
        var reqPost = port.request(options, function(resPost)
        {
            var output = '';
            resPost.setEncoding('utf8');
    
            resPost.on('data', function (chunk) {
                output += chunk;
            });
    
            resPost.on('end', function() {
                var responseobj = JSON.parse(output);                 
                console.log(responseobj);
                saveJobCB(response,responseobj);
                   
            });
        });
        // post the data
       // reqPost.write(postdata);
        reqPost.on('error', function(err) {
            //res.send('error: ' + err.message);
            console.log(err);
        });        
        reqPost.end();            
     
             
      }    
      
      function saveJobCB(res,responseObj){
       
        var replyObj = {}
        var key = '';            
            key = 'response';
            replyObj[key] = [];
            replyObj[key].push(responseObj);
            retResponse = replyObj;;       
          return res.json({
              
                          "fulfillmentText": "List of jobs",        
                          "fulfillmentMessages": [
                    {
                      "text": {
                        "text": [
                          ""
                        ]
                      }
                    },
                    {
                      "payload": retResponse
                    }
                  ]
                      });  
      }



    
    
      //Candidate Profile service

    function getCandidateProfile(res,required){
          var options = {
                host: hostname,
                port: 443,
                path: '/DirectTalent_CandidateMobile_REST/jaxrs/candidateProfile/'+siteName+'/'+siteCode+'/'+language+'/'+username,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': auth
                },                
            };
            
            console.log("auth = "+auth);
            var port = options.port == 443 ? https : http;
            var reqPost = port.request(options, function(resPost)
            {
                var output = '';
                resPost.setEncoding('utf8');
        
                resPost.on('data', function (chunk) {
                    output += chunk;
                });
        
                resPost.on('end', function() {
                    var responseobj = JSON.parse(output);  
                   
                    console.log(responseobj);
                    getCandidateProfileCB(res,responseobj,required);
                       
                });
            });
            // post the data
           // reqPost.write(postdata);
            reqPost.on('error', function(err) {
                //res.send('error: ' + err.message);
                console.log(err);
            });        
            reqPost.end();            
            console.log("4");
    }

    function getCandidateProfileCB(res,responseobj,required){

        var retResponse = responseobj;   
        var replyObj = {}
        var key = '';
        if(required== SKILLS){
            key = 'skills';
            replyObj[key] = [];
            replyObj[key].push(responseobj.skills);
            retResponse = replyObj;
        }else if(required== EDUCATION){
            key = 'educaton';
            replyObj[key] = [];
            replyObj[key].push(responseobj.educations);
            retResponse = replyObj;   
        }else if(required == EXPERIENCE){
            key = 'experience';
            replyObj[key] = [];
            replyObj[key].push(responseobj.jobJistory);
            retResponse = replyObj;    
        }else if(required == OTP){
           // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>> = "+JSON.stringify(responseobj.phones, null, 4));            
            mobileNo = responseobj.phones[0].number;    
            //console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>111 = "+mobileNo);
            mobileNo = '9884320227';
            generateOTP(res,mobileNo);
        }else if(required == CONTACT){            
           /* var replyObj = {}
            var key = 'contact';
            replyObj[key] = [];
            replyObj[key].push(responseobj.firstName);
            replyObj[key].push(responseobj.lastName);
            replyObj[key].push(responseobj.correspondEmail);
            replyObj[key].push(responseobj.phones);
            replyObj[key].push(responseobj.address);*/
            retResponse = responseobj;   
      
        }
        //res.send(retResponse);  
        if(required != OTP){
        return res.json({
            
                        "fulfillmentText": "",        
                        "fulfillmentMessages": [
                  {
                    "text": {
                      "text": [
                        "Hi. Welcome. Please select one of the options below"
                      ]
                    }
                  },
                  {
                    "payload": retResponse
                  }
                ]
                    });         
                }
    }

    function applyJob(response,advertId) {       
        
          var postdata = '{"candidateEmail":"'+username+'","advertisementId":"'+advertId+'","coverLetter":"coverLetter","startApp":"iPhone.experis"}';
          console.log(postdata);
            var options = {
  
                  host: hostname,
                  port: 443,
                  path: '/DirectTalent_CandidateMobile_REST/jaxrs/jobapplication/apply/'+siteName+'/'+siteCode+'/'+language,
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': auth
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
                      console.log("output = "+output);
                      var obj = JSON.parse(output); 
                      applyJobCB(response,obj); 
                         
                  });
              });
              // post the data
              reqPost.write(postdata);
              reqPost.on('error', function(err) {
                  //res.send('error: ' + err.message);
                  console.log(err);
              });        
              reqPost.end();            
             
      }    
      
    function applyJobCB(res,responseObj){
       
            var replyObj = {}
            var key = '';            
                key = 'response';
                replyObj[key] = [];
                replyObj[key].push(responseObj);
                retResponse = replyObj;
        
          return res.json({
              
                          "fulfillmentText": "",        
                          "fulfillmentMessages": [
                    {
                      "text": {
                        "text": [
                          "Hi. Welcome. Please select one of the options below"
                        ]
                      }
                    },
                    {
                      "payload": retResponse
                    }
                  ]
                      });  
      }

      function updateCandidateContact(response,postjson){
        var postdata = postjson;
        var options = {

              host: hostname,
              port: 443,
              path: '/DirectTalent_CandidateMobile_REST/jaxrs/sendemail/'+siteName+'/'+siteCode+'/'+language,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': auth
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
                  console.log("output = "+output);
                  var obj = JSON.parse(output); 
                  updateCandidateContactCB(response,obj); 
                     
              });
          });
          // post the data
          reqPost.write(postdata);
          reqPost.on('error', function(err) {
              //res.send('error: ' + err.message);
              console.log(err);
          });        
          reqPost.end();    
      }

      function updateCandidateContactCB(res,responseObj){
        
         
           return res.json({
               
                           "fulfillmentText": "List of jobs",        
                           "fulfillmentMessages": [
                     {
                       "text": {
                         "text": [
                           "Hi. Welcome. Please select one of the options below"
                         ]
                       }
                     },
                     {
                       "payload": responseObj
                     }
                   ]
                       });  
       }
 

      function shareJobEmail(response,postjson) {       
        
          var postdata = postjson;
            var options = {
  
                  host: hostname,
                  port: 443,
                  path: '/DirectTalent_CandidateMobile_REST/jaxrs/sendemail/'+siteName+'/'+siteCode+'/'+language,
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': auth
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
                      console.log("output = "+output);
                      var obj = JSON.parse(output); 
                      shareJobEmailCB(response,obj); 
                         
                  });
              });
              // post the data
              reqPost.write(postdata);
              reqPost.on('error', function(err) {
                  //res.send('error: ' + err.message);
                  console.log(err);
              });        
              reqPost.end();            
             
      }    
      
    function shareJobEmailCB(res,responseObj){
        var replyObj = {}
        var key = '';            
            key = 'response';
            replyObj[key] = [];
            replyObj[key].push(responseObj);
            retResponse = replyObj;
        
          return res.json({
              
                          "fulfillmentText": "List of jobs",        
                          "fulfillmentMessages": [
                    {
                      "text": {
                        "text": [
                          "Hi. Welcome. Please select one of the options below"
                        ]
                      }
                    },
                    {
                      "payload": retResponse
                    }
                  ]
                      });  
      }


      function registerUser(response,userEmail,password,firstName,lastname) {       
        
          var postdata = '{"userName":"'+userEmail+'","password":"'+password+'","email":"'+userEmail+'","firstName":"'+firstName+'","lastName":"'+lastname+'","startApp":"iPhone.experis","autoLogin":"true"}';
          console.log(postdata);
            var options = {
  
                  host: hostname,
                  port: 443,
                  path: '/DirectTalent_CandidateMobile_REST/jaxrs/candidate/register/'+siteName+'/'+siteCode+'/'+language,
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
                      console.log("output = "+output);
                      var obj = JSON.parse(output); 
                      registerUserCB(response,obj); 
                         
                  });
              });
              // post the data
              reqPost.write(postdata);
              reqPost.on('error', function(err) {
                  //res.send('error: ' + err.message);
                  console.log(err);
              });        
              reqPost.end();            
             
      }    
      
    function registerUserCB(res,responseObj){
       
        
          return res.json({
              
                          "fulfillmentText": "List of jobs",        
                          "fulfillmentMessages": [
                    {
                      "text": {
                        "text": [
                          "Hi. Welcome. Please select one of the options below"
                        ]
                      }
                    },
                    {
                      "payload": responseObj
                    }
                  ]
                      });  
      }

      function getBranchLocation(response,keyword) {       
        keyword ="";        
        
        //var data = req.body.data;
        var postdata = '{"latitude":0,"longitude":0,"maxDistance":50,"distanceUnit":"KM","startIndex":"0","maxResults":100}';
          var options = {

                host: hostname,
                port: 443,
                path: '/DirectTalent_CandidateMobile_REST/jaxrs/branch/findBranches/'+siteName+'/'+siteCode+'/'+language,
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
                    console.log("output is = "+output);
                    var obj = JSON.parse(output); 
                    getBranchLocationCB(response,obj); 
                       
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
    }    
    
    function getBranchLocationCB(res,responseObj){
         
        return res.json({
            
                        "fulfillmentText": "",        
                        "fulfillmentMessages": [
                  {
                    "text": {
                      "text": [
                        "Hi. Welcome. Please select one of the options below"
                      ]
                    }
                  },
                  {
                    "payload": responseObj
                  }
                ]
                    });  
    }

    function generateOTP(response,mobileNo) {  
        console.log("Mobile Number = "+mobileNo);
          var options = {

                host: '2factor.in',
                port: 443,
                path: '/API/V1/53c62617-63ca-11e8-a895-0200cd936042/SMS/+91'+mobileNo+'/AUTOGEN',
                method: 'GET',
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
                    console.log("output is = "+output);
                    var obj = JSON.parse(output); 
                    generateOTPCB(response,obj); 
                       
                });
            });
            // post the data
           // reqPost.write(postdata);
            reqPost.on('error', function(err) {
                //res.send('error: ' + err.message);
                console.log(err);
            });        
            reqPost.end();            
            console.log("4");
    }    
    
    function generateOTPCB(res,responseObj){
         
        return res.json({
            
                        "fulfillmentText": "OTP sent your mobile No. Please enter your 6 digit OTP",        
                        "fulfillmentMessages": [
                  {
                    "text": {
                      "text": [
                        ""
                      ]
                    }
                  },
                  {
                    "payload": responseObj
                  }
                ]
                    });  
    }

    function VerifyOTP(response,sessionId,otp) {  
        
          var options = {

                host: '2factor.in',
                port: 443,
                path: 'API/V1/53c62617-63ca-11e8-a895-0200cd936042/SMS/VERIFY/'+sessionId+'/'+otp+'',
                method: 'GET',
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
                    console.log("output is = "+output);
                    var obj = JSON.parse(output); 
                    VerifyOTPCB(response,obj); 
                       
                });
            });
            // post the data
           // reqPost.write(postdata);
            reqPost.on('error', function(err) {
                //res.send('error: ' + err.message);
                console.log(err);
            });        
            reqPost.end();            
            console.log("4");
    }    
    
    function VerifyOTPCB(res,responseObj){
        var message = "Invalid OTP, Please Enter valid OTP"
        var key = 'replies';
        replyObj[key] = [];
        replyObj[key].push("Re-enter OTP");
        replyObj[key].push("Send OTP again");
           if(responseObj.Status == "Success"){
            message = "OTP authentication is successfull,Please select the option below"
            replyObj[key] = [];
            replyObj[key].push("Manage Profile");
            replyObj[key].push("Job Tracker");
            replyObj[key].push("Growth Tips");
           } 
    
        return res.json({
            
                        "fulfillmentText": message,        
                        "fulfillmentMessages": [
                  {
                    "text": {
                      "text": [
                        ""
                      ]
                    }
                  },
                  {
                    "payload": replyObj
                  }
                ]
                    });  
    }

    function checkUserExist(response,emailId) {  
        var options = {

              host: hostname,
              port: 443,
              path: '/DirectTalent_CandidateMobile_REST/jaxrs/candidate/exists/'+siteName+'/'+siteCode+'/'+language+'/'+emailId,
              method: 'GET',
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
                  console.log("output is = "+output);
                  var obj = JSON.parse(output); 
                  checkUserExistCB(response,obj); 
                     
              });
          });
          // post the data
         // reqPost.write(postdata);
          reqPost.on('error', function(err) {
              //res.send('error: ' + err.message);
              console.log(err);
          });        
          reqPost.end();            
          console.log("4");
  }    
  
  function checkUserExistCB(res,responseObj){
    var message = "Thanks.You have not registered with manpower.Pick one of the options below to continue."
    
    var replyObj = {}
    var key = 'replies';
    replyObj[key] = [];
    replyObj[key].push("Register");
    replyObj[key].push("Continue as Guest");
    //replyObj[key].push("Try other email");

       if(responseObj == "true" || responseObj == true){
        message = "Thanks.Welcome.You are an existing user with manpower. What you would like to do next?."
        replyObj[key] = [];
        replyObj[key].push("Login with secured code");
        replyObj[key].push("Continue as Guest");
       } 

      return res.json({
          
                      "fulfillmentText": message,        
                      "fulfillmentMessages": [
                {
                  "text": {
                    "text": [
                      ""
                    ]
                  }
                },
                {
                  "payload": replyObj
                }
              ]
                  });  
  }

  
  function getSavedJobs(res){
    var options = {
          host: hostname,
          port: 443,
          path: '/DirectTalent_CandidateMobile_REST/jaxrs/candidatejobs/getsavedjobs/'+siteName+'/'+siteCode+'/'+language+'/'+username,
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': auth
          },                
      };
      
      console.log("auth = "+auth);
      var port = options.port == 443 ? https : http;
      var reqPost = port.request(options, function(resPost)
      {
          var output = '';
          resPost.setEncoding('utf8');
  
          resPost.on('data', function (chunk) {
              output += chunk;
          });
  
          resPost.on('end', function() {
              var responseobj = JSON.parse(output);  
             
              console.log(responseobj);
              getSavedJobsCB(res,responseobj);
                 
          });
      });
      // post the data
     // reqPost.write(postdata);
      reqPost.on('error', function(err) {
          //res.send('error: ' + err.message);
          console.log(err);
      });        
      reqPost.end();            
      console.log("4");
}

function getSavedJobsCB(res,responseobj){  
  return res.json({
      
                  "fulfillmentText": "",        
                  "fulfillmentMessages": [
            {
              "text": {
                "text": [
                  "Hi. Welcome. Please select one of the options below"
                ]
              }
            },
            {
              "payload": responseobj
            }
          ]
              });         
          }


          function getAppliedJobs(res){
            var options = {
                  host: hostname,
                  port: 443,
                  path: '/DirectTalent_CandidateMobile_REST/jaxrs/jobapplication/myapplications/'+siteName+'/'+siteCode+'/'+language+'/'+username,
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': auth
                  },                
              };
              
              console.log("auth = "+auth);
              var port = options.port == 443 ? https : http;
              var reqPost = port.request(options, function(resPost)
              {
                  var output = '';
                  resPost.setEncoding('utf8');
          
                  resPost.on('data', function (chunk) {
                      output += chunk;
                  });
          
                  resPost.on('end', function() {
                      var responseobj = JSON.parse(output);  
                     
                      console.log(responseobj);
                      getAppliedJobsCB(res,responseobj);
                         
                  });
              });
              // post the data
             // reqPost.write(postdata);
              reqPost.on('error', function(err) {
                  //res.send('error: ' + err.message);
                  console.log(err);
              });        
              reqPost.end();            
              console.log("4");
        }
        
        function getAppliedJobsCB(res,responseobj){  
          return res.json({
              
                          "fulfillmentText": "",        
                          "fulfillmentMessages": [
                    {
                      "text": {
                        "text": [
                          "Hi. Welcome. Please select one of the options below"
                        ]
                      }
                    },
                    {
                      "payload": responseobj
                    }
                  ]
                      });         
                  }
    
      
};
