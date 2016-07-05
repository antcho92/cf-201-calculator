window.onload = function() {

    // Assign all needed elements
    var display = document.querySelector('#display p'),
        // creates nodelist of buttons
        buttons = document.getElementsByTagName('button'),
        mem = document.querySelector('.mem'),
        // calcReset turns to true after pressing enter so that next value will reset the clock or an operator will add to the sum
        calcReset = false,
        current = '';

    console.log(buttons);

    // Create a for loop that makes event handlers for each button in the nodelist buttons
    for (var i = 0; i < buttons.length; i++) {
        if (buttons[i].textContent === "AC") {
            buttons[i].addEventListener('click', allClear());
        } else if (buttons[i].textContent === "=") {
            buttons[i].addEventListener('click', calculate());
        } else if (buttons[i].textContent === 'DEL') {
            buttons[i].addEventListener('click', del());
        } else if (buttons[i].textContent === '+/-') {
            buttons[i].addEventListener('click', plusMinus());
        } else {
            buttons[i].addEventListener('click', function() {
                if (calcReset) {
                    display.innerHTML = this.innerHTML;
                    calcReset = false;
                } else {
                    display.innerHTML += this.innerHTML;
                }
            });
        }
    }
    // function for calculations when pressing = button
    function calculate() {
        return function() {
            current = eval(display.innerHTML);
            display.innerHTML = current;
            calcReset = true;
        };
    }
    // function for the DEL button
    function del() {
        return function() {
            current = display.innerHTML;
            if (calcReset) {
                current = '';
                calcReset = false;
            } else {
                current = current.slice(0, -1);
            }
            display.textContent = current;
        };
    }
    // Function for the AC button
    function allClear() {
        return function() {
            current = '';
            display.textContent = current;
        };
    }

    function plusMinus() {
        return function() {
            // For when display is blank and would like to add a negative sign first
            current = display.textContent;
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
        };
    }

};


/* $(document).ready(function() {
  var calc = "";
  $('#total').val('0');
  $("button").click(function() {
    var next = $(this).attr("value");
    if (parseInt(next, 10) == next || next === "." || next === "/" || next === "*" || next === "-" || next === "+" || next === "%") {
      calc += next;
      $('#total').val(calc);
  } else if (next === "AC") {
      calc = "";
      $('#total').val("0");
  } else if (next === "CE") {
      calc = calc.slice(0, -1);
      $('#total').val(calc);
    } else if (next === "=") {
      calc = eval(calc);
      $('#total').val(calc);
      }
  });
}); */
