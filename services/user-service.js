const UserModel = require('../models/user-model')
const bcrypt = require('bcrypt')
const UserDto = require('../dtos/user-dto')
const ApiError = require('../exceptions/api-erros')
const tokenService = require('../services/token-service')

class UserService {
    async register(email, password, name) {
        const candidate = await UserModel.findOne({email})
        if (candidate) {
            throw ApiError.badRequest('Пользоваетль с таким email уже существует')
        }
        const hashedPassword = await bcrypt.hash(password, 5)
        const user = await UserModel.create({email, password: hashedPassword, name})
        const userDto = new UserDto(user)
        const tokens = await tokenService.createTokens({...userDto})
        return {userDto, tokens}
    }
    async login (email, password) {
        const user = await UserModel.findOne({email})
        if (!user) {
            throw ApiError.badRequest('Неверный пароль или email')
        }
        const isPasswordsEqual = await bcrypt.compare(password, user.password)
        if (!isPasswordsEqual) {
            throw ApiError.badRequest('Неверный пароль или email')
        }
        const userDto = new UserDto(user)
        const tokens = await tokenService.createTokens({...userDto})
        return {userDto, tokens}
    }
    async getAllUsers() {
        const users = await UserModel.find()
        return users
    }
    async deleteAllUsers() {
        const data = await UserModel.deleteMany()
        return data
    }
    async getUserById(userId) {
        const user = await UserModel.findById(userId)
        if (!user) {
            throw ApiError.badRequest('Таково пользователя не существует')
        }
        return {id: user._id, name: user.name, email: user.email}
    }
}

module.exports = new UserService()