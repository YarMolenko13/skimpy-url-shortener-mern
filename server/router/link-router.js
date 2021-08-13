const Router = require('express').Router
const controller = require('../controllers/link-controller')
const authMiddleware = require('../middlewares/auth-middleware')

const router = new Router()


// router.get('/', controller.getAllLinks)
router.post('/',authMiddleware, controller.addLink)
router.get('/:userId',authMiddleware, controller.getUsersLinks)
router.delete('/:userId/:linkId', authMiddleware, controller.deleteLink)
router.delete('/:userId', authMiddleware, controller.deleteLinks)

module.exports = router