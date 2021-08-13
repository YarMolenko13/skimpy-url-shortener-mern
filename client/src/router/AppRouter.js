import React, {useContext} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {authRoutes, publicRoutes} from "./routes";
import {HOME_URL} from "../utils/consts";
import {Context} from 'index'
import {observer} from "mobx-react-lite";


const AppRouter = observer(() => {
    const {user} = useContext(Context)

    return (
        <Switch>
            {publicRoutes.map(({path, Component})  =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact />
            )}
            <Redirect to={HOME_URL} />
        </Switch>
    );
});

export default AppRouter;