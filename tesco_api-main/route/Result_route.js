const express=require('express')
const { get_all_result } = require('../controller/Result_controller')

const Result_Router=express.Router()

Result_Router.get('/result',get_all_result)
module.exports=Result_Router