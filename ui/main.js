console.log('Loaded!');

var element = document.getElementById('text-content');
element.innerHTML ='Made Some Local Changes';

var imgelement = document.getElementById('img-id');
var marginLeft =0;
function moveRight()
{
    marghinLeft = marginLeft + 10;
     imgelement.style.marginLeft = marginLeft + 'px';
}
imgelement.onclick = function() {
    var interval = setInterval(moveRight,100);
   
};