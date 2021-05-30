import React from 'react';

const myTree = [
    {
        path:'/userList',
        components: React.lazy(()=> import('@/view/userManage/userList')),
        name:"用户列表"
    },
    {
        path:'/jurisdiction',
        components: React.lazy(()=> import('@/view/userManage/roleList')),
        name:"权限管理"
    },
    {
        path:'/resumeadmin',
        components: React.lazy(()=> import('@/view/resume/index')),
        name:"简历管理"
    },
    {
        path:'/articleadmin',
        components: React.lazy(()=> import('@/view/article')),
        name:"文章管理"
    },
    {
        path:'/noticeadmin',
        components: React.lazy(()=> import('@/view/myTree/gui')),
        name:"公告管理"
    },
    {
        path:'/menuadmin',
        components: React.lazy(()=> import('@/view/myTree/zhuzhaun')),
        name:"APP菜单管理"
    },
    {
        path:'/shoppingmall',
        components: React.lazy(()=> import('@/view/myTree/zhuzhaun')),
        name:"商城管理"
    },

]

export default myTree
