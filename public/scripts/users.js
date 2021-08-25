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


 const removeMenuItems = () => {
  $('body').ready((e) => {
        $('.remove-item').submit(function(event) {
          event.preventDefault();
          const itemId = $(event.target)
          const orderId = 1;

          console.log("Item ID: ", itemId)

          $.ajax({
            type: "POST",
            url: `/orders/${orderId}/${itemId}/delete`
          })
        });
      });


 }



$(document).ready(function() {
  renderMenuItems();
  removeMenuItems();
});
