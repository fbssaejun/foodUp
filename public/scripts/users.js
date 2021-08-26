//  const {sendTextToCustomer} = require('../../routes/twilioRouter')

//Render Each Menu Item inside a form with button to submit order
const renderMenuItems = () => {
  $('body').ready((e) => {

    $.getJSON('/test/menu', function(items) {
      for(item in items) {
        if(items[item].available) {
          $('.container').append(`
          <form class="menu-item">
            <img src="${items[item].image_url}" alt="food-picture"/>
            <div class="menu-info" id = "${items[item].id}">
              <p> Name: ${items[item].name}</p>
              <p> Cuisine: ${items[item].cuisine}</p>
              <p> Price: ${items[item].price}</p>
            </div>
            <button type="submit">Order</button>
          </form>
        `);
        }
      }

      $('.menu-item').submit(function(event) {
        event.preventDefault();
       const itemID = $(event.target).children('div').attr('id')

        $.ajax({
          type: "POST",
          url: `/customer_menu/${itemID}`
        })
      });

    })
  });
 }

const showAfterCheckoutPage = () => {
  $(".button").click((event) => {

    event.preventDefault();
    alert('Order placed!')
    //Add another show for $0
    $('.orders').toggle('slow');
    $('h1').toggle('slow');
    $('.checkout-button').toggle('slow');
    $('.checkout-message').toggle('slow');

    $.ajax({
      type: "GET",
      url: '/api/user/order'
    })
    .then((result) => {
      console.log(result)
      const userId = result.id
      const text = `New order number: ${userId} has been placed! Start cooking : )`
      $.ajax({
        type: "POST",
        url: `/admin/sendtext`,
        data: {text}
      })
      .catch((error) => console.log(error.message))
      })

    // $.ajax({
    //   type: "POST",
    //   url: '/api/user/order/complete'
    // }).catch((error) => console.error(error.message))
    // })

  });
}



$(document).ready(function() {
  renderMenuItems();
  showAfterCheckoutPage();
});

