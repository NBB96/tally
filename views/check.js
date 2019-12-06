import React, { Component } from 'react';
import { View, TextInput, ImageBackground, Text, ListView, ScrollView } from 'react-native';
import { Input, Avatar, Button, Divider, Icon, ListItem } from 'react-native-elements'
import DatePicker from 'react-native-datepicker'
import { Row, Rows, Table } from 'react-native-table-component'
// import { Cell, DataTable, Header, HeaderCell, Row, EditableCell, CheckableCell, } from 'react-native-data-table'
const tableHead = ['收支', '类别', '金额', '日期', '备注', '操作']

var list = []
class Check extends Component {
    constructor() {
        super()
        // this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        this.state = {
            date: '',
            date1: '',
            record: [],
            // ds: this.ds.cloneWithRows(list)
        }
    }
    componentDidMount() {
        fetch('http://192.168.0.145:3000/record').then(response => response.json()).then(data => {
            console.log('响应的结果：', data);
            list = data.data
            // console.log(list)
            this.setState({ record: data.data }, () => {
                console.log(this.state.record)
            })
        }).catch(err => {
            console.log('请求出错了：', err)
        })

    }
    goBack = () => {
        this.props.navigation.navigate('home');
    }

    //时间筛选
    search = () => {
        var startDate = new Date(this.state.date).getTime()
        var endDate = new Date(this.state.date1).getTime()

        fetch(`http://192.168.0.145:3000/record/date?start=${startDate}&end=${endDate}`).then(response => response.json()).then(data => {
            console.log('响应的结果：', data);
            if (data.code == 2) {
                this.setState({
                    record: data.data
                })
            }
        }).catch(err => {
            console.log('请求出错了：', err)
        })
    }

    //删除
    del = (id) => {
        fetch(`http://192.168.0.145:3000/record/del?id=${id}`).then(response => response.json()).then(data => {
            console.log('响应的结果：', data);
            if (data.code == 2) {
                this.setState({
                    record: data.data
                })
            }
        }).catch(err => {
            console.log('请求出错了：', err)
        })
        // console.log(id);

    }
    render() {
        // const tableData = this.state.record.map((item, index) => {
        //     return [item.record_type, item.item, item.money, item.date, item.remark, <Button title='删除'
        //         onPress={this.del(item.id)} />]
        // })
        return (
            <View>
                {/* <Header
                    leftComponent={{ icon: 'arrow-back', color: '#fff', onPress: this.goBack }}
                    centerComponent={{ text: '查看流水', style: { fontSize: 20, color: '#fff' } }}
                /> */}
                <View style={{ flexDirection: 'row' }}>

                    <DatePicker
                        style={{ width: 200 }}
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
                        style={{ width: 200 }}
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

                </View>
                {/* <Table>
                    <Row data={tableHead} textStyle={{ color: 'skyblue' }} />
                    <Rows data={tableData} />
                </Table> */}
                <ScrollView>

                    <ListItem
                        subtitle={
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ color: 'skyblue', fontSize: 20 }}>收支</Text>
                                <Text style={{ color: 'skyblue', fontSize: 20 }}>类别</Text>
                                <Text style={{ color: 'skyblue', fontSize: 20 }}>金额</Text>
                                <Text style={{ color: 'skyblue', fontSize: 20 }}>日期</Text>
                                <Text style={{ color: 'skyblue', fontSize: 20 }}>备注</Text>
                                <Text style={{ color: 'skyblue', fontSize: 20 }}>操作</Text>
                            </View>
                        }
                    />

                    {this.state.record.map((item, index) => {
                        return (
                            <ListItem
                                key={index}
                                subtitle={
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text>{item.record_type}</Text>
                                        <Text>{item.item}</Text>
                                        <Text>{item.money}</Text>
                                        <Text>{item.date}</Text>
                                        <Text>{item.remark}</Text>
                                        <Button
                                            title='删除'
                                            onPress={() => this.del(item.id)}
                                        />
                                    </View>
                                }
                            />

                        )
                    })}
                </ScrollView>

            </View>
        )
    }
}

export default Check