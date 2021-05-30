import React, { Component } from 'react'
import { Table, Button, Form, Space, Input, Modal, message, Upload, InputNumber  } from 'antd';
import moment from 'moment'
import ImgCrop from 'antd-img-crop';
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { GETUSERLIST, DELUSER, CREATE } from '@/api/userList'
import './css/userStyle.less'
import { getCookie } from '@/asset/js/util'

const { confirm } = Modal;

export default class roleList extends Component {
    constructor() {
        super()
        this.myRef = React.createRef();
        this.userRef = React.createRef();
        this.state = {
            columns: [
                {
                    title: '序号',
                    render: (text, record, index) => {
                        return (
                            <span>{index + 1}</span>
                        )
                    }
                },
                {
                    title: '用户名',
                    dataIndex: 'username',
                    key: 'username'
                },
                {
                    title: '性别',
                    dataIndex: 'usersex',
                    key: 'usersex',
                },
                {
                    title: '年龄',
                    dataIndex: 'userage',
                    key: 'userage',
                },
                {
                    title: 'vip等级',
                    dataIndex: 'role_name',
                    key: 'role_name',
                },
                {
                    title: '登录时间',
                    dataIndex: 'logintime',
                    key: 'logintime',
                    render: (text) => (<span>{text?moment(text).format('YYYY-MM-DD HH:ss:mm'): ''}</span>)
                },
                {
                    title: '操作',
                    dataIndex: 'option',
                    key: 'option',
                    render: (value, record) => {
                        return (
                            <div className="btns">
                                <Button type="link">编辑</Button>
                                <Button type="link" onClick={() => this.del(record)}>删除</Button>
                            </div>
                        )
                    }
                }
            ],
            data: [],
            loading: true,
            visible: false,
            confirmLoading: false,
            fileList: []
        }
    }

    componentDidMount() {
        this.getUserList()
    }

    static getDerivedStateFromError(error) {
        console.log('错误边界')
        return {
            hasError: true
        };
    }

    getUserList = async () => {
        let { username } = this.myRef.current.getFieldsValue()
        let result = await GETUSERLIST({ username })
        if (result.code === 200) {
            this.setState({ loading: false, data: result.data })
        }
    }

    onFormLayoutChange = () => { }
    onFinish = () => { }

    query = () => {
        this.setState({ loading: true })
        this.getUserList()
        // console.log(this.myRef, 999)
    }
    createUser = () => { 
        this.setState({ visible: true })
    }

    del = ({ id }) => {
        confirm({
            title: '提示',
            icon: <ExclamationCircleOutlined />,
            content: '确定要删除吗？',
            okText: '确定',
            cancelText: '取消',
            onOk: async () => {
                const result = await DELUSER({ id })
                if (result.data) {
                    message.success('删除成功')
                    this.getUserList()
                } else {
                    message.error(result.message)
                }
            },
            onCancel() { }
        })
    }

    handleOk = () => {
        this.userRef.current.validateFields().then(async (values)=>{
            console.log(values, 988)
            let result = await CREATE(values)
            if (result.code === 200) {
                this.query()
                this.setState({ visible: false })
                message.success('创建成功')
            }else{
                message.error('创建失败')
            }
        })
        // this.setState({confirmLoading: true})
    }
    handleCancel = () => {
        this.setState({ visible: false, fileList: [] })
        this.userRef.current.resetFields()
    }

    onChange = ({fileList:newFile}) => {
        if (newFile.length === 0) {
            this.userRef.current.setFields([{name: 'userimg', value: undefined, validating: true}])
        }else{
            let { response } = newFile[0]
            if (response &&　response.code === 200) {
                this.userRef.current.setFields([{name: 'userimg', value: response.data.file, validating: true}])
            }
        }
        this.setState({ fileList: newFile })
        
     }
    onPreview = () => { }

    render() {
        let { loading, data, confirmLoading, visible, fileList } = this.state
        return (
            <div className="page_main user_list">
                <div className="formData">
                    <Form
                        ref={this.myRef}
                        onValuesChange={this.onFormLayoutChange}
                        onFinish={this.onFinish}
                        layout="inline"
                    >
                        <Form.Item label="用户名" name="username">
                            <Input placeholder="请输入" allowClear />
                        </Form.Item>
                        <Form.Item >
                            <Space size="middle">
                                <Button type="primary" onClick={this.query}>查找用户</Button>
                                <Button type="primary" onClick={this.createUser}>新建用户</Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </div>
                <Table columns={this.state.columns} dataSource={data} bordered loading={loading} rowKey={record => record.id} />
                <Modal
                    title="新建用户"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                    okText="确定"
                    cancelText="取消"
                >
                    <Form
                        ref={this.userRef}
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 18 }}
                        layout="horizontal"
                    >
                        <Form.Item label="头像" name="userimg" rules={[{ required: true, message: '请上传用户头像' }]}>
                            <ImgCrop rotate>
                                <Upload
                                    action={global.api.uploadUrl}
                                    listType="picture-card"
                                    headers={{authorization: getCookie('token')}}
                                    fileList={fileList}
                                    onChange={this.onChange}
                                    onPreview={this.onPreview}
                                >
                                    {fileList.length < 1 && <PlusOutlined />}
                                </Upload>
                            </ImgCrop>
                        </Form.Item>
                        <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入用户名' }]}>
                            <Input placeholder="请输入" allowClear />
                        </Form.Item>
                        <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
                            <Input placeholder="请输入" allowClear />
                        </Form.Item>
                        <Form.Item label="年龄" name="userage" rules={[{ required: true, message: '请输入年龄' }]}>
                            <InputNumber placeholder="请输入" style={{width: '100%'}} min={0} max={150} initialValues={0} />
                        </Form.Item>
                        <Form.Item label="性别" name="usersex" rules={[{ required: true, message: '请输入性别' }]}>
                            <Input placeholder="请输入" allowClear />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}
