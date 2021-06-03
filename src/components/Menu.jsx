import React, { useEffect, useState } from 'react';
import { Menu, Icon } from 'antd';
import {
    UserOutlined,
    CalendarOutlined,
    FileTextOutlined,
    NotificationOutlined,
    AppstoreOutlined,
    ShopOutlined
} from '@ant-design/icons';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { addNavgation } from '@/redux/action'

const { SubMenu } = Menu;

function HomeMenu(props) {
    const [openKey, setOpenKey] = useState(localStorage.getItem('openKeys')?JSON.parse(localStorage.getItem('openKeys')):[])
    const menuList = [
        {
            name: '用户管理',
            icon: <UserOutlined />,
            path: 'user',
            children: [
                {
                    name: '用户列表',
                    path: '/userList'
                },
                {
                    name: '权限管理',
                    path: '/jurisdiction'
                }
            ]
        },
        {
            name: '简历管理',
            icon: <CalendarOutlined />,
            path: '/resumeadmin'
        },
        {
            name: '文章管理',
            icon: <FileTextOutlined />,
            path: '/articleadmin'
        },
        {
            name: '公告管理',
            icon: <NotificationOutlined />,
            path: '/noticeadmin'
        },
        {
            name: 'APP菜单管理',
            icon: <AppstoreOutlined />,
            path: '/menuadmin'
        },
        {
            name: 'APP商城管理',
            icon: <ShopOutlined />,
            path: '/shoppingmall'
        },
    ]

    const getMenuNodes = (MenuList) => {
        return MenuList.map(item => {
            if (!item.children) {
                return (
                    <Menu.Item  key={item.path} {...item}>
                        <Link to={item.path} >
                            <span>{item.name}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                return (
                    <SubMenu
                        key={item.path}
                        icon={item.icon}
                        children={item.children}
                        title={item.name}>
                        {getMenuNodes(item.children)}
                    </SubMenu>
                )
            }
        })
    }

    const getMenu = (items) => {
        const { props:{ name, path, parentMenu } } = items.item
        let openKeys = JSON.parse(JSON.stringify(items.keyPath))
        localStorage.setItem('openKeys', JSON.stringify(openKeys.splice(1)))
        // console.log(items, 888)
        props.addNav({
            name,
            path,
            parent: parentMenu?{title: parentMenu.subMenuTitle.innerText, path:''}:null
        })
    }

    return (
        <Menu theme="dark" mode="inline" key="home"  onClick={getMenu} selectedKeys={props.location.pathname} defaultOpenKeys={openKey} >
            {getMenuNodes(menuList)}
        </Menu>
    )
}


//把 redux中的state映射到组件的props中，组件中可以直接通过this.props获取到
const mapStateToProps = state => {
    return state
}

//接收 dispatch() 方法并返回期望注入到展示组件的 props 中的回调方法
// 注：ownProps 属于本组件的proprs
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addNav: (data) => {
            dispatch(addNavgation(data))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(HomeMenu))