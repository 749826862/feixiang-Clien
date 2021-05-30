import React, { Component } from 'react'
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from '@asset/image/logo.png'
import { login } from '@/api/login'
import { setCookie, clearAllCookie } from '@asset/js/util'
import { connect } from 'react-redux'
import { saveUser } from '@/redux/action'

class index extends Component {
    constructor() {
        super()
        this.state = {
            loginStatus: false,
            loginData: null
        }

        this.formRef = React.createRef();
    }

    componentDidMount(){
        localStorage.clear()
        clearAllCookie()
    }

    onFinish = values => {
        console.log('Received values of form: ', values);
    };

    submitData = () => {
        this.formRef.current.validateFields().then(values=>{
            login({
                username: values.username,
                password: values.password
                
            }).then(res=>{
                this.setState({
                    loginData: res,
                    loginStatus: true
                })
                if (res.code === 200) {
                    setCookie('token', JSON.stringify(res.data.token), 1)
                    this.props.setUser(res.data.user)
                    this.props.history.replace('/')
                }
            }).catch(error => {
                message.error('服务器错误');
            })
        }).catch(error=>{
            console.log(error)
        })
    }


    render() {
        return (
            <LoginCss as="div">
                <div className="login_main">
                    <div className="login_frame p_center">
                        <div className="flex_center logo">
                            <img srcSet={logo} alt="" />
                        </div>
                        <div className="form">
                        <Form
                            ref={this.formRef}
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={this.onFinish()}
                            >
                                <Form.Item
                                    name="username"
                                    rules={[{ required: true, message: '请输入用户名!' }]}
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                                </Form.Item>
                                <Form.Item
                                    style={{marginBottom: 10}}
                                    name="password"
                                    rules={[{ required: true, message: '请输入密码!' }]}
                                >
                                    <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                    />
                                </Form.Item>
                                { this.state.loginStatus? <Form.Item style={{marginBottom: 0}}>
                                    <div className="status">{ this.state.loginData.message }</div>
                                </Form.Item>: null }
                                <Form.Item>
                                    <Form.Item name="remember" valuePropName="checked" noStyle>
                                        <div className="flex_between">
                                            <Checkbox>记住密码?</Checkbox>
                                            <Button type="link">忘记密码?</Button>
                                        </div>
                                    </Form.Item>
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="button" className="login-form-button" onClick={ this.submitData.bind(this) }>
                                    登录
                                    </Button>
                                    {/* Or <a >register now!</a> */}
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </LoginCss>
        )
    }

}

const mapStateToProps = state => {
    console.log(state,444)
    return state
}

const mapDispatchToProps = (dispatch,ownProps) => {
    // console.log(this,445)
    return {
        setUser: (data)=>{
            dispatch(saveUser(data))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(index)

export const LoginCss = global.api.styled.div`
    width:100%;
    height:100%;
    .login_main{
        width:100%;
        height:100%;
        position: relative;
       .login_frame{
           width:500px;
           height:350px;
           box-shadow: 0 0 10px 10px #eee;
           img{
               width:120px;
               height:50px
           }
           .logo{
               margin-top:20px;
           }
           .form{
               margin-top:20px;
               padding:0 30px;
           }
           .login-form-button{
               width: 100%;
           }
           .status{
               color: red;
               //margin-top: 10px;
           }
       }

    }


`
