const Router = require('express');
const User = require('../models/User');
const router = new Router;
const bcrypt = require('bcryptjs');
const {check, validateResult} = require('express-validator');

router.post('/registration',
    [
        check('username', 'Incorrect username').isLength({min: 2}),
        check('password', 'Incorrect password').isLength({min: 2, max: 15}),
    ],
    async  (req, res) => {
  try{
      const errors = validateResult(req);
      if(!errors.isEmpty()) {
          return res.status(400).json({message: 'Incorrect request', errors});
      }
      const {username, password} = req.body;

      const candidate = await User.findOne({username})

      if(candidate){
          res.send({message: `User with username: ${username} is already exist`});
      }

      const hashPassword = await bcrypt.hash(password, 15)
      const user = new User({username, password: hashPassword});
      await user.save();
      return res.json({message: "User was created"});

  } catch (e) {
      console.error(e);
      res.send({message: 'Server error'})
  }
})

module.exports = router
