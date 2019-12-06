import React, { Component } from 'react';
import { View, TextInput, ImageBackground, Text } from 'react-native';
import { Input, Avatar, Button, Header, Divider, ListItem, Icon } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';

const list = [
    { name: '记账', icon: 'border-color' },
    { name: '查看流水', icon: 'search' },
    { name: '分析报告', icon: 'system-update-alt' },
    { name: '退出', icon: 'wrap-text' }
]


class Home extends Component {
    constructor() {
        super()
        this.state = {
            account: ''
        }
    }
    componentDidMount() {
        AsyncStorage.getItem('username').then(data => {
            console.log(data)
            this.setState({ account: data })
        })
    }
    goTally = () => {
        this.props.navigation.navigate('tally')
    }
    logOut = () => {
        this.props.navigation.navigate('login')
        console.log(111)
    }
    goCheck = () => {
        this.props.navigation.navigate('check')
    }
    goAly = () => {
        this.props.navigation.navigate('aly')
    }
    render() {
        return (
            <View>
                <Header centerComponent={{ text: '日常记账', style: { color: '#fff', fontSize: 24 } }} />
                <Avatar
                    rounded
                    source={require('../img/header.jpg')}
                    size='large'
                    containerStyle={{ marginLeft: '43%', marginTop: 40 }}
                />
                <Text style={{ marginBottom: 60, textAlign: 'center', fontSize: 30 }}>{this.state.account}</Text>
                <Divider />

                {/* {list.map((item,index)=>(
                <ListItem
                key={index}
                leftIcon={{ name: item.icon }}
                title={item.name}
                chevron
                bottomDivider
                />
            ))} */}
                <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>

                    <View style={{ width: '50%', height: 120, backgroundColor: 'skyblue' }}>
                        <Icon
                            name='border-color'
                            size={50}
                            iconStyle={{ marginTop: 20 }}
                            onPress={this.goTally}
                        />
                        <Text style={{ textAlign: 'center', fontSize: 20 }}>记账</Text>
                    </View>

                    <View style={{ width: '50%', height: 120, backgroundColor: 'skyblue' }}>
                        <Icon
                            name='search'
                            size={50}
                            iconStyle={{ marginTop: 20 }}
                            onPress={this.goCheck}
                        />
                        <Text style={{ textAlign: 'center', fontSize: 20 }}>查看流水</Text>
                    </View>

                    <View style={{ width: '50%', height: 120, backgroundColor: 'skyblue' }}>
                        <Icon
                            name='system-update-alt'
                            size={50}
                            iconStyle={{ marginTop: 20 }}
                            onPress={this.goAly}
                        />
                        <Text style={{ textAlign: 'center', fontSize: 20 }}>分析报告</Text>
                    </View>

                    <View style={{ width: '50%', height: 120, backgroundColor: 'skyblue' }}>
                        <Icon
                            name='wrap-text'
                            size={50}
                            iconStyle={{ marginTop: 20 }}
                            onPress={this.logOut}
                        />
                        <Text style={{ textAlign: 'center', fontSize: 20 }}>退出</Text>
                    </View>

                </View>
            </View>
        )
    }
}

export default Home