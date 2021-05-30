// 创建简历

import React, { PureComponent, useState, useEffect } from 'react'
import { Form, Input, Button, DatePicker, Space, message, Radio, Select, Divider } from 'antd';
import { MinusCircleOutlined, PlusOutlined, LeftOutlined } from '@ant-design/icons';
import './css/createCss.less'
import { create } from '@/api/resume'

const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;


function CreateResume(props) {
	const [creatForm] = Form.useForm();
	const [experList] = Form.useForm();
	const [openValue, setOpenValue] = useState(1);
	let [count, setcount] = useState(0);

	// useEffect(() => {
	// 	let timeId = setInterval(() => {
	// 		setcount(count++)
	// 		console.log(count)s
	// 	}, 1000)
	// },[])

	const rules = {
		rules: [{
			required: true,
			message: '请输入'
		}],
		// hidden: true
	}

	//表单确认
	const creatFinish = () => {

	}

	//单选
	const onChange = (e) => {
		setOpenValue(e.target.value);
	}

	//下拉选择
	const handleChange = () => {

	}

	//提交
	const submitBtn = () => {
		creatForm.validateFields().then(async res => {
			// res.getFieldValue()
			const { list } = await experList.validateFields()
			if (!list) return message.error('至少有一个工作经历');
			const data = await create({ ...res, list })
			if (data && data.code === 200) {
				message.success('创建成功')
				props.history.push('/home/resumeadmin')
			}
		}).catch(error => {

			console.log(error)
		})
	}

	const back = () => {
		props.history.push('/home/resumeadmin')
	}

	return (
		<div className="main">
			<div className="submitBtn flex_between">
				<LeftOutlined onClick={back} />
				<Space>
					<Button>取消</Button>
					<Button type="primary" onClick={submitBtn}>提交</Button>
				</Space>
			</div>
			<div className="createMain">
				<div className="fromData">
					<Divider orientation="left" style={{ marginTop: 0 }}>基本信息</Divider>
					<Form
						form={creatForm}
						onFinish={creatFinish}
						layout="inline"
						labelCol={{
							span: 10,
							offset: 1
						}}
						initialValues={{ resumeExperience: 1 }}
					>
						<Form.Item label="简历名称" name="resumeName" required {...rules}>
							<Input placeholder="请输入简历名称" allowClear />
						</Form.Item>
						<Form.Item label="简历人" name="resumePerson" required {...rules}>
							<Input placeholder="请输入简历人" allowClear />
						</Form.Item>
						<Form.Item label="邮箱" name="resumeEmail" required {...rules}>
							<Input placeholder="请输入简历人" allowClear />
						</Form.Item>
						<Form.Item label="求职意向" name="resumeIntention" required {...rules}>
							<Input placeholder="请输入简历人" allowClear />
						</Form.Item>
						<Form.Item label="工作经验" name="resumeExperience" required {...rules}>
							<Select style={{ width: 189, marginRight: 12 }} onChange={handleChange}>
								<Option value={0}>一年内</Option>
								<Option value={1}>两年</Option>
								<Option value={2}>三年</Option>
								<Option value={3}>五年以上</Option>
							</Select>
						</Form.Item>
						<Form.Item label="工作地点" name="resumePlace" required {...rules}>
							<Input placeholder="请输入简历人" allowClear />
						</Form.Item>
						<Form.Item label="是否公开" name="resumeOpen" required {...rules}>
							<Radio.Group onChange={onChange} value={openValue} className="flex_between" style={{ marginRight: 10 }}>
								<Radio value={0}>是</Radio>
								<Radio value={1}>否</Radio>
							</Radio.Group>
						</Form.Item>
					</Form>
					{/* <Divider orientation="left">工作经历</Divider> */}
				</div>
				<div className="view">
					<Divider orientation="left" style={{ marginTop: 0 }}>工作经历</Divider>
					<div className="listConten">
						<Form name="dynamic_form_item" form={experList}>
							<Form.List
								name="list"
							>
								{(fields, { add, remove }, { errors }) => (
									<>
										{fields.map((field, index) => (
											// <Form.Item
											//     required={true}
											//     key={field.key}
											//     label={field.label}
											// >
											<Space direction="vertical" style={{ width: '95%' }} key={index}>
												{fields.length > 1 ? (
													<MinusCircleOutlined
														className="dynamic-delete-button flex_end"
														onClick={() => remove(field.name)}
													/>
												) : null}
												<Form.Item
													{...field}
													label="项目名"
													name={[field.name, 'sight']}
													fieldKey={[field.fieldKey, 'sight']}
												>
													<Input placeholder="passenger name" style={{ width: '90%' }} />
												</Form.Item>
												<Form.Item
													{...field}
													label="公司"
													name={[field.name, 'price']}
													fieldKey={[field.fieldKey, 'price']}
												>
													<Input placeholder="passenger name" style={{ width: '90%' }} />
												</Form.Item>
												<Form.Item
													{...field}
													label="工作时间"
													name={[field.name, 'date']}
													fieldKey={[field.fieldKey, 'date']}
												>
													<RangePicker format="YYYY-MM-DD" />
												</Form.Item>
												<Form.Item
													{...field}
													label="工作描述"
													name={[field.name, 'info']}
													fieldKey={[field.fieldKey, 'info']}
												>
													<TextArea showCount maxLength={100} />
												</Form.Item>
											</Space>

										))}
										<Form.Item>
											<Button
												type="dashed"
												onClick={() => add()}
												style={{ width: '60%', paddingLeft: 10 }}
												icon={<PlusOutlined />}
											>
												添加
                                    </Button>
											<Form.ErrorList errors={errors} />
										</Form.Item>
									</>
								)}
							</Form.List>
						</Form>
					</div>
				</div>
			</div>
		</div>

	)

}

export default CreateResume