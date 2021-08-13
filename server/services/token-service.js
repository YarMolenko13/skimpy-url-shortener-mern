const jwt = require('jsonwebtoken')

class TokenService{
    async createTokens (payload) {
        const accessToken  = jwt.sign(payload, process.env.ACCES_TOKEN_SECRET, {expiresIn: '2d'})
        // refresh token
        return {
            accessToken
        }
    }
    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.ACCES_TOKEN_SECRET)
            return userData
        } catch (e) {
            return null
        }
    }
}

module.exports = new TokenService()