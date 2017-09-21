
// Submit name
var submit_btn = document.getElementById('submit_btn');

submit_btn.onclick = function() {

    // Create a request
    var request = new XMLHttpRequest();
    
    // Capture the response and store in a variable
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            // Take action
            if (request.status === 200 ) {
                console.log('user is logged in.');
                alert('logged in successfully.');
            } else if (request.status === 403) {
                alert('invalid username/password');
            } else if (request.status === 500) {
                alert('something else went wrong');
            }
        }
        // not done yet.
    };
    
    // Make the request
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    
    request.open('POST', "http://samandpriscilla.imad.hasura-app.io/login", true);
    request.setRequestHeader('Content-type', 'application/json');
    request.send(JSON.stringify({username: username, password: password}));
};

// Create new user

var createUser_btn = document.getElementById('createUser_btn');

createUser_btn.onclick = function() {
    // Create a request
    var request = new XMLHttpRequest();
    alert("Create User clicked");
    // Capture the response and store in a variable
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            // Take action
            if (request.status === 200 ) {
                console.log('user successfully created.');
                alert('user created.');
            } else if (request.status === 500) {
                alert('user already exists');
            }
        }
        // not done yet.
    };
    
    // Make the request
    var username = document.getElementById('cusername').value;
    var password = document.getElementById('cpassword').value;
    
    request.open('POST', "http://samandpriscilla.imad.hasura-app.io/create-user", true);
    request.setRequestHeader('Content-type', 'application/json');
    request.send(JSON.stringify({username: username, password: password}));

};
