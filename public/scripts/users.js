$(document).ready(function() {

  $('body').ready(() => {
    $.getJSON('/test/menu', function(items) {
      for(item in items) {
        if(items[item].available) {
          $('.container').append(`
          <div class="menu-item">
            <img src="${items[item].image_url}" alt="food-picture"/>
            <div class="menu-info">
              <p> Name: ${items[item].name}</p>
              <p> Cuisine: ${items[item].cuisine}</p>
              <p> Price: ${items[item].price}</p>
            </div>
            <button >Order</button>
          </div>
        `);
        }
      }
    })
  });

});
