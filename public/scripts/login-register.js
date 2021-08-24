$(document).ready(function() {

 // Catch default event handler for sign-up Button on login/register form,
 // supress it and replace with a custom one made with Ajax

  $("#sign-in").submit(function(event){
      event.preventDefault();
      const login = $(this).children('input').first().val()
      const password =$(this).children('input').eq(1).val()
      const sentData = {login, password}
      if(login && password) {
        $.post("/login", sentData)
          .then(() => window.location.href = '/customer_menu')
          .catch(() => $("#sidebar-wrapper").toggle( "slide" ))
      }
  });

  $("a[name = 'logout']").on('click', (event)=> {
    event.preventDefault();
    $.get('/logout')
      .then(()=> window.location.href = '/')
  });

});
