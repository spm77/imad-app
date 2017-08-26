console.log('Loaded!');
var myelement = document.getElementById('main-text');
myelement.innerHTML = 'New Value here...';

var myimg = document.getElementById('madi');

var marginLeft = 0;

function moveRight() {
    marginLeft = marginLeft + 10;
    myimg.style.marginLeft = marginLeft + 'px';
}

myimg.onclick = function() {    
    //myimg.style.marginLeft = myimg.style.marginLeft + 100; 
    var interval = setInterval(moveRight, 10);
    
};