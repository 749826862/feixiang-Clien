import React, { Component } from 'react'
import { Form, Input, Button, Table, Modal, Space, message, DatePicker } from 'antd';
import './css/index.less'

export default class viewModel extends Component {

    onOk = () => {
        this.props.onCancel(false)
    }

    render() {
        let { visible, content } = this.props
        return (
            <Modal
                title="文章预览"
                visible={visible}
                onCancel={this.onOk}
                className="viewModel"
                footer={[
                    <Button key="view" type="primary" onClick={this.onOk}>
                        关闭
                    </Button>
                ]}
            >
                <h3 className="title">{ content.title }</h3>
                <div dangerouslySetInnerHTML={{__html: content.content}} />
            </Modal>
        )
    }
}
