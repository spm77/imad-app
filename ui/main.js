// Counts number of times the button has been clicked.
var mybutton = document.getElementById("counter");
var counter = 0;

mybutton.onclick = function() {
    // Create a request
    var request = new XMLHttpRequest();
    
    // Capture the response and store in a variable
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            // Take action
            if (request.status === 200 ) {
                var counter = response.responseText;
                var span = document.getElementById("count");
                span.innerHTML = counter;
            }
        }
        // not done yet.
    };
    
    // Make the request
    request.open('GET', "https://http://samandpriscilla.imad.hasura-app.io/counter", true);
    request.send(null);
    
};