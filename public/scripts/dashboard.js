
const loadDashboardItems = () => {
    $.get('/api/orders')
    .then((data) => {
      console.log(data)
      renderOrders(data);
    });
  };

  const createDashBoardElement =function(item){

    const $line = $(`
            <form>
            <div>${item.id}</div>
             <div>${item.ordered_at}</div>
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
    const $header = `<div class="header">
                    <h3>Order ID</h3>
                    <h3>Time Placed</h3>
                    <h3>Ordered Items</h3>
                    <h3>Quantity</h3>
                    <h3>Instructions</h3>
                    <h3>Accept Order</h3>
                    <h3>Reject Order</h3>
                    </div>`
    $container.append($header);
    for (const element of data) {
      const $data = createDashBoardElement(element);
      $container.append($data);
    }
  };





$(document).ready(function() {
  loadDashboardItems();
});
