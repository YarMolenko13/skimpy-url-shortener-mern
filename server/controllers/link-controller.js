const linkService = require('../services/link-service')
const userService = require('../services/user-service')
const ApiError = require("../exceptions/api-erros");

class LinkController {
    async addLink (req, res, next) {
        try {
            const {userId, title, url} = req.body
            const data = await linkService.addLink(userId, title, url)
            return res.json(data)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    async redirect (req, res, next) {
        try {
            const linkUuid = req.params.linkUuid
            const fullUrl = await linkService.getFullUrl(linkUuid)
            return res.status(303).redirect(fullUrl)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    async deleteLink (req, res, next) {
        try {
            const {userId, linkId} = req.params
            const data = await linkService.deleteLink(userId, linkId)
            return res.json(data)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    async getUsersLinks (req, res, next) {
        try {
            const {userId} = req.params
            const data = await linkService.getUsersLinks(userId)
            return res.json({...data})
        } catch (e) {
            console.log(e)
            next(e)
        }
    }
    async deleteLinks (req, res, next) {
        try {
            const {userId} = req.params
            const linkIds = req.query.linkIds.split(',')
            await linkService.deleteLinks(userId, linkIds)
            return res.status(200).json({msg: 'ok'})
        } catch (e) {
            next(ApiError.badRequest('Ошибка удаления ссылок'))
        }
    }
}

module.exports = new LinkController()