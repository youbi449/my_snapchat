import React, { Component } from 'react';
import { Button, SafeAreaView, ScrollView } from 'react-native'
import { NavigationActions } from 'react-navigation';




export default class Message extends React.Component {

    state = {
        fetch: []
    };

    componentDidMount() {

        const headers = this.props.navigation.state.params.token
        fetch("http://snapchat.wac.under-wolf.eu/snaps", {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
                'token': headers
            }
        }).then((response) => response.json()).then((responseJson) => {
            this.setState({ fetch: responseJson.data });
            console.log(responseJson)

        }).catch(err => {
            console.log(err);
        });
    }

    render() {

        return (
            <SafeAreaView>
                <ScrollView>
                    {this.state.fetch.map((item, index) => {
                        return (
                            <Button key={index} title={item.from} onPress={() => {
                                    const navigateAction = NavigationActions.navigate({
                                        routeName: 'Snap',
                                        params: {
                                            token: this.props.navigation.state.params.token,
                                            id: item._id,
                                            duration: item.duration,
                                            from: item.from
                                        }
                                    });
                                    this.props.navigation.dispatch(navigateAction);
                            }} />
                        )
                    })}
                </ScrollView>
            </SafeAreaView>
        )
    }
}