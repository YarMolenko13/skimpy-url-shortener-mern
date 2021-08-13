const LinkModel = require('../models/link-model')
const UserModel = require('../models/user-model')
const ApiError = require('../exceptions/api-erros')
const uuid = require('uuid')

class LinkService {
    async addLink(userId, title, fullUrl) {
        const user = await UserModel.findById(userId)
        if (!user) {
            throw ApiError.badRequest('Такого пользователя не сущесвует')
        }
        const shortUrl = uuid.v4().slice(0, 5)
        const link = await LinkModel.create({fullUrl,title, shortUrl, date: new Date()})
        await user.links.push({id: link._id})
        await user.save()
        return link
    }
    async getUsersLinks(userId) {
        const user = await UserModel.findById(userId)
        if (!user) {
            throw ApiError.badRequest('Такого пользователя не существует')
        }
        const linkIds = user.links
        const links = []
        for (let i = 0; i < linkIds.length; i++) {
            let link = await LinkModel.findById(linkIds[i].id)
            if (!link) {
                throw ApiError.badRequest('Такая ссылка не найдена')
            }
            links.push(link)
        }
        return links
    }
    async getFullUrl(shortUrl) {
        const link = await LinkModel.findOne({shortUrl})
        if (!link) {
            throw ApiError.badRequest('Такой ссылки не существует')
        }
        await link.countFollows++
        await link.save()
        return link.fullUrl
    }
    async deleteLink(userId, linkId) {
        const link = await LinkModel.findById(linkId)
        const user = await UserModel.findById(userId)
        for (let i = 0; i < user.links.length; i++) {
            if (link._id.toString()=== user.links[i].id.toString()) {
                let data = await LinkModel.findByIdAndDelete(linkId)
                user.links.splice(i, 1)
                await user.save()
            }
        }
        return link
    }
    async deleteLinks(userId, linkIds) {
        const user = await UserModel.findById(userId)
        if (!user) {
            throw ApiError.badRequest('Таково пользователя не существует')
        }
        for (let i = 0; i < linkIds.length; i++) {
            let linkId = linkIds[i]
            let link = await LinkModel.findById(linkId)
            console.log(link)
            for (let i = 0; i < user.links.length; i++) {
                if (link._id.toString()=== user.links[i].id.toString()) {
                    user.links.splice(i, 1)
                    await user.save()
                }
            }
            await link.remove()
        }
        return user
    }
}

module.exports = new LinkService()