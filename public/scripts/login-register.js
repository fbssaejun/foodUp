$(document).ready(function() {

 // Catch default event handler for sign-up Button on login/register form,
 // supress it and replace with a custom one made with Ajax

  $("#sign-in").submit(function(event){
      event.preventDefault();
      const login = $(this).children('input').first().val()
      const password =$(this).children('input').eq(1).val()
      const sentData = {login, password}
      console.log(sentData)
      if(login && password) {
        console.log("HELLO!")
        $.post("/login", sentData);
      }
  });

});
