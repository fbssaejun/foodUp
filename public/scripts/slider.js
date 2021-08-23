// Get dimensions of footer and header to adjust toggable login/register form
  //Get header dimensions
const getNavSize = function() {
  let elementTop = $("nav").offset().top;
  let elementBottom = elementTop + $("nav").outerHeight();
  return elementBottom;
}

const getFooterSize = function() {
  let elementBottom = $("footer").offset().top;
  return elementBottom;
}


$(document).ready(function(){

  $("a[name='login']").on('click', (event)=> {
    event.preventDefault();
    const navHeight = getNavSize();
    const footerStart = getFooterSize();
    const startLogin = navHeight;
    const heightLogin = footerStart - navHeight;
    $("#sidebar-wrapper").css('top', navHeight)
    $("#sidebar-wrapper").css('height', heightLogin)
    $("#sidebar-wrapper").toggle( "slide" );
  });


  $(".closebtn").on('click', (event)=> {
    event.preventDefault();
    $("#sidebar-wrapper").toggle( "slide" );
  });

  $(".to-signin").on("click", function () {
    $(this)
      .addClass("top-active-button")
      .siblings()
      .removeClass("top-active-button");
    $(".form-signup").slideUp(500);
    $(".form-signin").slideDown(500);
  });

  $(".to-signup").on("click", function () {
    $(this)
      .addClass("top-active-button")
      .siblings()
      .removeClass("top-active-button");
    $(".form-signin").slideUp(500);
    $(".form-signup").slideDown(500);
  });

  $(".to-signin-link").on("click", function () {
    $(".to-signin")
      .addClass("top-active-button")
      .siblings()
      .removeClass("top-active-button");
    $(".form-signup").slideUp(200);
    $(".form-signin").slideDown(200);
  });

  $(".to-signup-link").on("click", function () {
    $(".to-signup")
      .addClass("top-active-button")
      .siblings()
      .removeClass("top-active-button");
    $(".form-signin").slideUp(200);
    $(".form-signup").slideDown(200);
  });

});
