import React, { Component,Suspense  } from 'react'
import { Layout, Breadcrumb   } from 'antd';
import {Switch,Route, Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PrivateRoute from '@/router/privateRoute'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined
} from '@ant-design/icons';
import Menu from '@components/Menu'
import logo2 from '@asset/image/logo2.png'
import logo3 from '@asset/image/logo3.png'
const homePage = React.lazy(()=> import('@/view/home/homePage'))
const Avatar = React.lazy(()=> import('@/components/Avatar'))


const { Header, Sider, Content } = Layout;
class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            collapsed: false,
        };
        
    }

    toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
    };

    toIndex = () => {
      this.props.history.push('/')
      console.log(this.props, 555)
    }


    render() {
        return (
            <HomeCss>
                <Layout>
                    <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
											<div className="logo" onClick={ this.toIndex }>
                        { this.state.collapsed? <img  srcSet={ logo3 } alt="logo"  /> : <img  srcSet={ logo2 } alt="logo"  /> } 
                      </div>
											<Menu></Menu>
                    </Sider>
                <Layout className="site-layout">
                  <Header className="site-layout-background flex_between" style={{ padding: 0 }}>
                      {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                      className: 'trigger',
                      onClick: this.toggle,
                      })}
                      <Avatar />
                  </Header>
								<Breadcrumb style={{ margin: '16px 16px' }}>
                  <Breadcrumb.Item>
                    <Link to='/'>
                      <HomeOutlined />
                    </Link>
                  </Breadcrumb.Item>
                    { this.props.breadList.map(item=>(
                      <Breadcrumb.Item key={ item.path }>
                        {item.path? <Link to={ item.path }>{ item.title }</Link>:<span>{item.title}</span>}
                      </Breadcrumb.Item>
                    )) }
								</Breadcrumb>
                <Content
                    className="site-layout-background"
                    style={{
                    margin: '0 16px 24px 16px',
                    // padding: 24,
                    // minHeight: 280,
                    }}
                >
									<Suspense fallback={<div>Loading...</div>}>
										<Switch>
											<Route exact path='/' component={ homePage }></Route>
											{ global.api.routerList.map(item=> {
													return (             
														<PrivateRoute exact  key={ item.path } path={item.path} component={item.components} />
													)
												} ) }
											{/* <Redirect from='/home' to='/home/index' /> */}
										</Switch>
									</Suspense>
                </Content>
                </Layout>
            </Layout>
          </HomeCss>
        )
    }
}

//把 redux中的state映射到组件的props中，组件中可以直接通过this.props获取到
const mapStateToProps = state => {
  return state
}

export default connect(
  mapStateToProps
)(Home)
 
export const HomeCss = global.api.styled.div`
	height: 100%;
	.ant-layout{
		height: 100%;
	}
 	.trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
	}
	
  .ant-layout-content{
    // min-height: auto;
  }
 .trigger:hover {
    color: #1890ff;
  }
  
   .logo {
    cursor: pointer;
    height: 50px;
    margin: 16px;
    display: flex;
    justify-content: center;
    img{
      //width:100%;
      height:100%;
    }
  }
  
  .site-layout .site-layout-background {
    background: #fff;
  }

`