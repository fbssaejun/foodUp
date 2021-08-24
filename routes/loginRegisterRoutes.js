const {checkUserExists, getUserPassword, getUserID, addUser} = require('../db/rundb/login_queries.js');
const bcrypt = require('bcrypt');

module.exports = function(router) {
  ///Helper function for a promise:

  const checkPassword = function(check, login, userpassword) {
    if (Number(check) === 1) {
      return getUserPassword(login)
      .then((systemPassword) => {
        // console.log("This is user password", userpassword)
        // console.log("This is database password:", systemPassword['password'])
        // console.log(bcrypt.compareSync(userpassword, systemPassword['password']))
        return (bcrypt.compareSync(userpassword, systemPassword['password']))
      }) ;
    }
  }

  //Login route which will redirect user to customer_page if his attempt is succesfull

  router.post('/login', (req, res) => {
    const {login, password} = req.body;
    checkUserExists(login)
      .then((data) => data['count'])
      .then((data) => {
        checkPassword(data, login, password)
          .then((result) => {
            if (result) {
              getUserID(login)
              .then((data)=> {
                userID = data['id'];
                const isCustomer = data['customer'];
                if (isCustomer) {
                  req.session.userid = userID.id;
                res
                  .status(200)
                  .json({ success: 'customer'});
                } else {
                  res
                  .status(200)
                  .json({success: 'owner'})
                }
              });
            } else {
              res
                .status(401)
                .json({ success: false });
            }
          })
      })
      .catch((error) => res.status(404).json({result : false}));
  });

  //logout route

  router.get('/logout', (req, res) => {
    // Clear session cookies after user logout.
      req.session = null;
      res
        .status(200)
        .json({ success: true });
  });


  //New user registration route
  router.post('/register', (req, res) => {
    const {login, passwordUnHashed} = req.body;
    const password = bcrypt.hashSync(passwordUnHashed, 10);
    checkUserExists(login)
      .then((data) => {
          if(Number(data['count']) === 0) {
            addUser(login, password)
              .then((id) => {
                userID = id;
                req.session.userid = userID.id;
                res
                .status(200)
                .json({ success : true})
              })
              .catch((error) => {
                res
                .status(401)
                .json({succes : false})
              });
          } else {
            res
             .status(400)
             .json({success : false})
          }
      }
      )
      .catch((error) => {
        res
          .status(401)
          .json({succes : false})
      })
  })
}
