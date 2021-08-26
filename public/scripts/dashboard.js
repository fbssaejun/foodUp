
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

  const $line = $(`
            <form>
            <div>${item.id}</div>
             <div>${timeago.format(item.ordered_at)}</div>
             <div>Item: ${item.name}</div>
             <div>${item.quantity}</div>
             <div>${item.instructions}</div>
             <button type="submit" id = "accept">Complete</button>
             <button type="submit" id = "reject">Reject</button>
             </div>
             </form>
      `)

  $line.on('submit', (event) => {
    event.preventDefault();
    if (event.originalEvent.submitter.id === "accept") {
      $($edit).slideDown("slow");
    } else {
      //If reject sent a sorry email and remove order from the database;
      const text = `Sorry your request number ${item.id} was rejected`
      $.ajax({
        type: "POST",
        url: `/admin/sendtext`,
        data: { text }
      })
        .then(() => console.log("Hi!"))
      //Remove order from the database:
      $.ajax({
        type: "POST",
        url: `/api/order/${item.id}/delete`,
        data: { text }
      })
        .then(() => loadDashboardItems())

    }
  });


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
         <div><label>Edit Name</label><input id = "name" value = "${item.name}"></input></div>
         <div><label>Edit Price</label><input id = "price" value = ${item.price}></input></div>
         <div><label>Edit Calories</label><input id ="calories" value = ${item.kalories}></input></div>
         <div><label>Edit Cuisine</label><input id ="cuisine" value = "${item.cuisine}"></input></div>
         <div><label>Edit Picture</label><input id = "image" value = "${item.image_url}"></input></div>
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
    event.preventDefault();
    if (event.originalEvent.submitter.id === "edit") {
      $($edit).slideDown("slow");
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
    console.log($edit)

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
  $image.on("paste", function () {
    let element = this;
    setTimeout(function () {
      var text = $(element).val();
      $image.attr("src", text);
      $("#pic-store-edit").empty();
      const $newImage = `<img src=${text} alt="No Picture Loaded" id = "picture-edit"></img>`
      $("#pic-store-edit").append($newImage);
    }, 100);
  });

  return $first.append($line, $edit);
};


$(document).ready(function () {
  loadDashboardItems();
  loadDashboardMenu();
});
