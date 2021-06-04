// 文章列表

import React, { PureComponent, useState, useEffect, forwardRef, useRef } from 'react'
import { Form, Input, Button, Table, Modal, Space, message, DatePicker, Select } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment'
import './css/index.less'
import { QUERYLIST, delResume } from '@/api/article'
import { getTableScroll } from '@/asset/js/util'
import ViewModel from './viewModel'

const { Column } = Table;
const { confirm } = Modal;
const { Option } = Select;


function Article(props) {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState({});
    const [scrollY, setScrollY] = useState("")

    // const TableRef = useRef(null)

    useEffect(() => {
        // form.setFieldsValue()
        //获取简历列表
        getList()
        
    }, [])

    const getList =async () => {
        const result = await QUERYLIST()
        if(result.code === 200) {
            setList(result.data)
            setScrollY(getTableScroll())
        }
        setLoading(false)
    }

    const onFormLayoutChange = ({ layout }) => {
        // setFormLayout(layout);
    };

    const onFinish = (values) => {
        console.log(values, 555)
    }
    const submit = () => {
        console.log(form.getFieldValue(), 66)
    }

    const openView = (info) => {
        setVisible(true)
        setContent(info)
    }

    const onCancel = (flag) => {
        setVisible(flag)
    }

    const del =({resume_id}) => {
        confirm({
            title: '提示',
            icon: <ExclamationCircleOutlined />,
            content: '确定要删除吗？',
            okText: '确定',
            cancelText: '取消',
            async onOk() {
                const result = await delResume({resume_id})
                if(result.data){
                    message.success('删除成功')
                    getList()
                }else{
                    message.error(result.message)
                }
            },
            onCancel() {}
          })
    }

    const edit = (e) => {
        
    }

    const query = () => {
        setLoading(true)
        getList()
    }

    const columns = [
        {
            title: '文章标题',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '作者',
            dataIndex: 'person',
            key: 'person',
        },
        {
            title: '创建日期',
            dataIndex: 'createData',
            key: 'createData',
            render: (text) => (<span>{text?moment(text).format('YYYY-MM-DD HH:ss:mm'): ''}</span>)
        },
        {
            title: '点击量(次)',
            dataIndex: 'click_num',
            key: 'click_num',
        },
        {
            title: '发布状态',
            dataIndex: 'status',
            key: 'status',
            render: (text) => {
                return (
                    <span> {text === 0? '私密': '公开'} </span>
                )
            }
        },
        {
            title: '审批状态',
            dataIndex: 'approval',
            key: 'approval',
            render: (text) => {
                return (
                    <span> {['待审批','审批通过', '审批失败'][text]} </span>
                )
            }
        },
        {
            title: '操作',
            dataIndex: 'option',
            key: 'option',
            width: 250,
            render: (text, parms) => {
                return (
                    <Space size="middle">
                        <Button type="link" onClick={edit}>审批</Button>
                        <Button type="link" onClick={() => openView(parms)}>预览</Button>
                        <Button type="link" onClick={() => del(parms)}>删除</Button>
                    </Space>
                )
            }
        },
    ];


    return (
        <div className="article_main">
            <div className="formData">
                <Form
                    form={form}
                    onValuesChange={onFormLayoutChange}
                    onFinish={onFinish}
                    layout="inline"
                >
                    <Form.Item label="文章标题" name="title">
                        <Input placeholder="请输入查询关键字" />
                    </Form.Item>
                    <Form.Item label="审批状态" name="approval">
                        <Select defaultValue="" style={{ width: 120 }}>
                            <Option value="">全部</Option>
                            <Option value="0">待审批</Option>
                            <Option value="1">审批通过</Option>
                            <Option value="2">审批失败</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="创建日期" name="createData">
                        <DatePicker placeholder="请选择查询日期" />
                    </Form.Item>
                    <Form.Item >
                        <Space size="middle">
                            <Button type="primary" onClick={query}>查找</Button>
                            {/* <Button type="primary" onClick={createResume}>新建文章</Button> */}
                        </Space>
                    </Form.Item>
                </Form>
            </div>
            <div className="list">
                <Table dataSource={list} columns={columns} bordered loading={loading} rowKey={record=>record.id} scroll={{y:scrollY}}  />
            </div>
            <ViewModel visible={visible} onCancel={onCancel} content={content}/>
        </div>
    )
}

export default Article