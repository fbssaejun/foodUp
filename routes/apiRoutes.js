const {getMenuItems,getAllOrders,getMenuItem, getActiveOrderDetails, updateMenuItem, createMenuItem, deleteMenuItem, deleteOrder} = require('../db/rundb/owner_queries.js');
const {getBusketOrderForUser, changeStatusFromBusketFalseToTrue, completeOrder, acceptOrder} = require('../db/rundb/orderQueries.js')
const {getUserStatus} = require('../db/rundb/login_queries.js');

//user this user for owner alainarich@aol.com


module.exports = function(router) {

  router.get('/orders', (req, res) => {
    const sessionId = req.session.userid;
    getUserStatus(sessionId)
      .then((result) =>{
        if (!result) {
          getActiveOrderDetails()
            .then((data) => {
              res
              .status(200)
              .json(data)
            })
            .catch(error => console.error(error.message))
        } else {
          res
          .status(403)
          .send("❌ Permission Denied! You don't have permissions to view this page ❌");
        }
      })
  });

  router.get('/user/order', (req, res) => {
    const sessionId = req.session.userid;
    getUserStatus(sessionId)
      .then((result) =>{
        if (sessionId) {
          getBusketOrderForUser(sessionId)
            .then((result) => {
              res
              .status(200)
              .json(result)
            })
            .catch(error => console.error(error.message))
        } else {
          res
          .status(403)
          .send("❌ Permission Denied! You don't have permissions to view this page ❌");
        }
      })
  });



  router.get('/menu', (req, res) => {
    const sessionId = req.session.userid;
    getUserStatus(sessionId)
      .then((result) =>{
        if (!result) {
          getMenuItems()
            .then((data) => {
              res
              .status(200)
              .json(data)
            })
            .catch(error => console.error(error.message))
        } else {
          res
          .status(403)
          .send("❌ Permission Denied! You don't have permissions to view this page  ❌");
        }
      })
  });

  router.post('/menu/update/item/:itemid', (req, res) => {

    const sessionId = req.session.userid;
    const {id,newName,newPrice,newCalories,newCuisine,newPicture,newAvailability} = req.body;
    getUserStatus(sessionId)
      .then((result) =>{
        if (!result) {
          updateMenuItem(id,newName,newPrice,newCalories,newCuisine,newPicture,newAvailability)
            .then((data) => {
              res
              .status(200)
              .json(data)
            })
            .catch(error => console.error(error.message))
        } else {
          res
          .status(403)
          .send("❌ Permission Denied! You don't have permissions to view this page ❌");
        }
      })

  });


  router.post('/menu/create/item', (req, res) => {

    const sessionId = req.session.userid;
    const {Name,Price,Calories,Cuisine,Picture,Availability} = req.body;
    getUserStatus(sessionId)
      .then((result) =>{
        if (!result) {
          createMenuItem(Name,Price,Calories,Cuisine,Picture,Availability)
            .then((data) => {
              res
              .status(200)
              .json(data)
            })
            .catch(error => console.error(error.message))
        } else {
          res
          .status(403)
          .send("❌ Permission Denied! You don't have permissions to view this page  ❌");
        }
      })

  });

  router.post('/menu/delete/item/:itemid', (req, res) => {

    const sessionId = req.session.userid;
    const itemID = req.params.itemid;
    console.log(itemID);
    getUserStatus(sessionId)
      .then((result) =>{
        if (!result) {
          deleteMenuItem(itemID)
            .then((data) => {
              res
              .status(200)
              .json(data)
            })
            .catch(error => console.error(error.message))
        } else {
          res
          .status(403)
          .send("❌ Permission Denied! You don't have permissions to view this page  ❌");
        }
      })
  });

  router.get('/user/order/complete', (req, res) => {
    const sessionId = req.session.userid;
    getUserStatus(sessionId)
      .then((result) =>{
        if (sessionId) {
          changeStatusFromBusketFalseToTrue(sessionId)
            .then((result) => {
              console.log("This step completed")
              res
              .status(200)
              .json(result)
            })
            .catch(error => console.error(error.message))
        } else {
          res
          .status(403)
          .send("❌ Permission Denied! You don't have permissions to view this page ❌");
        }
      })
  });


  router.post('/order/:orderid/delete', (req, res) => {
    const order_id = req.params.orderid;
    const sessionId = req.session.userid;
    const {Name,Price,Calories,Cuisine,Picture,Availability} = req.body;
    getUserStatus(sessionId)
      .then((result) =>{
        if (!result) {
          deleteOrder(order_id)
            .then((data) => {
              res
              .status(200)
              .json(data)
            })
            .catch(error => console.error(error.message))
        } else {
          res
          .status(403)
          .send("❌ Permission Denied! You don't have permissions to view this page  ❌");
        }
      })
  });


  router.post('/order/:orderid/complete', (req, res) => {
    const order_id = req.params.orderid;
    const sessionId = req.session.userid;
    let today = new Date()
    today.toISOString().split('T')[0]
    const {Name,Price,Calories,Cuisine,Picture,Availability} = req.body;
    getUserStatus(sessionId)
      .then((result) =>{
        if (!result) {
          completeOrder(order_id, today)
            .then((data) => {
              res
              .status(200)
              .json(data)
            })
            .catch(error => console.error(error.message))
        } else {
          res
          .status(403)
          .send("❌ Permission Denied! You don't have permissions to view this page  ❌");
        }
      })
  });

  router.post('/order/:orderid/accept', (req, res) => {
    const order_id = req.params.orderid;
    const sessionId = req.session.userid;
    const {Name,Price,Calories,Cuisine,Picture,Availability} = req.body;
    getUserStatus(sessionId)
      .then((result) =>{
        if (!result) {
          acceptOrder(order_id)
            .then((data) => {
              res
              .status(200)
              .json(data)
            })
            .catch(error => console.error(error.message))
        } else {
          res
          .status(403)
          .send("❌ Permission Denied! You don't have permissions to view this page  ❌");
        }
      })
  });





  return router;

}
