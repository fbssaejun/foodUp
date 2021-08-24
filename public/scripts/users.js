//Render Each Menu Item inside a form with button to submit order
const renderMenuItems = () => {
  $('body').ready((e) => {

    $.getJSON('/test/menu', function(items) {
      for(item in items) {
        if(items[item].available) {
          $('.container').append(`
          <form class="menu-item">
            <img src="${items[item].image_url}" alt="food-picture"/>
            <div class="menu-info">
              <p> Name: ${items[item].name}</p>
              <p> Cuisine: ${items[item].cuisine}</p>
              <p> Price: ${items[item].price}</p>
            </div>
            <button type="submit">Order</button>
          </form>
        `);
        }
      }
    })
  });
 }

//Submit orders to orders icon, listens to submit from the form
 const submitOrders = function() {
  $('.container').submit(function(event) {
    event.preventDefault();
    const addedItem = event.target;
    console.log(addedItem)
    });
  }


$(document).ready(function() {
  renderMenuItems();
  submitOrders();
});
