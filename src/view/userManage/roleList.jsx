import React, { Component } from 'react'
import { Table  } from 'antd';
import PropTypes from 'prop-types'

export default class roleList extends Component {
    // static propTypes = {
    //     prop: PropTypes
    // }
    static columns = [
        {
            title: '用户名',
            dataIndex: 'userName',
            key: 'userName'
        },
        {
            title: '注册邮箱',
            dataIndex: 'emile',
            key: 'emile',
        },
        {
            title: '最近登录日期',
            dataIndex: 'loginTime',
            key: 'loginTime',
        },
        {
            title: '操作',
            dataIndex: 'option',
            key: 'option',
        }
    ]

    static data = [
        {
            // key: '1',
            userName: '陈双林',
            emile: '749826862@qq.com',
            loginTime: '2020-11-15 21:07',
            option: '操作',
        },
    ]

    render() {
        return (
            <div className="page_main">
                <Table columns={this.columns} dataSource={this.data} />
            </div>
        )
    }
}


