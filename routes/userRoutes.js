// const bcrypt = require('bcrypt');
const {getMenuItemsForClients, getClientOrders, getUsers} = require('../db/rundb/client_queries.js');
const loginRegisterRoutes = require('./loginRegisterRoutes.js')
// const bcrypt = require('bcrypt');
const {getOrderItemsForClient, addMenuItemsToOrder, addNewOrder, checkIfItemInOrder, incrementItemInOrder} = require('../db/rundb/orderQueries')

module.exports = function(router) {

  /* ====================================================================================================================================
  ====================================================== GET ROUTES  ====================================================================
  =======================================================================================================================================*/


  router.get('/customer_menu', (req, res) => {
    getMenuItemsForClients()
    .then((items) => {
      const templateVars = {items}
      res
      .status(200)
      .render("customer_menu", templateVars)})
    .catch((error) => {
      res
      .status(500)
      .send("Error: something went wrong: ", error.message)})
  });

  router.get("/users", (req, res) => {
    getUsers()
      .then(data => {
        res
        .json(data);
      })
      .catch(error => {
        res
          .status(500)
          .json(error.message);
      });
  });



  /* =====================================================================================================================================
  ====================================================== LOGIN/REGISTRATION ROUTES =======================================================
  =======================================================================================================================================*/
  // Mutate router object by adding routes for login/registration
  loginRegisterRoutes(router);

  router.get('/orders', (req, res) => {
    res
    .status(200)
    .render("orders")
})

//A helper function to check if an item already in order

const checkAndAddItem = function(orderId, menuId) {
  checkIfItemInOrder()
    .then((result) => {
      if (Number(result['count']) === 0) {
        return addMenuItemsToOrder(orderId, menuId);
      } else {
        return incrementItemInOrder(orderId, menuId);
      }
    })
}


  router.post('/customer_menu', (req, res) => {


    // There are few things missing here!!!
    // userID
    // MenuID
    // Need to check if user is logged in


    getOrderItemsForClient(userId)
    .then(data => {
      if(data.length === 0) {
        addNewOrder()
        .then(orderId => {
          addMenuItemsToOrder(orderId)
          .then(() => {
            res
            .status(200)
            .json({ success : true })
          })
          .catch(() => {
            res
            .status(401)
            .json({ success : false })
          })
        })
      } else {
        checkAndAddItem(orderId, menuId)
        .then(() => {
          res
            .status(200)
            .json({ success : true })
        })
        .catch(() => {
          res
            .status(400)
            .json({succes : false})
        });

      }
    })
    return router;
  })
}

