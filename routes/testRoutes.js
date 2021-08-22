const {getMenuItemsForClients, getClientOrders, getUsers} = require('../db/rundb/client_queries.js')
const {getMenuItems,getAllOrders,getMenuItem, getOrderDetails} = require('../db/rundb/owner_queries.js')

module.exports = function(router) {

  return router;
}
