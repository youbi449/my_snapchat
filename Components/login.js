import t from 'tcomb-form-native';
import { StyleSheet, Text, View, Button, TextInput, Image } from 'react-native';
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';

const styles = StyleSheet.create({


    container: {


        padding: 20,


        height: '100%',

        backgroundColor: '#FFFF00',
        flex: 1

    },
    input: {
        margin: 15,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1,
        borderRadius: 15,
        backgroundColor: '#FFFFFF'
    },
    content: {
        marginTop: '20%',
        backgroundColor: '#FFFF00'
    },
    logo: {
        height: 175,
        width: 175,


    },
    logoContainer: {
        alignItems: 'center',
        marginTop: '20%'

    }

});

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = { username: '', password: '' }
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo}

                        source={require('../images/thumbnail_logo_snap.png')}
                    />
                </View>
                <View style={styles.content}>

                    <Text style={{ color: 'red' }}>{this.state.error}</Text>
                    <TextInput style={styles.input}
                        onChangeText={(username) => this.setState({ username: username })}
                        value={this.state.username}
                        placeholder="Email" />
                    <TextInput style={styles.input}
                        onChangeText={(password) => this.setState({ password: password })}
                        value={this.state.password}
                        placeholder="Password" />
                    <Button color="blue" style={{ margin: 100 }} title="Log in" onPress={this.login} />
                    <Text style={{ marginLeft: 160, marginTop: 100 }}>Not register ?</Text>
                    <Button color="black" title="Register now !" onPress={() => navigate('Register')} />
                </View>
            </View>
        )
    }
    login = async () => {
        fetch('http://snapchat.wac.under-wolf.eu/connection', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: this.state.username, password: this.state.password })
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === 400) {
                    console.log(responseJson)
                    this.setState({ error: responseJson.message })
                }
                else {
                    const navigateAction = NavigationActions.navigate({
                        routeName: 'Camera',
                        params: {
                            token: responseJson.data.token
                        }
                    });
                    this.props.navigation.dispatch(navigateAction);
                }
            })
    }
}