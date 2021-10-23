// Setup empty JS object to act as endpoint for all routes
projectData = {};
//Add Dependencies
const express= require('express'); //Express to run server
const bodyParser = require('body-parser'); //Dependency
const cors=require('cors');
const app=express();; //App instance

//Configure express to use bodyparser as middle-ware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors()); //Cors is used for cross origin allowance

app.use(express.static('website')); //Initialize main project folder website

const port=8000;

//Set up server
const listening = () => {
    console.log('server is running');
    console.log(`running on localhost ${port}`);
}
const server = app.listen(port, listening);

//GET route
app.get("/getData",(req,res)=>{
    console.log("GET request") ;
    res.send(projectData);
    
});

//POST route
app.post('/',(req,res)=>
{

    let response=req.body;
    let newData={
        temperature:response.temperature,
        date:response.date,
        userResponse: response.userResponse
    }
   
    projectData=newData;
    //console.log(`incoming data: ${JSON.stringify(projectData)}`); 
    console.log(`incoming data: ${JSON.stringify(projectData)}`); 
});

