import {$host, $authHost} from './index'
import jwtDecode from "jwt-decode";

export const registration = async (form) => {
    const {data} = await $host.post('user/registration', {
        name: form.name,
        email: form.email,
        password: form.password,
    })
    localStorage.setItem('token', data.token)
    return data
}

export const login = async (form) => {
    const {data} = await $host.post('user/login', {
        email: form.email,
        password: form.password,
    })
    localStorage.setItem('token', data.token)
    return data
}

export const getUser = async (userId) => {
    try {
        const {data} = await $authHost.get('user/' + userId)
        return data
    } catch (e) {
        console.log(e.message)
    }
}

export const check = async () => {
    try {
        const {data} = await $authHost.get('user/auth')
        localStorage.setItem('token', data.token)
        jwtDecode(data.token)
        return data
    } catch (e) {
        console.log(e.message)
    }
}