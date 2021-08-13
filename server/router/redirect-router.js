const Router = require('express').Router
const controller = require('../controllers/link-controller')

const router = new Router()

router.get('/:linkUuid', controller.redirect)


module.exports = router