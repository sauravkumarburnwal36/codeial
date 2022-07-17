const express= require('express');
const router= express.Router();

//to access user_controller
const usersController= require('../controllers/users_controller');

//to access users/profile
router.get('/profile',usersController.profile);

module.exports=router;