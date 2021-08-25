
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
    return $line;

  };

  const renderOrders = (data) => {
    const $container = $('#dashboard1');
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
let status = "NO";
let checkBoxStatus = "unchecked";
if (item.available) {
  status = "YES";
  checkBoxStatus = "checked";
}
const $first = $('<div>').addClass('product');
const $line = $(`
            <form id = "menu-box">

            <div id = "name">${item.name}</div>
             <div id = "price">$ ${item.price}</div>
             <div id ="calories">${item.kalories}</div>
             <div id ="cuisine">${item.cuisine}</div>
             <div id = "status">${status}</div>
             <button type="submit" id = "edit">Edit</button>
             <button type="submit" id = "delete">Delete</button>

             </form>
      `)
      const $edit = $(`
         <form id = "edit-form">
         <div><label>Edit Name</label><input id = "name" value = "${item.name}"></input></div>
         <div><label>Edit Price</label><input id = "price" value = ${item.price}></input></div>
         <div><label>Edit Calories</label><input id ="calories" value = ${item.kalories}></input></div>
         <div><label>Edit Cuisine</label><input id ="cuisine" value = "${item.cuisine}"></input></div>
         <div><label>Edit Picture</label><input id = "image" value = "${item.image_url}"></input></div>
         <div> <fieldset id = "group1">
         <div><label for="True">Show On the Menu</label>
         <input type="radio" value="value1" name="group1" id="True" checked></div>
         <div><label for="False">Hide on the Menu</label>
         <input type="radio" value="value2" name="group1" id = "False"></div>
         </fieldset></div>
         <div><button type="submit" class = "submit-edit" id ="edit-submit">Edit</button><button type="submit" class = "submit-edit" id = "cancel">Cancel</button><div>
         </div>
         </form>
  `)



    //SHOW EDIT FORM
    $line.on('submit', (event) => {
      event.preventDefault();
      if (event.originalEvent.submitter.id === "edit") {
        $($edit).slideDown("slow");
      } else {
          console.log("This is delete!")
        }

    });

    $edit.on('submit', (event) => {
      event.preventDefault();
      console.log($edit)

      if (event.originalEvent.submitter.id === "cancel"){
        $edit.slideUp("slow");
      } else if (event.originalEvent.submitter.id === "edit-submit"){
        const newName = $edit.find('#name').val();
        const newPrice = $edit.find('#price').val();
        const newCalories = $edit.find('#calories').val();
        const newCuisine = $edit.find('#cuisine').val();
        const newPicture = $edit.find('#image').val();
        let newAvailability;
        if ($('#True').is(":checked")) {
           newAvailability = true;
        } else {
          newAvailability = false;
        }
        const request = {
          id: item.id,
          newName,
          newPrice,
          newCalories,
          newCuisine,
          newPicture,
          newAvailability
        }
        $.ajax({
          type: "POST",
          url: `../api/menu/update/item/${item.id}`,
          data: request,
        })
        .then(() => loadDashboardMenu())

      }
    })

    return $first.append($line, $edit);

  };




$(document).ready(function() {
  loadDashboardItems();
  loadDashboardMenu();
});
