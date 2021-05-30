import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { getCookie } from '@asset/js/util'

let authenticate = ()=> {
    const token = getCookie("token");
    return token ? true : false;
}

function PrivateRoute({ component: Component, ...rest }){
    return (
        <Route {...rest} render={
            (props => authenticate()?<Component  {...props}/>:
            <Redirect to={{ pathname: '/login', state:{ from: props.location }  }} /> )
        }>
        </Route>
    )
}

export default PrivateRoute