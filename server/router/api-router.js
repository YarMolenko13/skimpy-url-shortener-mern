const Router = require('express').Router
const userRouter = require('./user-router')
const linkRouter = require('./link-router')

const router = new Router()

router.use('/user', userRouter)
router.use('/link', linkRouter)

module.exports = router