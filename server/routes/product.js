const express = require("express");
const router = express.Router();
//controllers
const{create,list,remove,read,update,listBy,searchFilters}=require('../controllers/product')
//midlleware
const {auth,adminCheck}=require('../middleware/auth')

//router.post('/product',auth,adminCheck,create)
router.post('/product',auth,adminCheck,create)
router.get('/product/:count',list)
router.delete('/product/:id',auth,adminCheck,remove)
//update
router.get('/products/:id',read)
router.put('/product/:id',update)

router.post('/productby',listBy)
//filter
router.post('/search/filters',searchFilters)


module.exports = router;