"use strict";

window.onload = function() {

    // Assign all needed elements
    var display = document.querySelector('#display p'),
        // creates nodelist for number buttons
        numbers = document.querySelectorAll('button.num'),
        // creats nodelist for the operators
        operators = document.querySelectorAll('button.operator'),
        //create nodelist for memory buttons
        mem = document.querySelectorAll('button.mem'),
        // calcReset turns to true after pressing enter so that next value will reset the clock or an operator will add to the sum
        calcReset = false,
        current = '',
        savedValue = '';

    // for debugging
    console.log(numbers);
    console.log(operators);
    console.log(mem);

    //create a for loop for the event handlers of numbers
    for (var i = 0; i < numbers.length; i++) {
        numbers[i].addEventListener('click', function() {
            current = display.textContent;
            if (calcReset) {
                current = this.textContent;
                calcReset = false;
            } else {
                current += this.textContent;
            }
            display.textContent = current;
        });
    }
    // for loop to create operators event handlers
    for (var i = 0; i < operators.length; i++) {
        if (operators[i].textContent === "AC") {
            operators[i].addEventListener('click', allClear);
        } else if (operators[i].textContent === "=") {
            operators[i].addEventListener('click', calculate);
        } else if (operators[i].textContent === 'DEL') {
            operators[i].addEventListener('click', del);
        } else if (operators[i].textContent === '+/-') {
            operators[i].addEventListener('click', plusMinus);
        } else {
            operators[i].addEventListener('click', function() {
                display.textContent += this.textContent;
                calcReset = false;
            });
        }
    }

    // for loop for event handlers of memory buttons
    for (var i = 0; i < mem.length; i++) {
        if (mem[i].textContent === "MS") {
            mem[i].addEventListener('click', memSave())
        }
        mem[i].addEventListener('click', function() {
            console.log(this + 'was clicked')
        });
    }


    // function for calculations when pressing = button
    function calculate(e) {

        current = eval(display.innerHTML);
        display.innerHTML = current;
        calcReset = true;
    }
    // function for the DEL button
    function del(e) {

        current = display.innerHTML;
        if (calcReset) {
            current = '';
            calcReset = false;
        } else {
            current = current.slice(0, -1);
        }
        display.textContent = current;

    }
    // Function for the AC button
    function allClear(e) {

        current = '';
        display.textContent = current;

    }

    function plusMinus(e) {

        current = display.textContent;
        // For when display is blank and would like to add a negative sign first
        if (current === '') {
            current = '-';
            // for when you want to switch the sign of a number that's input in the display already
        } else {
            if (current.indexOf('-') == 0) {
                current = current.substring(1, current.length);
            } else {
                current = '-' + current;
            }
        }
        display.textContent = current;

    }

    function memSave(e) {

        if (localStorage.memValue) {

            localStorage.setItem('')
        }

    }

};
