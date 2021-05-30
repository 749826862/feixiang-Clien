import React from 'react';

const homeRouter = [
    {
        path:'/login',
        components: React.lazy(()=> import('@/view/login/index'))
    },
    {
        path:'/',
        components: React.lazy(()=> import('@/view/home/index'))
    },
    {
        path:'/home',
        components: React.lazy(()=> import('@/view/home/homePage'))
    },

]

export default homeRouter
