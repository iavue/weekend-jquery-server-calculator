// Require express - gives us a function
const express = require('express');

// Create an instance of express by calling the function returned above - gives us an object
const app = express();
const port = 8000;
const bodyParser = require('body-parser');

// Testing to see if server is running.
//console.log('Server file is running!');

// express static file serving - public is the folder name
// We have to tell the server where the index.html file is. (public folder)
// Without this, will get error message 'Cannot GET'
app.use(express.static('server/public'));

app.use(bodyParser.urlencoded({extended: true})); 

// Start up our server. This starts listening.
app.listen(port, () => {
  console.log('listening on port', port);
});

// Routes below here
// Create object here which will store the numbers and history
// let equations = [{
//     num1: '',
//     operatorSign: '',
//     num2: '',
//     answer: '',
// }];
let equations = [];

// GET
// This is where we will get our data (which is the equations[]) after receiving it from client side in app.post
app.get('/equationInputs', (req, res) => {
  console.log('in /equationInputs GET');
  
  res.send(equations); // Here we respond/send data which is the object(s) in equations[] to line 84 of client.js
});

// POST
app.post('/putInEquationInputs', (req,res) => {
  console.log('in POST /putInEquationInputs', req.body);
  // data from client side will be put on req.body. So "objectToSend" teleported to req.body!

  // Variables are declared here so we can use them to start calculating!
  let operator = req.body.operatorSign; // this is the operatorSign from "objectToSend"
  let firstNum = req.body.num1;
  let secondNum = req.body.num2;
  let answer = 0; /* Since we don't have the "answer" property in req.body (objectToSend), we need to 
  declare a variable for 'answer' so we can capture the answer and append it to the DOM */

  // Create If statements to calculate equation(s) from req.body (objectToSend) for each operator.
  if (operator === '+') {
    answer = Number(firstNum) + Number(secondNum); // The variables were strings so we need to convert them to numbers to calculate.
    console.log('Answer:', answer);
  }
  else if (operator === '-') {
    answer = Number(firstNum) - Number(secondNum);
    console.log('Answer:', answer);
  }
  else if (operator === '*') {
    answer = Number(firstNum) * Number(secondNum);
    console.log('Answer:', answer);
  }
  else {
    answer = Number(firstNum) / Number(secondNum);
    console.log('Answer:', answer);
  }

  // Create a new property for "answer" inside the object (req.body) and set it to the answer (which comes from the calculation in the If statement)
  req.body.answer = answer;
  console.log('req.body after adding answer property:', req.body); // We need to see if the "answer" property was properly added

  // Store the equation from objectToSend which should have the new answer property now.
  equations.push(req.body);

  console.log('Equations:', equations);

  res.sendStatus(201); // Respond to client side at line 69 with 201 status
});
