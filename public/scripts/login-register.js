$(document).ready(function() {

  $error = $(`<div class = 'error'>
    <div id = "error-message">
      <div id = "error-text">Error Message</div>
    </div>
    </div>`)

  const $container = $('.top-buttons')


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
          .catch(() =>  {$("#error-text").text("Your Login or Password is incorrect");
          $error.slideDown()
          $(this).children('input').first().val('')
          $(this).children('input').eq(1).val('')
        })
      }
  });

//Prevents default behaviour on logout click and overrides it with AJAX get request.
  $("a[name = 'logout']").on('click', (event)=> {
    event.preventDefault();
    $.get('/logout')
      .then(()=> {
        $error.slideUp()
        window.location.href = '/'})
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
      .catch(() => {
        $("#error-text").text("User with this login already exists");
        $error.slideDown()
        $(this).children('input').first().val('')
        $(this).children('input').eq(1).val('')
      }
      )
  }
 });
 $container.append($error);

 $('#sign-up').children('input').first().on('click', (event) =>{
    if ($('.error').css('display') !== 'none') {
      $error.slideUp()
    }
 })

 $('#sign-up').children('input').eq(1).on('click', (event) =>{
  if ($('.error').css('display') !== 'none') {
    $error.slideUp()
  }
})
$('.closebtn').on('click', (event) =>{
  if ($('.error').css('display') !== 'none') {
    $error.slideUp()
  }
});

$('#sign-in').children('input').first().on('click', (event) =>{
  if ($('.error').css('display') !== 'none') {
    $error.slideUp()
  }
})

$('#sign-in').children('input').eq(1).on('click', (event) =>{
if ($('.error').css('display') !== 'none') {
  $error.slideUp()
}
})




});
