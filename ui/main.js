console.log('Loaded!');

var element = document.getElementById('text-content');
element.innerHTML ='Made Some Local Changes';

var imgelement = document.getElementById('img-id');

imgelement.onclick = function() {
    var interval = setInterval(imgelement.style.marginLeft = marginLeft+10 + 'px',100);
   
};