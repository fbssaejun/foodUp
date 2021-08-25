
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
    const $container = $('.dashboard');
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
  const $container = $('.d-2');
  $container.empty();
  for (const element of data) {
    const $data = createDashBoardElement(element);
    $container.append($data);
  }
};









$(document).ready(function() {
  loadDashboardItems();
});
