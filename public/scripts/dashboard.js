
const loadDashboardItems = () => {
    $.get('/api/orders')
    .then((data) => {
      renderOrders(data);
    });
  };

  const loadDashboardMenu = () => {
    $.get('/api/menu')
    .then((data) => {
      renderItems(data);
    });
  };

/* =====================================================================================================================================
=======================================  CREATE FIRST DASHBOARD  =======================================================================
========================================================================================================================================*/

  const createDashBoardElement =function(item){

    const $line = $(`
            <form>
            <div>${item.id}</div>
             <div>${timeago.format(item.ordered_at)}</div>
             <div>Item: ${item.name}</div>
             <div>${item.quantity}</div>
             <div>${item.instructions}</div>
             <button type="submit" id = "Accept">Cancel</button>
             <button type="submit" id = "Ready!">Ready</button>
             </div>
             </form>
      `)
    console.log($line)
    return $line;

  };

  const renderOrders = (data) => {
    const $container = $('#dashboard1');
    console.log("Container:" ,$container)
    $container.empty();
    for (const element of data) {
      const $data = createDashBoardElement(element);
      $container.append($data);
    }
  };


  /* =====================================================================================================================================
=======================================  CREATE SECOND DASHBOARD  =======================================================================
========================================================================================================================================*/

const renderItems = (data) => {
  const $container = $('#dashboard2');
  $container.empty();

  for (const element of data) {
    const $data = createMenuElement(element);
    $container.append($data);
  }
};

const createMenuElement =function(item){
let status = "NO"
if (item.available) {
  status = "YES";
}
const $line = $(`
            <form>
            <div id = "name">${item.name}</div>
             <div id = "price">$ ${item.price}</div>
             <div id ="calories">${item.kalories}</div>
             <div id ="cuisine">${item.cuisine}</div>
             <div id = "status">${status}</div>
             <button type="submit" id = "edit">Edit</button>
             <button type="submit" id = "delete">Delete</button>
             </div>
             </form>
      `)
    console.log($line)

    // $form.on('submit', (event) => {
    //   event.preventDefault();
    //   console.log($(this));
    // });

    return $line;

  };




$(document).ready(function() {
  loadDashboardItems();
  loadDashboardMenu();
});
