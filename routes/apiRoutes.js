const {getMenuItems,getAllOrders,getMenuItem, getActiveOrderDetails, updateMenuItem} = require('../db/rundb/owner_queries.js');
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
          .send("❌ Permission Denied! YoMORGENSHTERNu don't have permissions to view this page");
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
          .send("❌ Permission Denied! You don't have permissions to view this page");
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
          .send("❌ Permission Denied! You don't have permissions to view this page");
        }
      })

  });


  return router;




}
