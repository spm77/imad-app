console.log('Loaded!');
var myelement = document.getElementById('main-text');
myelement.innerHTML = 'New Value here...';

var myimg = document.getElementById('madi');

var marginLeft = 0;
var interval = 0;

function moveRight() {
    marginLeft = marginLeft + 1;
    myimg.style.marginLeft = marginLeft + 'px';
}

myimg.onclick = function() {    
    //myimg.style.marginLeft = myimg.style.marginLeft + 100; 
    if (interval === 0){
      interval = setInterval(moveRight, 50);
    } else {
      clearInterval(interval);
      interval = 0;
    }
};