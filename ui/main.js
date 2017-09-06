
var submit = document.getElementById('submit_id');
submit.onclick = function () {
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function() {
      if(request.readyState === XMLHttpRequest.DONE)
      {
          if(request.status === 200)
          {
            console.log('user logged in');
            alert('Logged in successfully');
              
          }//if
          if(request.status === 403)
          {
              alert('Invalid password/username');
          }
          if(request.status === 500)
          {
              alert('Something went wrong');
          }
      }//if
    };
    
    var user = document.getElementById('username').value;
    var pass = document.getElementById('password').value;
    console.log(username);
    console.log(password);
    request.open('POST','http://u707viee.imad.hasura-app.io/login',true);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.strinfigy({username:username,password:password}));
};

