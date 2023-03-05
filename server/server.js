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
let equations = [{
    num1: '',
    operatorSign: '',
    num2: '',
    answer: '',
}];

// GET
// This is where we will get our data (equations) after receiving it from client side
// Then respond (send) back the equations object to the client
app.get('/equationInputs', (req, res) => {
  console.log('in /equationInputs GET');
  // respond/send data which is the object storing our data
  res.send(equations);
});

// POST
app.post('/putInEquationInputs', (req,res) => {
  console.log('in POST /putInEquationInputs', req.body);
  // data from client side will be put on req.body. So objectToSend teleported to req.body

  let operator = req.body.operatorSign;
  let firstNum = req.body.num1;
  let secondNum = req.body.num2;
  
  // calculate equation from req.body
  if (operator === '+') {
    answer = Number(firstNum) + Number(secondNum);
    console.log('Answer:', answer);
  }

  // store the equation from objectToSend
  equations.push(req.body);
  // equations.answer = answer;

  console.log('Equations:', equations);
  res.sendStatus(201);
});