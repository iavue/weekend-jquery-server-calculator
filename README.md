# Project Name

Server Side Calculator

[Project Instructions](./INSTRUCTIONS.md), this line may be removed once you have updated the README.md

## Description

Your project description goes here. What problem did you solve? How did you solve it?

This calculator allow users to input two numbers, select a mathematical operation, click '=' to receive a value as well 
as see a history of calculations, and the ability to clear the input fields with a reset button.

This project is a Node based application and utilized npm to install dependencies such as express and body-parser to build the requirements.
Once a mathematical operation is detected, ajax is utilized to POST the input fields and mathematical operation to the server.
Then the logic was built in the server to compute the numbers using If statements and responds to the client side with a 202 status. Ajax is utilized again to GET request the data from the server and then POST on the client side which allows the ability to display the answer to the equation and a list of all previous calculations on the page. 

Additional README details can be found [here](https://github.com/PrimeAcademy/readme-template/blob/master/README.md).
