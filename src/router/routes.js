import {HOME_URL, LOGIN_URL, REGISTER_URL, LINKS_URL} from "../utils/consts";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import Links from "pages/Links"


export const publicRoutes = [
    {
        path: HOME_URL,
        Component: Home
    },
    {
        path: REGISTER_URL,
        Component: Registration
    },
    {
        path: LOGIN_URL,
        Component: Login
    }
]

export const authRoutes = [
    {
        path: LINKS_URL,
        Component: Links
    },
]