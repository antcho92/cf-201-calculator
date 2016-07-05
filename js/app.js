window.onload = function() {

    // Assign all needed elements
    var display = document.querySelector('#display p'),
        // creates nodelist of buttons
        buttons = document.getElementsByTagName('button'),
        clear = document.querySelector('.clear'),
        mem = document.querySelector('.mem'),
        // calcReset turns to true after pressing enter so that next value will reset the clock or an operator will add to the sum
        calcReset = false;

    console.log(buttons);

    // Create a for loop that makes event handlers for each button in the nodelist buttons
    for (var i = 0; i < buttons.length; i++) {
        if (buttons[i].textContent === "AC") {
            buttons[i].addEventListener('click', allClear());
        } else if (buttons[i].textContent === "=") {
            buttons[i].addEventListener('click', calculate());
        } else if (buttons[i].textContent === 'DEL') {
            buttons[i].addEventListener('click', del());
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
    // Not sure why I need to return an inner function instead of just have the inner part of the function
    function calculate() {
        return function() {
            display.innerHTML = eval(display.innerHTML);
            calcReset = true;
        };
    }

    function del() {
        return function() {
            if (calcReset) {
                display.textContent = '';
                calcReset = false;
            } else {
                display.innerHTML = display.textContent.slice(0, -1);
            }
        };
    }

    function allClear() {
        return function() {
            display.textContent = '';
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
