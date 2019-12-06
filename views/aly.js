import React, { Component } from 'react';
import { View, TextInput, ImageBackground, Text } from 'react-native';
import { Input, Avatar, Button, Header, Divider, Icon, ButtonGroup } from 'react-native-elements'
import DatePicker from 'react-native-datepicker'
import Echarts from 'native-echarts';
import 'jquery'
import qs from 'querystring';
class Aly extends Component {
    constructor() {
        super()
        this.state = {
            date: '',
            date1: '',
            rep: [],
            record: [],
            record1: [],
            selectIndex: 0,
            selectIndex1: 0,
        }
    }
    goBack = () => {
        this.props.navigation.navigate('home');
    }

    // componentDidMount() {
    //     fetch('http://192.168.0.145:3000/record').then(response => response.json()).then(data => {
    //         console.log('响应的结果：', data);
    //         var a = data.data
    //         var a1 = data.data
    //         var c = []
    //         var d = []
    //         for (let n = 0; n < a.length; n++) {
    //             if (a[n].record_type == '支出') {
    //                 c.push(a[n])
    //             }
    //         }
    //         for (let m = 0; m < a.length; m++) {
    //             if (a[m].record_type == '收入') {
    //                 d.push(a[m])
    //             }
    //         }

    //         let newArr = c.reduce((prev, cur) => {
    //             let i = -1
    //             i = prev.findIndex(item => item.item === cur.item)
    //             if (i != -1) {
    //                 prev[i].money = parseFloat(prev[i].money) + parseFloat(cur.money)
    //             } else {
    //                 prev.push(cur)
    //             }
    //             return prev
    //         }, [])

    //         let newArr1 = d.reduce((prev, cur) => {
    //             let i = -1
    //             i = prev.findIndex(item => item.item === cur.item)
    //             if (i != -1) {
    //                 prev[i].money = parseFloat(prev[i].money) + parseFloat(cur.money)
    //             } else {
    //                 prev.push(cur)
    //             }
    //             return prev
    //         }, [])

    //         let bar = a1.reduce((prev, cur) => {
    //             let i = -1
    //             i = prev.findIndex(item => item.record_type === cur.record_type && item.date === cur.date)
    //             if (i != -1) {
    //                 prev[i].money = parseFloat(prev[i].money) + parseFloat(cur.money)
    //             } else {
    //                 prev.push(cur)
    //             }
    //             return prev
    //         }, [])
    //         console.log(bar)
    //         console.log('newArr',newArr)

    //         this.setState({
    //             record: newArr,
    //             record1: newArr1,
    //             rep: bar
    //         })
    //     }).catch(err => {
    //         console.log('请求出错了：', err)
    //     })
    // }
    //收入和支出
    updateIndex = (index) => {
        // console.log(index)
        // let type = this.state.record_type
        if (index == 0) {
            this.state.record_type = '支出'

        } else {
            this.state.record_type = '收入'
        }
        this.setState({
            selectIndex: index,
            record_type: this.state.record_type,


        }, () => {
            console.log(this.state.record_type, this.state.selectIndex)
        }
        )
    }

    //图标类型
    updateIndex1 = (index) => {
        this.setState({
            selectIndex1: index
        })
    }

    //筛选
    search = () => {
        var startDate = new Date(this.state.date).getTime()
        var endDate = new Date(this.state.date1).getTime()
        let obj = {
            start: startDate,
            end: endDate
        }
        fetch(`http://192.168.0.145:3000/record/date?start=${startDate}&end=${endDate}`).then(response => response.json()).then(data => {
            console.log('响应的结果：', data);
            if (data.code == 2) {
                if (this.state.selectIndex == 0) {
                    let expend = data.data
                    var ex = []
                    for (let n = 0; n < expend.length; n++) {
                        if (expend[n].record_type == '支出') {
                            ex.push(expend[n])
                        }
                    }
                    let newExpend = ex.reduce((prev, cur) => {
                        let i = -1
                        i = prev.findIndex(item => item.item === cur.item&&item.date===cur.date)
                        if (i != -1) {
                            prev[i].money = parseFloat(prev[i].money) + parseFloat(cur.money)
                        } else {
                            prev.push(cur)
                        }
                        return prev
                    }, [])

                    this.setState({
                        record: newExpend
                    })
                } else {

                    let income = data.data
                    var ic = []
                    for (let m = 0; m < income.length; m++) {
                        if (income[m].record_type == '收入') {
                            ic.push(income[m])
                        }
                    }
                    let newIncome = ic.reduce((prev, cur) => {
                        let i = -1
                        i = prev.findIndex(item => item.item === cur.item&&item.date===cur.date)
                        if (i != -1) {
                            prev[i].money = parseFloat(prev[i].money) + parseFloat(cur.money)
                        } else {
                            prev.push(cur)
                        }
                        return prev
                    }, [])

                    this.setState({
                        record1: newIncome
                    })
                }
                if (this.state.selectIndex1 == 1) {
                    let bar = data.data.reduce((prev, cur) => {
                        let i = -1
                        i = prev.findIndex(item => item.record_type === cur.record_type && item.date === cur.date)
                        if (i != -1) {
                            prev[i].money = parseFloat(prev[i].money) + parseFloat(cur.money)
                        } else {
                            prev.push(cur)
                        }
                        return prev
                    }, [])
                    this.setState({
                        rep: bar
                    }, () => {
                        console.log(this.state.rep, '1111');
                    })
                }
            }

        }).catch(err => {
            console.log('请求出错了：', err)
        })
    }
    render() {
        // 饼状形
        let data = []
        let data1 = []
        {
            this.state.record.map((item, index) => {
                data.push({
                    value: item.money,
                    name: item.item
                })
            })
        }
        {
            this.state.record1.map((item, index) => {
                data1.push({
                    value: item.money,
                    name: item.item
                })
            })
        }
        let option = {
            tooltip: {},
            series: [{
                name: '花费',
                type: 'pie',
                hoverAnimation: true,
                label: {
                    normal: {
                        position: 'inner'
                    }
                },
                data: data

            }]
        }
        let option2 = {
            tooltip: {},
            series: [{
                name: '收入',
                type: 'pie',
                hoverAnimation: true,
                label: {
                    normal: {
                        position: 'inner'
                    }
                },
                data: data1

            }]
        }

        // 柱状形
        let barxAxis = []
        let barExpend = []
        let barIncome = []
        {
            this.state.rep.map((item, index) => {
                barxAxis.push(item.date)
            })
        }
        {
            this.state.rep.map((item, index) => {
                if (item.record_type == '支出') {
                    barExpend.push(item.money)
                }
            })
        }
        {
            this.state.rep.map((item, index) => {
                if (item.record_type == '收入') {
                    barIncome.push(item.money)
                }
            })
        }
        let option1 = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['花费', '收入']
            },
            xAxis: {
                data: barxAxis
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '花费',
                    type: 'bar', // 柱状
                    data: barExpend

                },
                {
                    name: '收入',
                    type: 'bar', // 柱状
                    data: barIncome
                }
            ]
        };
        const buttons = ['支出', '收入']
        const buttons1 = ['饼状', '柱状图']
        const selectIndex = this.state.selectIndex
        const selectIndex1 = this.state.selectIndex1
        return (
            <View>
                <Header
                    leftComponent={{ icon: 'arrow-back', color: '#fff', onPress: this.goBack }}
                    centerComponent={{ text: '分析报告', style: { fontSize: 20, color: '#fff' } }}
                />
                <View style={{ flexDirection: 'row' }}>

                    <DatePicker
                        style={{ width: 120 }}
                        date={this.state.date}
                        mode='date'
                        placeholder='请选择时间'
                        format='YYYY-MM-DD'
                        confirmBtnText='确定'
                        cancelBtnText='取消'
                        customStyles={{
                            dateInput: {
                                marginLeft: 0,
                                borderWidth: 0
                            }
                        }}
                        onDateChange={(date) => { this.setState({ date: date }) }}
                    />
                    <DatePicker
                        style={{ width: 100 }}
                        date={this.state.date1}
                        mode='date'
                        placeholder='请选择时间'
                        format='YYYY-MM-DD'
                        confirmBtnText='确定'
                        cancelBtnText='取消'
                        customStyles={{
                            dateIcon: {
                                width: 0,
                                height: 0
                            },
                            dateInput: {
                                marginLeft: 0,
                                borderWidth: 0
                            }
                        }}
                        onDateChange={(date1) => { this.setState({ date1: date1 }) }}
                    />
                    <Icon
                        name='search'
                        onPress={this.search}
                    />
                    <ButtonGroup
                        onPress={this.updateIndex1}
                        selectedIndex={selectIndex1}
                        buttons={buttons1}
                        containerStyle={{ height: 50, borderRadius: 10, width: 200 }}
                    />

                </View>
                {this.state.selectIndex1 == 0 ?
                    (this.state.selectIndex == 0 ? <View><ButtonGroup
                        onPress={this.updateIndex}
                        selectedIndex={selectIndex}
                        buttons={buttons}
                        containerStyle={{ height: 50, borderRadius: 10 }}
                    />
                        <Echarts option={option} width={400} height={400} />
                    </View> : <View><ButtonGroup
                        onPress={this.updateIndex}
                        selectedIndex={selectIndex}
                        buttons={buttons}
                        containerStyle={{ height: 50, borderRadius: 10 }}
                    />
                            <Echarts option={option2} width={400} height={400} />

                        </View>)
                    : <Echarts option={option1} width={500} height={500} />}
            </View>
        )
    }
}

export default Aly