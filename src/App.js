import React, { Suspense } from 'react';
import {Switch,Route, HashRouter } from 'react-router-dom'
import PrivateRoute from '@/router/privateRoute'
import { connect } from 'react-redux'

const Home = React.lazy(()=> import('./view/home/index'))
const Login = React.lazy(()=> import('./view/login/index'))

function App(props) {
  return (
    <div className="App" >
      <Suspense fallback={<div>Loading...</div>}>
        <HashRouter>
          <Switch >
            <Route path='/login' component={Login}/>
            <PrivateRoute path='/' component={Home}/>
          </Switch>
        </HashRouter>
      </Suspense>
    </div>
  );
}

export default connect(
  state => state
)(App);
