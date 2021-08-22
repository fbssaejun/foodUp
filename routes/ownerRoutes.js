const {getMenuItems,getAllOrders,getMenuItem, getOrderDetails} = require('../db/rundb/owner_queries.js')

module.exports = function(router) {

  router.get('/menu/:item', (req, res) => {
    const itemID = req.params.item;
    getMenuItem(itemID)
      .then(data => {
        res
          .status(200)
          .json(data)
      })
      .catch(error => {
         res
            .status(500)
            .send("Catch :", error.message)
      });
  });

  return router;
}
