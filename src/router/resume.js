import React from 'react';

const resumeList = [
    {
        path:'/resume/create',
        components: React.lazy(()=> import('@/view/resume/create')),
        name:"简历创建"
    }

]

export default resumeList
