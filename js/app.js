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
        maxChars = 25;



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
            mem[i].addEventListener('click', memSave);
        } else if (mem[i].textContent === 'MR') {
            mem[i].addEventListener('click', memRecall);
        } else if (mem[i].textContent === 'MC') {
            mem[i].addEventListener('click', memClear);
        } else {
            mem[i].addEventListener('click', memAdd);
        }
    }

    function handleNumber(e) {
        current = display.innerHTML;
    }


    // function for calculations when pressing '=' button
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
        current = display.textContent
        localStorage.setItem('memValue', current);
        //memCheck();
    }

    function memRecall(e) {
        current = localStorage.getItem('memValue');
        if (localStorage.memValue) {
            current = localStorage.memValue
        } else {
            current = display.textContent;
        }
        display.textContent = current;
    }

    function memClear(e) {
        localStorage.removeItem('memValue');
    }

    function memAdd(e) {
        var prevMem = localStorage.getItem('memValue');
        localStorage.setItem('memValue', eval(prevMem) + eval(current));
    }
    //Perhaps implement a way to gray out memory buttons when nothing is saved
    /*memCheck() {
        if (localStorage.memValue) {
            document.getElementById('memAdd').disabled=false;
            document.getElementById('memRecall').disabled=false;
            document.getElementById('memClear').disabled=false;
        } else {
            document.getElementById('memAdd').disabled=true;
            document.getElementById('memRecall').disabled=true;
            document.getElementById('memClear').disabled=true;
        }
    }
    if (localStorage.memValue) {

    }
    memCheck();*/

    function lengthCheck(e) {
        if (current.length <= maxChars) {

        }
    }

    window.onkeyup = function(e) {
        e.preventDefault();
        var key = e.keyCode ? e.keyCode : e.which;

        if (key >= 96 && key <= 105) {
            myCalculator.handleNumber(key - 96)
        } else if (key === 107) {
            myCalculator.handleOperator('+');
        } else if (key === 109) {
            myCalculator.handleOperator('-');
        } else if (key === 53) {
            myCalculator.handleOperator('%');
        } else if (key === 106) {
            myCalculator.handleOperator('*');
        } else if (key === 111) {
            myCalculator.handleOperator('/');
        } else if (key === 110) {
            myCalculator.handleOperator('.');
        } else if (key === 8) {
            myCalculator.clearEntry();
        } else if (key === 46) {
            myCalculator.allClear();
        } else if (key === 13) {
            myCalculator.getTotal();
        }
    }

    document.getElementById('popup').onClick = function() {

    }

};
