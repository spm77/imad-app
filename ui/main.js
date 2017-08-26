// Counts number of times the button has been clicked.
var mybutton = document.getElementById("counter");
var counter = 0;

mybutton.onClick = function() {
    // Make a request to the counter endpoint
    
    // Capture the response and store in a variable
    
    // Render the variable in the correct span
    counter = counter + 1;
    var count = document.getElementById("count");
    alert(counter.toString());
    count.innerHTML = counter.toString();
};