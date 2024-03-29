//To require express
const express= require('express');

//To require the functionality of express.router
const router= express.Router();

//to require home_controllers
const homeController= require('../controllers/home_controller');


console.log('router loaded');
//to acces home function lies under home_controller
router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));
//for any other routers,access from here
//router.use('/routerName',require('/routerFile'));

module.exports= router;