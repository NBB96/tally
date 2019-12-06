import React, { Component } from 'react';
import { View, TextInput, ImageBackground, Text } from 'react-native';
import { Input, Avatar, Button, Header, Divider, Icon, ListItem, ButtonGroup ,Overlay} from 'react-native-elements'
// import { tsInferType } from '@babel/types';
import Picker from 'react-native-picker'
import qs from 'querystring';
// import { Icon } from 'react-native-vector-icons/Foundation';
let p1;
class Tally extends Component {
    constructor() {
        super()
        this.state = {
            list: [],
            category: '',
            date: '',
            price: '',
            remark: '',
            income: '',
            record_type: '支出',
            num: 1,
            selectIndex: 0,
            isVisible:false,
            isVisible1:false
            // arry: ['餐饮', '购物', '交通', '烟酒', '社交', '医疗', '学习', '礼物', '宠物']
        }

    }
    goBack = () => {
        this.props.navigation.navigate('home');
    }
    priceChange = (v) => {
        console.log(v)
        this.setState({
            price: this.state.price = v
        })
    }
    remarkChange = (v) => {
        this.setState({
            remark: this.state.remark = v
        })
    }
    componentDidMount() {

        // let data = ['餐饮', '购物', '交通', '烟酒', '社交', '医疗', '学习', '礼物', '宠物']
        // let date = ['111']
        // if (this.state.num == 1) {
        //     // this.state.arry==data
        //     this.setState({
        //         arry: data
        //     })
        // }else {
        //     // this.state.arry==date
        //     this.setState({
        //         arry: date
        //     })
        // }
        // Picker.init({
        //     pickerTitleText: '请选择',
        //     pickerConfirmBtnText: '确定',
        //     pickerCancelBtnText: '取消',
        //     pickerData: this.state.arry,
        //     onPickerConfirm: result => {
        //         console.log(result)
        //         let arry=[]
        //         let obj={
        //             category: '',
        //             date: '',
        //             price:'',
        //             remark:'',
        //         }
        //         this.setState({
        //             category: this.state.category = result
        //         })
        //     }
        // })
    }

    //收入
    selectIncome = () => {
        let data = ['工资', '兼职', '理财', '礼金', '其他']
        Picker.init({
            pickerTitleText: '请选择',
            pickerConfirmBtnText: '确定',
            pickerCancelBtnText: '取消',
            pickerData: data,
            onPickerConfirm: result => {
                console.log(result)
                this.setState({
                    income: this.state.category = result
                })
            }
        })
        Picker.show()
    }

    //支出
    selectCategroy = () => {
        // this.setState({
        //     num:1
        // })
        let data = ['餐饮', '购物', '交通', '烟酒', '社交', '医疗', '学习', '礼物', '宠物']
        Picker.init({
            pickerTitleText: '请选择',
            pickerConfirmBtnText: '确定',
            pickerCancelBtnText: '取消',
            pickerData: data,
            onPickerConfirm: result => {
                console.log(result)
                this.setState({
                    category: this.state.category = result
                })
            }
        })
        Picker.show()
    }

    //日期选择
    selectDate = () => {
        // this.setState({
        //     num:2
        // })
        let date = []
        let currentDate=new Date()
        let yy=currentDate.getFullYear()
        let mm=currentDate.getMonth()+1
        let dd=currentDate.getDate()
        for (let y = 2019; y >= 1945; y--) {
            let month = []
            for (let m = 1; m <= 12; m++) {
                let day = []
                if (m === 2) {
                    for (let d = 1; d < 29; d++) {
                        day.push(d)
                    }
                    if (y % 4 === 0) {
                        day.push(29)
                    }
                }
                else if (m in { 1: 1, 3: 1, 5: 1, 7: 1, 8: 1, 10: 1, 12: 1 }) {
                    for (let d = 1; d < 32; d++) {
                        day.push(d)
                    }
                }
                else {
                    for (let d = 1; d < 31; d++) {
                        day.push(d)
                    }
                }
                let _month = {}
                _month[m] = day
                month.push(_month)
                // month.push()
            }
            date.push({ [y]: month })
        }
        Picker.init({
            pickerTitleText: '请选择',
            pickerConfirmBtnText: '确定',
            pickerCancelBtnText: '取消',
            pickerData: date,
            selectedValue:[yy,mm,dd],
            onPickerConfirm: result => {
                console.log(result)
                let year = result[0]
                let month = result[1]
                let day = result[2]
                console.log(year, month, day)
                let time = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
                console.log(time)
                this.setState({
                    date: time
                })
            }
        })
        Picker.show()
    }

    //确定
    sure = () => {
        let obj = {
            // income: this.state.income,
            record_type: this.state.record_type,
            item: this.state.category,
            money: this.state.price,
            remark: this.state.remark,
            date: this.state.date
        }
        fetch('http://192.168.0.145:3000/record/add?' + qs.stringify(obj), {
        }).then(response => response.json()).then(data => {
            console.log('响应的结果：', data);
            if(data.code==2){
                this.props.navigation.navigate('home')
            }
        }).catch(err => {
            console.log('请求出错了：', err)
        })
    }

    //取消
    cancel = () => {
        this.setState({
            category: '',
            date: '',
            price: '',
            remark: '',
            record_type: ''
        })
    }

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
            record_type: this.state.record_type
        }, () => {
            console.log(this.state.record_type, this.state.selectIndex)
        }
        )
    }

    //修改支出类别
    expendType=()=>{

    }

    //修改收入类别
    incomeType=()=>{

    }


    render() {
        const buttons = ['支出', '收入']
        const selectIndex = this.state.selectIndex
        return (
            <View>
                {this.state.isVisible&&(
                    <Overlay>

                    </Overlay>
                )}
                <Header
                    leftComponent={{ icon: 'arrow-back', color: '#fff', onPress: this.goBack }}
                    centerComponent={{ text: '记账', style: { fontSize: 20, color: '#fff' } }}
                />
                <ButtonGroup
                    onPress={this.updateIndex}
                    selectedIndex={selectIndex}
                    buttons={buttons}
                    containerStyle={{ height: 50, borderRadius: 10 }}
                />
                <View>
                    <ListItem
                        leftIcon={{ name: 'payment' }}
                        title='金额'
                        titleStyle={{ color: 'blue' }}
                        subtitle={
                            <View>
                                {/* <Text>金额</Text> */}
                                <TextInput placeholder='请输入金额' onChangeText={this.priceChange} />
                            </View>
                        }
                    />


                    {this.state.selectIndex == 0 ? <ListItem
                        leftIcon={{ name: 'border-all' }}
                        title='类别'
                        titleStyle={{ color: 'blue' }}
                        subtitle={
                            <View style={{flexDirection:'row'}}>
                                <Text style={{ fontSize: 18, marginTop: 10, color: 'skyblue' }}>{this.state.category}</Text>
                                <Button
                                    title='支出类别'
                                    type='clear'
                                    buttonStyle={{ borderRadius: 10, width: 100, height: 40, borderWidth: 1, marginLeft: 200 }}
                                    onPress={this.selectCategroy}
                                />
                                <Button
                                    title='类别修改'
                                    type='clear'
                                    buttonStyle={{ borderRadius: 10, width: 100, height: 40, borderWidth: 1, marginLeft: 200 }}
                                    onPress={this.expendType}
                                />
                            </View>
                        }
                    /> : <ListItem
                            leftIcon={{ name: 'border-all' }}
                            title='类别'
                            titleStyle={{ color: 'blue' }}
                            subtitle={
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{ fontSize: 18, marginTop: 10, color: 'skyblue' }}>{this.state.income}</Text>
                                    <Button
                                        title='收入类别'
                                        type='clear'
                                        buttonStyle={{ borderRadius: 10, width: 100, height: 40, borderWidth: 1, marginLeft: 200 }}
                                        onPress={this.selectIncome}
                                    />
                                    <Button
                                        title='类别修改'
                                        type='clear'
                                        buttonStyle={{ borderRadius: 10, width: 100, height: 40, borderWidth: 1, marginLeft: 200 }}
                                        onPress={this.incomeType}
                                    />
                                </View>
                            }
                        />}


                    <ListItem
                        leftIcon={{ name: 'date-range' }}
                        title='日期'
                        titleStyle={{ color: 'blue' }}
                        subtitle={
                            <View>
                                <Text style={{ fontSize: 18, marginTop: 10, color: 'skyblue' }}>{this.state.date}</Text>
                                <Button
                                    title='选择日期'
                                    type='clear'
                                    buttonStyle={{ borderRadius: 10, width: 100, height: 40, borderWidth: 1, marginLeft: 200 }}
                                    onPress={this.selectDate}
                                />
                            </View>
                        }
                    />
                    <ListItem
                        leftIcon={{ name: 'border-color' }}
                        title='说明'
                        titleStyle={{ color: 'blue' }}
                        subtitle={
                            <View>
                                <TextInput placeholder='说明' onChangeText={this.remarkChange} />
                            </View>
                        }
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

                    <Button
                        title='确定'
                        type='solid'
                        buttonStyle={{ width: 100 }}
                        onPress={this.sure}
                    />
                    <Button
                        title='取消'
                        type='clear'
                        buttonStyle={{ width: 100, borderWidth: 1 }}
                        onPress={this.cancel}
                    />
                </View>
            </View>
        )
    }
}

export default Tally