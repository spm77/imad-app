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
                var counter = request.responseText;
                var span = document.getElementById("count");
                span.innerHTML = counter;
            }
        }
        // not done yet.
    };
    
    // Make the request
    request.open('GET', "http://samandpriscilla.imad.hasura-app.io/counter", true);
    request.send(null);
};

// Submit name
var nameInput = document.getElementById('name');
var nameToSearch = nameInput.value;
var submit_btn = document.getElementById('submit_btn');
submit_btn.onclick = function() {
    // Make a request to the server and send the name
    
    // Capture a list of names and render it as a list.
    var names = ['name one', 'name two', 'name three'];
    var list = '';
    for (var i=0; i< names.length; i++) {
        list += '<li>' + names[i] + '</li>';
    }
    
    var ul = document.getElementById('namelist');
    ul.innerHTML = list;
};