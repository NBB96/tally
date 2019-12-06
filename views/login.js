import React, { Component } from 'react';
import { View, TextInput, ImageBackground ,Text} from 'react-native';
import { Input, Avatar, Button, Overlay } from 'react-native-elements'
import Icon from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-community/async-storage';

class Login extends Component {
    constructor() {
        super()
        this.state = {
            account: '',
            password: '',
            flag: false
        }
    }
    log = () => {

        // 路由跳转携带参数
        fetch(`http://192.168.0.145:3000/sys/login?account=${this.state.account}&password=${this.state.password}`).then(res => res.json()).then(data => {
            console.log('data', data)
            if (data.code === 2) {
                this.props.navigation.navigate('home');
                AsyncStorage.setItem('username', this.state.account)
            } else {
                this.setState({
                    flag: true
                })
            }
        }).catch(err => {
            console.log('err', err)
        })         
        // this.props.navigation.navigate('home');
    }

    account = (v) => {
        this.setState({
            account: this.state.account = v
        })
    }
    password = (v) => {
        this.setState({
            password: this.state.password = v
        })
    }
    render() {
        return (
            <ImageBackground source={require('../img/logobg2.jpg')} style={{ width: '100%', height: '100%' }}>
                <Overlay
                    isVisible={this.state.flag}
                    width='auto'
                    height='auto'
                    onBackdropPress={() => this.setState({ flag: false })}
                >
                    <Text>账号或密码错误</Text>
                </Overlay>
                <Avatar
                    rounded
                    //    source={require('../img/header.jpg')}
                    icon={{ name: 'user', type: 'font-awesome' }}
                    size='large'
                    containerStyle={{ marginLeft: 200, marginTop: 115 }}
                />
                <View style={{}}>
                    {/* <TextInput placeholder="账号" style={{ borderWidth: 1, marginBottom: 10, width: 200 }} />
                    <TextInput placeholder="密码" style={{ borderWidth: 1, width: 200 }} /> */}
                    <Input
                        placeholder='手机号/邮箱'
                        leftIcon={
                            <Icon
                                name='user'
                                size={24}
                                color='black'
                            />
                        }
                        errorStyle={{ color: 'red' }}
                        onChangeText={this.account}
                    />
                    <Input
                    secureTextEntry
                        placeholder='请输入密码'
                        leftIcon={
                            <Icon
                                name='lock1'
                                size={24}
                                color='black'
                            />
                        }
                        errorStyle={{ color: 'red' }}
                        onChangeText={this.password}
                    />
                    <Button title="登录" buttonStyle={{ width: 100, marginLeft: 180, marginTop: 50 }} onPress={this.log} />

                </View>
            </ImageBackground>
        )
    }
}

export default Login;