

const $form = $(`
  <form id = "edit-form">
  <div><label>Enter Name</label><input id = "name" value = "" type = "text"></input></div>
  <div><label>Enter Price</label><input id = "price" value ="" type = "number"></input></div>
  <div><label>Enter Calories</label><input id ="calories" value = "" type = "number"></input></div>
  <div><label>Enter Cuisine</label><input id ="cuisine" value = "" type = "text"></input></div>
  <div><label>Enter Picture URL</label><input id = "image" value = ""></input></div>
  <div> <fieldset id = "group1">
  <div><label for="true">Show On the Menu</label>
  <input type="radio" value="value1" name="group1" id="true" checked></div>
  <div><label for="false">Hide on the Menu</label>
  <input type="radio" value="value2" name="group1" id = "false"></div>
  </fieldset></div>
  <div id = 'button-storage'><button type="submit" class = "submit-edit" id ="edit-submit">Create</button><button type="submit" class = "submit-edit" id = "cancel">Cancel</button><div>
  </div>
  <div id = "pic-store">
  <img src="" alt="No Picture Loaded" id = "picture">
  </div id = "pic-store">
  </form>
`)

const fadeAway = function() {
  $form.fadeOut("slow");
  $('#hideclass').fadeIn("slow");
  $('.dashboard-2').fadeIn("slow");
  $('#close-item').fadeOut("slow");
  $('#close-item').css('display', 'flex');
  $('#add-item').fadeIn("slow");
}

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
    fadeAway();
  })

  $form.on('submit', (event) => {
    event.preventDefault();
    if (event.originalEvent.submitter.id === "cancel"){
      fadeAway();
    } else if (event.originalEvent.submitter.id === "edit-submit"){
      const Name = $form.find('#name').val();
      const Price = $form.find('#price').val();
      const Calories = $form.find('#calories').val();
      const Cuisine = $form.find('#cuisine').val();
      const Picture = $form.find('#image').val();
      let Availability;
      if ($form.find('#true').is(":checked")) {
        Availability = 1;
     } else if ($form.find('#false').is(":checked")){
       Availability = 0;
     }
      const request = {
        Name,
        Price,
        Calories,
        Cuisine,
        Picture,
        Availability
      }
      $form.find('#name').val("");
      $form.find('#price').val("");
      $form.find('#calories').val("");
      $form.find('#cuisine').val("");
      $form.find('#image').val("");

      $.ajax({
        type: "POST",
        url: `../api/menu/create/item/`,
        data: request,
      })
      .then(() => {
      fadeAway();
      loadDashboardMenu()});
    }
  });

  const $image = $form.find('#image')
  $image.on("paste", function(){
    let element = this;
  setTimeout(function () {
    var text = $(element).val();
    $image.attr("src", text);
    $("#pic-store").empty();
    const $newImage = `<img src=${text} alt="No Picture Loaded" id = "picture"></img>`
    $("#pic-store").append($newImage);
  }, 100);
  })
});
