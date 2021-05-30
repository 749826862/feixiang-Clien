import React from 'react'
import { Avatar,Menu, Dropdown } from 'antd'
import { UserOutlined, BellOutlined,EnterOutlined,SkinOutlined} from '@ant-design/icons';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

function MyAvater(props){
    const loginOut = () => {
      props.history.replace('/login')
    }

    const menu = (
        <Menu>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
              <UserOutlined />个人中心
            </a>
          </Menu.Item>
          <Menu.Item onClick={ loginOut }>
              <EnterOutlined />退出
          </Menu.Item>
        </Menu>
    );

    let { userimg } = props.user  
    return (
        <AvatarCss className="avater flex_around">
            <BellOutlined  style={{ fontSize: '20px', color: '#08c' }}/>
            <SkinOutlined  style={{ fontSize: '20px', color: '#08c' }} />
            <Dropdown overlay={menu} placement="bottomCenter" arrow trigger={ ['click'] }>
                <Avatar src={userimg} size={40} icon={<UserOutlined />} />
            </Dropdown>
        </AvatarCss>
    )
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(withRouter(MyAvater))

export const AvatarCss = global.api.styled.div`
    width: 170px;
    padding-right: 30px;
    
    

`