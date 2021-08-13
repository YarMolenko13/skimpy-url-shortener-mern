const ApiError = require('../exceptions/api-erros')
const tokenService = require('../services/token-service')

module.exports = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization
        if (!authorizationHeader) {
            throw next(ApiError.unauthhorizedError())
        }
        const accessToken = authorizationHeader.split(' ')[1]
        if (!accessToken) {
            throw next(ApiError.unauthhorizedError())
        }
        const userData = tokenService.validateAccessToken(accessToken)
        if (!userData) {
            throw next(ApiError.unauthhorizedError())
        }
        req.user = userData
        next()
    } catch (e) {
        console.log(e)
        throw ApiError.unauthhorizedError()
    }
}