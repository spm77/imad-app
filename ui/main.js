console.log('Loaded!');
var myelement = document.getElementById('main-text');
myelement.innerHTML = 'New Value here...';

var myimg = document.getElementById('madi');
myimg.onclick = function() {
    myimg.style.marginLeft = 120px; //myimg.style.marginLeft + 15;
    //alert('boo boo');
}