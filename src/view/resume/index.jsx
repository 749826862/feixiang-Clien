// 简历列表

import React, { PureComponent, useState, useEffect } from 'react'
import { Form, Input, Button, Table, Modal, Space, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './css/style.less'
import { queryList, delResume } from '@/api/resume'

const { Column, ColumnGroup } = Table;
const { confirm } = Modal;


function Resume(props) {
    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState({ caluea: 666, avlud: '呵呵' });
    const [visible, setVisible] = useState(false);
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);

    

    useEffect(() => {
        // form.setFieldsValue()
        //获取简历列表
   
        getList()
    }, [])

    const getList =async () => {
        const result = await queryList()
        if(result.code === 200) {
            setList(result.data)
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

    const createResume = () => {
        // setVisible(true)
        console.log(props, 555)
        props.history.push('/resume/create')
    }

    const hideModal = () => {
        setVisible(false)
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
            title: '简历名称',
            dataIndex: 'resume_name',
            key: 'resume_name',
        },
        {
            title: '简历人',
            dataIndex: 'resume_user',
            key: 'resume_user',
        },
        {
            title: '工作地点',
            dataIndex: 'resume_locale',
            key: 'resume_locale',
        },
        {
            title: '职位',
            dataIndex: 'resume_intention',
            key: 'resume_intention',
        },
        {
            title: '状态',
            dataIndex: 'private',
            key: 'private',
            render: (text) => {
                return (
                    <span> {text === 0? '私密': '公开'} </span>
                )
            }
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },
        {
            title: '操作',
            dataIndex: 'name',
            key: 'name',
            render: (text, parms) => {
                return (
                    <Space size="middle">
                        <Button type="link" onClick={edit}>编辑</Button>
                        <Button type="link" onClick={() => del(parms)}>删除</Button>
                    </Space>
                )
            }
        },
    ];


    return (
        <div className="resume_main">
            <div className="formData">
                <Form
                    form={form}
                    onValuesChange={onFormLayoutChange}
                    onFinish={onFinish}
                    layout="inline"
                >
                    <Form.Item label="简历名称" name="resume_name">
                        <Input placeholder="请输入查询关键字" />
                    </Form.Item>
                    <Form.Item label="简历姓名" name="resume_user">
                        <Input placeholder="请输入查询关键字" />
                    </Form.Item>
                    <Form.Item >
                        <Space size="middle">
                            <Button type="primary" onClick={query}>查找</Button>
                            <Button type="primary" onClick={createResume}>新建简历</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
            <div className="list">
                <Table dataSource={list} columns={columns} bordered loading={loading} rowKey={record=>record.resume_id}  />
            </div>
            {/* <Modal
                title="新建简历"
                visible={visible}
                onOk={hideModal}
                onCancel={hideModal}
                okText="确认"
                cancelText="取消"
            >
                <Form
                    form={creatForm}
                    onFinish={creatFinish}
                    layout="horizontal"
                    labelCol={{
                        span: 4,
                      }}
                >
                    <Form.Item label="简历名称" name="resumeName" required >
                        <Input placeholder="请输入简历名称" />
                    </Form.Item>
                    <Form.Item label="简历人" name="resumePerson" required >
                        <Input placeholder="请输入简历人" />
                    </Form.Item>
                    <Form.Item label="是否公开" name="resumeOpen" required >
                        <Radio.Group onChange={onChange} value={openValue}>
                            <Radio value={0}>是</Radio>
                            <Radio value={1}>否</Radio>
                        </Radio.Group>
                    </Form.Item>
                  
                </Form>
            </Modal> */}
        </div>
    )
}

export default Resume