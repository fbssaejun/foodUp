const {getMenuItems,getAllOrders,getMenuItem, getActiveOrderDetails} = require('../db/rundb/owner_queries.js');
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
          .send("❌ Permission Denied! You don't have permissions to view this page");
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

  return router;

}
