$(document).ready(onReady);

function onReady() {
    console.log('jQUery is loaded!');

    // Listener for addition button
    $('#additionBtn').on('click', additionOperator);

    // Listener for equal button
    $('#equalBtn').on('click', sendEquation);

}

let operatorSign = '';

// will probably have to add more functions for the rest of the operators
function additionOperator() {
    console.log('Inside additionOperator()');
    operatorSign = '+';
    console.log('Addition operator:', operatorSign);
}

// POST
// Send equation object (num1, operatorsign, num2) to the server
function sendEquation() {
    console.log('Inside sendEquation()');

    let objectToSend = {
        num1: $('#num1Input').val(),
        operatorSign,
        num2: $('#num2Input').val()
    };

    $.ajax({
        method: 'POST',
        url: '/putInEquationInputs',
        data: objectToSend
    }).then((response) => {
        console.log('Post finished.');
        $('#num1Input').val('');
        $('#num2Input').val('');
        getEquations();
    }).catch((response) => {
        alert('Request failed. Unable to send object.')
    })
}


// This is where we get the equations from the server side
// And then....
function getEquations() {
    $.ajax({
        method: 'GET',
        url: '/equationInputs'
    }).then((response) => {
        console.log('equations data:', response);
        // To do: append equations to DOM
        renderToDom(response);
    }).catch((response) => {
        alert('Request failed. Unable to get equations data.')
    })
}


function renderToDom(incomingArray) {
    console.log('Inside renderToDom()');

    // Append answer to the #resultOutput
    // $('#resultOutput').empty('');

    for (let equation of incomingArray) {
        $('#resultOutput').empty('');
        $('#resultOutput').append(`${equation.answer} `);
    }
}