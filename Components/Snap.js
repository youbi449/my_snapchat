import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Button, SafeAreaView, ScrollView, ImageBackground, Alert } from 'react-native'
import { NavigationActions, StackActions } from 'react-navigation';




export default class Snap extends React.Component {

    state = {
        fetch: [],
        token: this.props.navigation.state.params.token,
        id: this.props.navigation.state.params.id,
        duration: this.props.navigation.state.params.duration,
        from: this.props.navigation.state.params.from
    };

    componentWillMount() {
        const headers = this.state.token
        console.log("xsscs")
        fetch("http://snapchat.wac.under-wolf.eu/snap/" + this.state.id, {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
                'token': headers
            }
        }).then((response) => response.json()).then((responseJson) => {
            console.log("dkdzlkdlz")
            this.setState({ fetch: responseJson });
            this.setState({ link: "http://snapchat.wac.under-wolf.eu" + responseJson.data.image.link })
            setTimeout(() => {
                fetch("http://snapchat.wac.under-wolf.eu/seen", {
                    method: 'post',
                    headers: {
                        "Content-Type": "application/json",
                        'token': this.state.token
                    },
                    body: JSON.stringify({ id: this.state.id })
                }).then((response) => response.json()).then((responseJson) => {
                    this.setState({ fetch: responseJson.data });

                }).catch(err => {
                    console.log(err);
                });

                const navigateAction = NavigationActions.navigate({
                    routeName: 'Camera',
                    params: { token: this.props.navigation.state.params.token }
                });
                this.props.navigation.dispatch(navigateAction);
            }, this.state.duration * 1000)
        }).catch(err => {
            console.log(err);
        });
    }

    render() {

        return (
            <SafeAreaView>
                <ImageBackground source={{ uri: this.state.link }} style={{ width: 500, height: 1000 }}>
                    <Text onPress={() => Alert.alert('Duration: ' + this.state.duration + ' seconds')}>From: {this.state.from}</Text>
                </ImageBackground>
            </SafeAreaView>
        )
    }
}