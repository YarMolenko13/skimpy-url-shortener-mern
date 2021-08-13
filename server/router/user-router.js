const Router = require('express').Router
const controller = require('../controllers/user-controller')
const authMiddleware = require('../middlewares/auth-middleware')
const {body} = require('express-validator')

const router = new Router()

router.get('/', authMiddleware, controller.getAllUsers)
router.delete('/', controller.deleteAllUsers)
router.post('/registration',
    // body('email').isEmail(),
    // body('password').isLength({min: 7, max: 30}),
    // body('name').isEmpty(),
    controller.register)
router.post('/login', controller.login)
router.get('/auth', authMiddleware, controller.auth)
router.get('/:userId', authMiddleware, controller.getUserById)

module.exports = router
