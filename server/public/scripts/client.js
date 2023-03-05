$(document).ready(onReady);

function onReady() {
    console.log('jQuery is loaded!');

    // Listener for addition button
    $('#additionBtn').on('click', additionOperator);

    // Listener for addition button
    $('#subtractionBtn').on('click', subtractionOperator);

    // Listener for addition button
    $('#multiplicationBtn').on('click', multiplicationOperator);

    // Listener for addition button
    $('#divisionBtn').on('click', divisionOperator);

    // Listener for equal button
    $('#equalBtn').on('click', sendEquation);

    // Listener for clear button
    $('#clearBtn').on('click', clearInput);
}

let operatorSign = '';

// Functions for all operators. This is to detect what operator was clicked by the user.
// The global variable "operatorSign" will be set based on the operator detected.
function additionOperator() {
    console.log('Inside additionOperator()');
    operatorSign = '+';
    console.log('Addition operator:', operatorSign);
}

function subtractionOperator() {
    console.log('Inside subtractionOperator()');
    operatorSign = '-';
    console.log('Subtraction operator:', operatorSign);
}

function multiplicationOperator() {
    console.log('Inside multiplicationOperator()');
    operatorSign = '*';
    console.log('Multiplication operator:', operatorSign);
}

function divisionOperator() {
    console.log('Inside divisionOperator()');
    operatorSign = '/';
    console.log('Division operator:', operatorSign);
}

// POST
// After detecting operatorSign, send data (which is an object of num1, operatorsign, num2) to the server
function sendEquation() {
    console.log('Inside sendEquation()');

    // This is the object sending to the server. We send it below in the ajax data.
    let objectToSend = {
        num1: $('#num1Input').val(),
        operatorSign,
        num2: $('#num2Input').val()
    };

    $.ajax({
        method: 'POST',
        url: '/putInEquationInputs',
        data: objectToSend // The object is sent to line 44 of server.js
    }).then((response) => {
        console.log('Post finished.');
        getEquations();
    }).catch((response) => {
        alert('Request failed. Unable to send object.')
    })
}

// GET
// This is where we get the equations from the server side
function getEquations() {
    $.ajax({
        method: 'GET',
        url: '/equationInputs' // go to line 37 of server.js
    }).then((response) => { // Response now has data from line 39 of server.js
        console.log('equations data:', response);
        // To do: append response (equations) to DOM
        renderToDom(response);
    }).catch((response) => {
        alert('Request failed. Unable to get equations data.')
    })
}


function renderToDom(incomingArray) { // We called the render on line 86 with response in the parameters
    console.log('Inside renderToDom()');

    /* Empty the #historyOutput only once before the loop so we can append
    the history of ALL the equations in the incomingArray (response) */
    $('#historyOutput').empty('');

    // Loop through incomingArray (response) to append the answer and keep a history of each equation
    for (let equation of incomingArray) {
        // Empty the #resultOutput during each loop
        $('#resultOutput').empty('');
        // Then append the answer to the dom
        $('#resultOutput').append(`${equation.answer}`);
        // Append a history of the equations inside <li></li>
        $('#historyOutput').append(`
            <li>
                ${equation.num1}
                ${equation.operatorSign}
                ${equation.num2}
                ${'='}
                ${equation.answer}
            </li>
        `);
    }
}

// Function to clear the input fields after click the 'C' button
function clearInput() {
    $('#num1Input').val('');
    $('#num2Input').val('');
}