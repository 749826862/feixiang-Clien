import React, { Component } from 'react'
import { Carousel,  List, Typography,Avatar  } from 'antd';
import { connect } from 'react-redux'
import { UserOutlined, CopyOutlined, StarFilled } from '@ant-design/icons';
// import { addtodo } from '@/redux/action'
// import { color } from 'echarts/lib/export';

// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/line');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

class homePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name:'尼玛的',
            contentStyle: {
                height: '100%',
                color: '#fff',

                textAlign: 'center',
                background: '#364d79'
            },
            data: [
                'Racing car sprays burning fuel into crowd.',
                'Japanese princess to wed commoner.',
                'Australian walks 100km after outback crash.',
                'Man charged over missing wedding girl.',
               
              ]
        }
        
        
    }

    componentDidMount(){
        let myChart = echarts.init(document.getElementById('visits'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: '今日访问量'
            },
            tooltip: {},
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [{
                name: '访问量',
                type: 'line',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
    }

   

    render() {
        let { username, logintime } = this.props.user
        return (
            <PageCss>
                <div className="homeMain">
                    <div className="box padding10 box1">
                        <div className="loginTime flex_end">
                            <p>上次登录时间：{ logintime }</p>
                        </div>
                        <div className="content flex_around">
                            <Avatar size={60} icon={<UserOutlined />} /> 
                            <p>欢迎，{ username }</p>
                        </div>
                        <div className="favorite">
                            <h3><CopyOutlined />我的收藏夹</h3>
                            <section className="list">
                                <ul>
                                    <li>
                                       <StarFilled style= {{color: 'rgb(0, 136, 204)'}}  /> 我是收藏的内容
                                    </li>
                                    <li>
                                       <StarFilled style= {{color: 'rgb(0, 136, 204)'}} /> 我是收藏的内容
                                    </li>
                                    <li>
                                       <StarFilled style= {{color: 'rgb(0, 136, 204)'}} /> 我是收藏的内容
                                    </li>
                                </ul>
                            </section>
                        </div>
                    </div>
                    <div className="box">
                        <Carousel autoplay>
                            <div className="slider">
                                <img  alt="" srcSet={ require('@asset/image/1.jpg') }/>
                            </div>
                            <div className="slider">
                                <img  alt="" srcSet={ require('@asset/image/2.jpg') }/>
                            </div>
                            <div className="slider">
                                 <img  alt="" srcSet={ require('@asset/image/3.jpg') }/>
                            </div>
                            <div className="slider">
                                <img  alt="" srcSet={ require('@asset/image/4.jpg') }/>
                            </div>
                        </Carousel>
                    </div>
                    
                    <div className="box padding10">
                        <div id="visits"></div>
                    </div>
                    <div className="box padding10">
                    <List
                            header={<div>消息中心</div>}
                            dataSource={this.state.data}
                            renderItem={item => (
                                <List.Item>
                                <Typography.Text mark>[ITEM]</Typography.Text> {item}
                                </List.Item>
                            )}
                        />
                    </div>
                </div>

            </PageCss>
        )
    }
}


//把 redux中的state映射到组件的props中，组件中可以直接通过this.props获取到
const mapStateToProps = state => {
    return state
}

//接收 dispatch() 方法并返回期望注入到展示组件的 props 中的回调方法
// 注：ownProps 属于本组件的proprs
const mapDispatchToProps = (dispatch,ownProps) => {
    // console.log(this,445)
    return {
        // todName: (data)=>{
        //     dispatch(addtodo(data))
        // }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(homePage)

export const PageCss = global.api.styled.div`
    width:100%;
    height:100%;
    .padding10{
        padding: 10px;
    }
	.homeMain{
        width:100%;
        height:100%;
        display:flex;
        flex-wrap: wrap;
        justify-content: space-between;

        padding: 0px 20px;
        padding-top:20px;
        box-sizing: border-box;
        .box{
            width:49%;
            // min-height:260px;
            height:calc(50% - 20px);
            // margin: 10px 0; 
            box-shadow: 0 0 10px #ccc;
            border-radius: 10px;
            overflow: hidden;
            
            // flex: 1;
            // margin-left: 10px;
            .ant-carousel{
                height:100%;
            }
            .slider,.slick-list{
                img{
                    width:100%;
                }
            }
            .slick-slider{
                height:100%;
            }
            #visits{
                width:100%;
                height:100%;
            }
            .content{
                width:190px;
                flex:1;
                p{
                    font-size: 18px;
                }

            }
            .favorite{
                padding: 10px 20px 0px 15px;
                font-size: 17px;
                flex:1;
                h3{
                    border-bottom: 1px solid #ccc;
                }
                span{
                    margin-right: 5px;
                }
                .list{
                    font-size: 15px;
                    padding: 10px 20px;
                    li{
                        padding: 3px 0;
                    }
                }
            }
        }
    }
    .box1{
        display:flex;
        flex-direction: column;
    }
  .loginTime{
      height:20px;
      padding-right:20px;
      margin-bottom: 10px;
  }
  .site-layout .site-layout-background {
    background: #fff;
  }

`
