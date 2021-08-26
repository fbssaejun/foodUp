// const bcrypt = require('bcrypt');
const {getMenuItemsForClients, getClientOrders, getUsers} = require('../db/rundb/client_queries.js');
const loginRegisterRoutes = require('./loginRegisterRoutes.js')
// const bcrypt = require('bcrypt');
const {getOrderItemsForClient, addMenuItemsToOrder, addNewOrder, checkIfItemInOrder, incrementItemInOrder, getOrderItems, decrementItemInOrder, countItemsInorder, deleteItemInOrder} = require('../db/rundb/orderQueries')

module.exports = function(router) {

  /* ====================================================================================================================================
  ====================================================== GET ROUTES  ====================================================================
  =======================================================================================================================================*/


  router.get('/customer_menu', (req, res) => {
    getMenuItemsForClients()
    .then((items) => {
      userId = req.session.userid
      const templateVars = {items, userId}
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
  ================================================ DELETE / SUBTRACT ORDER ROUTES =======================================================
  =======================================================================================================================================*/
  // Mutate router object by adding routes for login/registration
  loginRegisterRoutes(router);

  router.get('/orders', (req, res) => {
    userId = req.session.userid
    getMenuItemsForClients()
    .then(menus => {
    getOrderItems(userId)
    .then(result => {
      res
      .status(200)
      .render('orders', {result, menus})
    }
  )
 })
})


  router.post("/orders/:orderId/:itemId/delete", (req,res) => {
    userId = req.session.userid
    itemId = req.params.itemId
    orderId = req.params.orderId

    getOrderItems(userId)
    .then(orders => {

      const menu_id = itemId;
      const order_id = orderId;

      countItemsInorder(order_id, menu_id)
      .then(data => {
        console.log("Count:" ,data)
        if(data[0].quantity > 1) {
          return decrementItemInOrder(order_id, menu_id)
        } else {
          return deleteItemInOrder(order_id, menu_id)
        }
      })
    })
    .then(result => {
      res
      .status(200)
      .redirect('/orders')
    })
  })


  router.post('/sendText', (req, res) => {

})



/* =====================================================================================================================================
  ====================================================== CREATE /ADD ORDER ROUTES =======================================================
  =======================================================================================================================================*/
//A helper function to check if an item already in order

const checkAndAddItem = function(orderId, menuId) {
  return checkIfItemInOrder(orderId, menuId)
    .then((result) => {
      // console.log("RESULT:", result)
      if (Number(result['count']) === 0) {
        return addMenuItemsToOrder(orderId, menuId);
        // console.log(addMenuItemsToOrder(orderId, menuId));
      } else {
        // console.log(incrementItemInOrder(orderId, menuId))
        return incrementItemInOrder(orderId, menuId);
      }
    })
}

  router.post('/customer_menu/:menuID', (req, res) => {


    // There are few things missing here!!!
    // Need to check if user is logged in
    const userId = req.session.userid;
    const menuId = req.params.menuID;
    let orderID;
    getOrderItemsForClient(userId)
    .then(data => {
      if (data.length !== 0) {
        // console.log(data)
        orderID = data[0].id;

      }
      if(data.length === 0) {
        addNewOrder(new Date().toDateString(), 'good food', 50, userId)
        .then(orderId => {

          addMenuItemsToOrder(orderId, menuId)
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
        checkAndAddItem(orderID, menuId)
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

