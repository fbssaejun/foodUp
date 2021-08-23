$(document).ready(function() {

  $(".container").append(() => {
    $.getJSON('/test/menu', function(items) {
      for(item in items) {
      if(items[item].available) {
      $('.container').append(`
      <div class="menu-item">
      <p> Name: ${items[item].name}</p>
      <p> Cuisine: ${items[item].cuisine}</p>
      <p> Price: ${items[item].price}</p>
      <button>Order</button>
      </div>
      `);
      }
    }
    })
  });
});
