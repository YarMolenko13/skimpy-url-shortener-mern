import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import UserStore from 'store/UserStore'
import App from './App';
import {LinksStore} from "./store/LinksStore";
import 'utils/add'

Object.prototype.count = function () {
    return Object.keys(this).length
}

export const Context = createContext(null)

ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        links: new LinksStore(),
    }}>
        <App />
    </Context.Provider>,
    document.getElementById('root')
);