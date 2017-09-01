

// Submit name
var nameInput = document.getElementById('name');
var nameToSearch = nameInput.value;
var submit_btn = document.getElementById('submit_btn');

submit_btn.onclick = function() {
    // Create a request
    var request = new XMLHttpRequest();
    
    // Capture the response and store in a variable
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            // Take action
            if (request.status === 200 ) {
                // Capture a list of names and render it as a list.
                var names = request.response.Text;
                names = JSON.parse(names);
                for (var i=0; i< names.length; i++) {
                    list += '<li>' + names[i] + '</li>';
                }
    
                var ul = document.getElementById('namelist');
                ul.innerHTML = list;
            }
        }
        // not done yet.
    };
    
    // Make the request
    request.open('GET', "http://samandpriscilla.imad.hasura-app.io/submit-name?name="+nameToSearch, true);
    request.send(null);
};

