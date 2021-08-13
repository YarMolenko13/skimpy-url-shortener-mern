import {$authHost} from "./index";


export const getLinks = async (userId) => {
    const {data} = await $authHost.get('link/' + userId)
    return data
}

export const createLink = async (userId, form) => {
    const {data} = await $authHost.post('link/', {
        userId,
        url: form.fullUrl,
        title: form.title
    })
    return data
}

export const deleteLink = async (userId, linkId) => {
    const {data} = await $authHost.delete(`link/${userId}/${linkId}`)
    return data
}

export const deleteLinks = async (userId, ids) => {
    const {data} = await $authHost.delete(`link/${userId}?linkIds=${ids}`)
    return data
}