import React from 'react'
import { createStore } from 'redux'
import {count} from './reducers'

const store = createStore(count)
console.log('store', store)

export default store
