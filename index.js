// An application to generate good READMEs

//require xmlhttprequest
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

//require filesystem
const fs = require('fs')

//require readline
const rl = require('readline-sync')

//do some stuff I don't really understand with readline
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

//create global vars to get data out of the callback function of the API call
let imgURL
let userEmail
let userName

//make a function to get the data from the API call
function getMyData() {
  // `this` will refer to the `XMLHTTPRequest` object that executes this function
  let myObject = JSON.parse(this.responseText)
  // console.log(myObject)
  imgURL = myObject.avatar_url
  userEmail = myObject.email
  // console.log(`Image url: ${imgURL}, user email: ${userEmail}`)
}

//from https://nodejs.org/en/knowledge/command-line/how-to-prompt-for-command-line-input/

//Open the I/O stream and prompt the user for their github username
userName = rl.question("Please input your github username. \n")
//from: https://stackoverflow.com/questions/10341135/example-of-using-github-api-from-javascript
let request = new XMLHttpRequest();
//set event listener
request.onload = getMyData
// Initialize a request
request.open('get', `https://api.github.com/users/${userName}`,false) //false makes this synchronous
// Send it
request.send()


//Ask them some questions

//Create a variable to hold the page until we write it
let myPage = [] //needs to be a let, this variable will be VERY mutable
//later, we will use myPage.join('\n') to combine the array into a string to write to the final file,
//with each element on a new line. While we are still assembling the sections, it is more convenient
//to have it in array form, in case we want to modify something later

let savedRepoName
//Get the repo name and add a 'primary language' badge to the page
savedRepoName = rl.question("What is the name of your project repository? \n")
myPage.push(`https://img.shields.io/github/languages/top/${userName}/${savedRepoName}`)
myPage.push(' ')

//Add a project title
let title = rl.question("What is the title of your project? \n")
myPage.push(`# ${title}`)
myPage.push(' ')

//Add a project description
let desc = rl.question("Describe your project. \n")
myPage.push(desc)
myPage.push(' ')

//Add a table of contents
myPage.push(`# Table of Contents`)
myPage.push(`## Installation`)
myPage.push(`## Usage`)
myPage.push(`## License`)
myPage.push(`## Contributors`)
myPage.push(`## Tests`)
myPage.push(`## Questions & Contact`)
myPage.push(' ')

//Add an installation guide
desc = rl.question("How do you install your project? \n")
myPage.push('# Installation')
myPage.push(desc)
myPage.push(' ')

//Add a usage guide
desc = rl.question("How do you use your project? \n")
myPage.push('# Usage')
myPage.push(desc)
myPage.push(' ')

//Add a license
myPage.push('# License')
myPage.push(`MIT License

Copyright (c) 2020 Maxwell Roberts

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`) //we gon find out if this preserves newlines
myPage.push(' ')

//Add a list of contributors
coders = rl.question("Please provide a comma-separated list of all contributors to the project. \n")
myPage.push('# Contributors')
aReallyGoodList = coders.split(',')
for(let index in aReallyGoodList){
  myPage.push(aReallyGoodList[index])
}

//Add some example tests
desc = rl.question("How do you test your project? \n")
myPage.push(' ')
myPage.push('# Testing')
myPage.push(desc)
myPage.push(' ')

//Add a Questions? and contact section (with profile pic and email)
myPage.push('# Questions')
myPage.push(`![user-image](${imgURL})`)
myPage.push(`${userName}`)
myPage.push(`${userEmail}`)
myPage.push(' ')
//Create the readme file

console.log(myPage)
console.log(savedRepoName)

fs.writeFile(`${savedRepoName}-README.md`, myPage.join('\n'), err => {if(err){console.log(err)}})
//If there's an error, show the error in the console

//Show some kind of message in the console, so the user knows we at least tried to create the file
console.log(`File created`)