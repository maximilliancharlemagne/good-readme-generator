// An application to generate good READMEs

//require filesystem
const fs = require('fs')

//require readline
const readline = require('readline')

//do some stuff I don't really understand with readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//make a function to log data from an API call
function dumpResponse() {
  // `this` will refer to the `XMLHTTPRequest` object that executes this function
  console.log(this.responseText);
}

//from https://nodejs.org/en/knowledge/command-line/how-to-prompt-for-command-line-input/

//Open the I/O stream and prompt the user for their github username
rl.question("Please input your github username.", function (name) {
  // Create a new request object (with vanilla JS, gonna wait till the class on NPM today
  // to figure out how to get jQuery)
  //next 3 lines from here: https://stackoverflow.com/questions/10341135/example-of-using-github-api-from-javascript
  let request = new XMLHttpRequest();
  //set event listener
  request.onload = dumpResponse
  // Initialize a request
  request.open('get', `https://api.github.com/users/${}`)
  // Send it
  request.send()
  
  //Call the github API to get
  //their email
  //their profile image
  //Close the I/O stream (important!!!)
  rl.close()
})


//Ask them some questions

//Create a variable to hold the page until we write it
let myPage = [] //needs to be a let, this variable will be VERY mutable
//later, we will use myPage.join('\n') to combine the array into a string to write, with each section
//on a new line. While we are still assembling the sections, it is more convenient
//to have it in array form, in case we want to modify something later

//Add a badge
//Add a project title
//Add a project description
//Add a table of contents
//Add an installation guide
//Add a usage guide
//Add a license
//Add a list of contributors
//Add some example tests
//Add a Questions? and contact section (with profile pic and email)

//Create the readme file
// fs.writeFile('README.md', data)

//Show some kind of message in the console,
//so the user knows the file was successfully created

//Unless it wasn't, in which case show the error in the console