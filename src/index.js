import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '@asset/css/base.css'
import App from './App';
import { BrowserRouter as Router} from 'react-router-dom'
import { Provider } from 'react-redux'
import '@asset/js/config'
import store from './redux/store'


function render(){
  ReactDOM.render(
    // <React.StrictMode>
    <Provider store = {store}>
       <Router >
        <App  />
      </Router>
    </Provider>
     ,
    // </React.StrictMode>,
    document.getElementById('root')
  )
}

render()


// //监听变化,重新渲染
// store.subscribe(render)
