$(document).ready(function() {

 // Catch default event handler for sign-up Button on login form,
 // supress it and replace with a custom one made with Ajax

  $("#sign-in").submit(function(event){
      event.preventDefault();
      const login = $(this).children('input').first().val()
      const password =$(this).children('input').eq(1).val()
      const sentData = {login, password}
      if(login && password) {
        $.post("/login", sentData)
          .then((result) => {
            if(result.success === 'customer'){
              window.location.href = '/customer_menu'
            } else {
              window.location.href = '/admin/dashboards'
            }
          })
          .catch(() => $("#sidebar-wrapper").toggle( "slide" ))
      }
  });

//Prevents default behaviour on logout click and overrides it with AJAX get request.
  $("a[name = 'logout']").on('click', (event)=> {
    event.preventDefault();
    $.get('/logout')
      .then(()=> window.location.href = '/')
  });

// Catch default event handler for sign-up Button on login form,
 // supress it and replace with a custom one made with Ajax
 $('#sign-up').submit(function(event){
  event.preventDefault();
  const login = $(this).children('input').first().val()
  const passwordUnHashed =$(this).children('input').eq(1).val()
  const sentData = {login, passwordUnHashed}
  console.log(sentData);
  if(login && passwordUnHashed) {
    $.post("/register", sentData)
      .then(() => window.location.href = '/customer_menu')
      .catch(() => $("#sidebar-wrapper").toggle( "slide" ))
  }
 });

});
