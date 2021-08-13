const userService = require('./../services/user-service')
const ApiError = require('../exceptions/api-erros')
const {validationResult} = require('express-validator')
const tokenService = require("../services/token-service");

class UserController {
    async register(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                console.log(errors)
                return next(ApiError.unprocessable('Ошибка при валидации', res))
            }
            const {email, password, name} = req.body
            const data = await userService.register(email, password, name)
            return res.json({user: data.userDto, token: data.tokens.accessToken})
        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const data = await userService.login(email, password)
            return res.json({user: data.userDto, token: data.tokens.accessToken})
        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    async auth (req, res, next) {
        try {
            console.log(req.user)
            const tokens = await tokenService.createTokens({id: req.user.id, email: req.user.email})
            return res.json({
                token: tokens.accessToken,
                userId: req.user.id
            })
        } catch (e) {
            throw ApiError.badRequest(e.message)
            next()
        }
    }
    async getAllUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers()
            return res.json({users})
        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    async deleteAllUsers(req, res, next) {
        try {
            const data = await userService.deleteAllUsers()
            return res.json(data)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    async getUserById(req, res, next) {
        try {
            const {userId} = req.params
            const data = await userService.getUserById(userId)
            return res.json(data)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }
}

module.exports = new UserController()