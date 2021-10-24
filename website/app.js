// Personal API Key for OpenWeatherMap API
const baseURL="http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey="&appid=ba009fdbee762893f5f0200c5e0d0fff&units=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

//Functions
/* Function called by event listener */
/* Function to GET Web API Data*/
/**
 * @description This function thats by getting data from API then has chained promises to post data and display it on UI
 * @param {event} e This is the event used to call function
*/
const response = (e) => 
{
    console.log("hello");
    let zip=document.getElementById("zip").value;
    let feelings=document.getElementById("feelings").value;
    console.log(zip);
    getData(baseURL,zip,apiKey).then((data)=> 
        {
            //Posts the required data
            postData("/",
            {
                zip: zip, 
                temperature:data.main.temp, //This is needed as temp is inside of main
                date:newDate, 
                userResponse: feelings
            }).then(update());
        }
    )
}
/* Function to GET Web API Data*/
/**
 * @description This function gets data from API
 * @param {string} baseURL This is the base API url
 * @param {string} zip This is the zip to be looked up
 * @param {string} key This is the key credential
*/
const getData = async (baseURL, zip, key)=>{
    console.log(baseURL+zip+key);
  const res = await fetch(baseURL+zip+key)
  try {

    const data = await res.json();
    console.log(data)
    return data;
  }  catch(error) { //Puts error in variable
    console.log("error", error); //Outputs error
  }
}

/* Function to POST data */
/**
 * @description This function posts data using URL
 * @param {string} url This is the url used to post the data
 * @param {object} data This is the data
*/
const postData = async ( url = '', data = {})=>{ //async means wait for something to happen
    console.log(data)
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin', 
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });
      try { //Try, await and catch are supposed to be there, it is similar to if/else, try is try to do something
        const newData = await response.json(); //await is wait until api responds
        console.log(`app line 59:${newData}`);
        return newData
      }catch(error) { //If there is error
        
      console.log("error", error);
      // appropriately handle the error
      }
  }
/**
 * @description This function updates the UI dynamically after using fetch API to get data from the server and gives error if fetch fails.
*/
const update = async () => {
    const req = await fetch('/getData');
    try{
      const allData = await req.json();
      console.log(allData);
      document.getElementById('date').innerHTML = `Date: ${allData.date}`;
      document.getElementById('temp').innerHTML = `Temperature: ${allData.temperature}`;
      document.getElementById('content').innerHTML =`Content: ${allData.userResponse}`;
  
    }catch(error){
      console.log("error", error);
      document.getElementById('date').innerHTML = "Unable to obtain";
      document.getElementById('temp').innerHTML = "Unable to obtain";
      document.getElementById('content').innerHTML = "Unable to obtain";
    }
}
// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click",response)



