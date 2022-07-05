const express= require('express');
const router= express.Router();

//to access user_controller
const userController= require('../controllers/user_controller');

//to access users/profile
router.get('/profile',userController.profile);

module.exports=router;