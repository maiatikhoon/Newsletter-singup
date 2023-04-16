const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));


app.get("/", function(req ,res) {

   res.sendFile(__dirname+ "/index.html");
})

mailchimp.setConfig({
  apiKey: "5f26b6116c68e23687fbe12812efa18d-us12",
  server: "us12",
});


// GET information about all audience
async function getInformation() {

// Here I have made my first API Call
      //   const response = await mailchimp.ping.get();
      //   console.log(response);


// This is function to GET the list info about all the audience
            // const response = await mailchimp.lists.getAllLists();
            // console.log(response);


 // This function is to GET info for the specific audience
            const response = await mailchimp.lists.getList("b5fcaac503");
            console.log(response);
//
// }
//


//GET list member info
      // const response = await mailchimp.lists.getListMembersInfo("b5fcaac503");
      //   console.log(response);
}


// getInformation();


app.get("/audience", async(req ,res, next) =>{
  const response = await mailchimp.lists.getListMembersInfo("b5fcaac503");
  console.log(response);
  res.status(200).json(response);
  // res.send(response);
})



app.post("/", async(req ,res, next) =>{
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const mail = req.body.email;

  const response = await mailchimp.lists.addListMember("b5fcaac503", {
    email_address: mail,
    status: "subscribed",
    merger_fields: {
      FNAME : firstName,
      LNAME : lastName
    }

  });
     // res.status(200).json(response);
  // res.send(response);
      //
      if(res.statusCode==200)
      {
        res.sendFile(__dirname+ "/success.html");
      }
      else {
        res.sendFile(__dirname + "/failure.html");
      }
  console.log(response);
  // console.log(res.statusCode);


})




// Function to add the members to the list

const addMembers = async () => {
  const response = await mailchimp.lists.addListMember("b5fcaac503", {
    email_address: "sachinRajput011@gmail.com",
    status: "subscribed",
  });
  console.log(response);
};

// addMembers();

app.listen(3000, function(){
    console.log("Server is up and running");
})


// 5f26b6116c68e23687fbe12812efa18d-us12

// b5fcaac503
