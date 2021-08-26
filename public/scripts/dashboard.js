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

const createDashBoardElement = function (item) {
  let acceptedID = "accept"
  if(item['accepted'][0] === true) {
    acceptedID = "acceptedID"
  }

  const $first = $('<div>').addClass('product');
  const $line = $(`
            <form>
            <div>${item.id}</div>
             <div>${timeago.format(item.ordered_at)}</div>
             <button type="submit" id = "view">View Details</button>
             <button type="submit" id = ${acceptedID}>Accept</button>
             <button type="submit" id = "complete">Complete</button>
             <button type="submit" id = "reject">Reject</button>
             </div>
             </form>
      `)


    const $orderform = $(`<div id = "show-order">`);
    const numberOfItems = item['menu_id'].length;
    for (let i = 0; i < numberOfItems; i++){
      const $line = $(`<div id = "show-row">
      <div id = "item-show">Menu ID: ${item['menu_id'][i]}</div>
      <div id = "item-show">Name: ${item['name'][i]}</div>
      <div id = "item-show">Quantity: ${item['quantity'][i]}</div></div>`)
      $orderform.append($line)
    }
    const $instructions = $(`<div id = "item-show">Instructions: ${item['instructions']}</div></div>`)
    $orderform.append($instructions)

    const $rejectform = $(`<div id = "reject-slide">
        <form>
          <div id = "reject-container">
          <div><label>Enter Rejection Text</label><input id = "reject-txt" value = "" type = "text"></input></div>
          <button type="submit" id = "btn-reject">Send Rejection</button>
          </div>
        </form>
    </div>`)

    const $acceptform = $(`<div id = "accept-slide">
    <form>
      <div id = "accept-container">
      <div><label>Enter Notification for Customer</label><input id = "accept-txt" value = "" type = "text"></input></div>
      <button type="submit" id = "btn-accept">Accept Order</button>
      </div>
    </form>
    </div>`)

  // setTimeout(() => {}, 100);
  $line.on('submit', (event) => {
    event.preventDefault();
    //Event if show button was clicked
    if (event.originalEvent.submitter.id === "view") {
      if($($orderform).css("display") === "none") {
        $($orderform).slideDown("slow");
      } else {
        $($orderform).slideUp("slow");
      }
    }  else if ((event.originalEvent.submitter.id === "reject")) {
      //If reject sent a sorry email and remove order from the database;
      if($($rejectform).css("display") === "none") {
        $($rejectform).slideDown("slow");
        $rejectform.on('submit', (event) => {
          event.preventDefault();
          const comment = $rejectform.find('#reject-txt').val();
          const text = `Sorry your request number ${item.id} was rejected. ` + comment;
          $.ajax({
            type: "POST",
            url: `/admin/sendtext`,
            data: { text }
          })
          .then(() => console.log("Hi!"))
          // Remove order from the database:
          $.ajax({
            type: "POST",
            url: `/api/order/${item.id}/delete`,
            data: { text }
          })
            .then(() => loadDashboardItems())
        })
      } else {
        $($rejectform).slideUp("slow");
      }
    } else if ((event.originalEvent.submitter.id === "accept")){
      if($($acceptform).css("display") === "none") {
        $($acceptform).slideDown("slow");
        $acceptform.on('submit', (event) => {
          event.preventDefault();
          const comment = $acceptform.find('#accept-txt').val();
          const text = `Your request number ${item.id} was accepted and we started working on it! ` + comment;
          //Send text to customer
          const $button = $line.find('#accept')
          // $button.removeClass('#btn-accept');
          // $button.addClass('#btn-grey');
          $button.text("Accepted");
          $.ajax({
            type: "POST",
            url: `/api/order/${item.id}/accept`
          })
          .then(() => loadDashboardItems())
          $.ajax({
            type: "POST",
            url: `/admin/sendtext`,
            data: { text }
          })
          .then(() => loadDashboardItems())
        })
      } else {
        $($acceptform).slideUp("slow");
      }
    } else if ((event.originalEvent.submitter.id === "complete")) {
      const text = `Your order number ${item.id} has been completed. Enjoy!`
      $.ajax({
        type: "POST",
        url: `/admin/sendtext`,
        data: { text }
      })
      .then(() => {})
      $.ajax({
        type: "POST",
        url: `/api/order/${item.id}/complete`,
        data: { text }
      })
      .then(() => loadDashboardItems())
    }
  });
  return $first.append($line, $orderform, $rejectform, $acceptform);

};

const renderOrders = (data) => {
  const $container = $('#dashboard1');
  $container.empty();

  //Group order so that it does not have multiple fields.
  const groupedData = [];
  const trackOrderId = [];
  for (const el of data) {
    if (!trackOrderId.includes(el['id'])) {
      trackOrderId.push(el['id']);
      const addObject = {id: el['id'],
      ordered_at: el['ordered_at'],
      instructions: el['instructions'],
      menu_id: [el['menu_id']],
      quantity: [el['quantity']],
      name: [el['name']],
      //Added line here
      accepted: [el['accepted']]};
      groupedData.push(addObject);
    } else {
      for (const item of groupedData) {
        if (item['id'] === el['id']) {
          item['menu_id'].push(el['menu_id']);
          item['quantity'].push(el['quantity']);
          item['name'].push(el['name']);
        }
      }
    }
  }

  for (const element of groupedData) {
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

const createMenuElement = function (item) {
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
         <div><label>Edit Name</label><input id = "name" value = "${item.name}" type = "text"></input></div>
         <div><label>Edit Price</label><input id = "price" value = ${item.price} type = "number"></input></div>
         <div><label>Edit Calories</label><input id ="calories" value = ${item.kalories} type = "number"></input></div>
         <div><label>Edit Cuisine</label><input id ="cuisine" value = "${item.cuisine}" type = "text"></input></div>
         <div><label>Edit Picture</label><input id = "image" value = "${item.image_url}" type = "text"></input></div>
         <div> <fieldset id = "group1">
         <div><label for="true">Show On the Menu</label>
         <input type="radio" value="value1" name="group1" id="true" checked></div>
         <div><label for="false">Hide on the Menu</label>
         <input type="radio" value="value2" name="group1" id = "false"></div>
         </fieldset></div>
         <div id = "button-storage"><button type="submit" class = "submit-edit" id ="edit-submit">Edit</button><button type="submit" class = "submit-edit" id = "cancel">Cancel</button><div>
         </div>
         <div id = "pic-store-edit">
         <img src=${item.image_url} alt="No Picture Loaded" id = "picture-edit">
         </div id = "pic-store">
         </form>
  `)

  //SHOW EDIT FORM
  $line.on('submit', (event) => {


    if (!item.available) {
      $edit.find('#false').prop('checked', true);
    }
    event.preventDefault();
    if (event.originalEvent.submitter.id === "edit") {
      if($($edit).css("display") === "none") {
        $($edit).slideDown("slow");
      } else {
        $($edit).slideUp("slow");
      }
    } else {
      $.ajax({
        type: "POST",
        url: `/api/menu/delete/item/${item.id}`
      })
        .then(() => loadDashboardMenu())
    }
  });

  $edit.on('submit', (event) => {
    event.preventDefault();

    if (event.originalEvent.submitter.id === "cancel") {
      $edit.slideUp("slow");
    } else if (event.originalEvent.submitter.id === "edit-submit") {
      const newName = $edit.find('#name').val();
      const newPrice = $edit.find('#price').val();
      const newCalories = $edit.find('#calories').val();
      const newCuisine = $edit.find('#cuisine').val();
      const newPicture = $edit.find('#image').val();
      let newAvailability;
      if ($edit.find('#true').is(":checked")) {
        newAvailability = 1;
      } else if ($edit.find('#false').is(":checked")) {
        newAvailability = 0;
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
        .then(() => {
          $edit.slideUp("slow");
          setTimeout(function () {
            loadDashboardMenu()
          }
            , 500)
        })
    }
  })

    const $image = $edit.find('#image')
    $image.on("paste", function(){
    console.log(this)
    let element = this;
    setTimeout(function () {
    var text = $(element).val();
    $image.attr("src", text);
    console.log($edit.find("#pic-store"));
    $edit.find("#pic-store-edit").empty();
    const $newImage = `<img src=${text} alt="No Picture Loaded" id = "picture"></img>`
    console.log($newImage);
    $edit.find("#pic-store-edit").append($newImage);
  }, 300);
  })

  return $first.append($line, $edit);
};


$(document).ready(function () {
  loadDashboardItems();
  loadDashboardMenu();
});
