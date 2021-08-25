
const $form = $(`
  <form id = "edit-form">
  <div><label>Enter Name</label><input id = "name" value = ""></input></div>
  <div><label>Enter Price</label><input id = "price" value = ></input></div>
  <div><label>Enter Calories</label><input id ="calories" value = ></input></div>
  <div><label>Enter Cuisine</label><input id ="cuisine" value = ""></input></div>
  <div><label>Enter Picture URL</label><input id = "image" value = ""></input></div>
  <div> <fieldset id = "group1">
  <div><label for="True">Show On the Menu</label>
  <input type="radio" value="value1" name="group1" id="True" checked></div>
  <div><label for="False">Hide on the Menu</label>
  <input type="radio" value="value2" name="group1" id = "False"></div>
  </fieldset></div>
  <div><button type="submit" class = "submit-edit" id ="edit-submit">Create</button><button type="submit" class = "submit-edit" id = "cancel">Cancel</button><div>
  </div>
  <div id = "create image"><div>
  </form>
`)

$(document).ready(function () {
  $('#add-item').on('click', (event) => {

    console.log(event)
    $('#hideclass').fadeOut("slow");
    $('.dashboard-2').fadeOut("slow");
    $('#close-item').fadeIn("slow");
    $('#close-item').css('display', 'flex');
    $('#add-item').fadeOut("slow");
    $(".d-2").append($form);
    $form.fadeIn("slow");
  })

  $('#close-item').on('click', (event) => {
    $form.fadeOut("slow");
    $('#hideclass').fadeIn("slow");
    $('.dashboard-2').fadeIn("slow");
    $('#close-item').fadeOut("slow");
    $('#close-item').css('display', 'flex');
    $('#add-item').fadeIn("slow");
  })


});
