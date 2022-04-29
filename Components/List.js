import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Button, SafeAreaView, ScrollView, ImageBackground, Modal, Alert } from 'react-native'
import { NavigationActions } from 'react-navigation';

const styles = StyleSheet.create({

    button: {
        backgroundColor: '#e7e7e7',
        color: '#FFFFFF',
        fontSize: 24
    },

    item: {
        height: 25,
        borderStyle: "solid"

    }
})



export default class List extends React.Component {

    state = {
        fetch: [],
        picture: this.props.navigation.state.params.img,
        duration: 10
    };

    componentDidMount() {

        const headers = this.props.navigation.state.params.token
        fetch("http://snapchat.wac.under-wolf.eu/all", {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
                'token': headers
            }
        }).then((response) => response.json()).then((responseJson) => {
            this.setState({ fetch: responseJson.data });

        }).catch(err => {
            console.log(err);
        });

        {
            Alert.prompt('Enter duration', null, (second) => {
                if (!isNaN(second)) {
                    this.setState({ duration: second })
                    Alert.alert('State', 'Time set to' + second + ' seconds')
                    console.log(this.state.duration)
                } else {
                    this.setState({ duration: 10 })
                    Alert.alert('State', "You're snap will be sent with 10 seconds duration");
                    console.log(this.state.duration)
                }
            })
        }



    }



    render() {

        return (

            <SafeAreaView>
                <ImageBackground source={{ uri: `data:image/gif;base64,${this.state.picture.base64}` }} style={{ width: '100%', height: '100%' }}>
                    <ScrollView >
                        {this.state.fetch.map((item, index) => {
                            return (<Button color="red" key={index} title={item.email} onPress={() => {
                                this.setState({ mail: item.email })
                                const data = new FormData();
                                data.append('image', {
                                    uri: this.state.picture.uri,
                                    type: 'image/jpg',
                                    name: 'photo.jpg'
                                });
                                data.append('to', item.email);
                                data.append('duration', this.state.duration);
                                fetch('http://snapchat.wac.under-wolf.eu/snap', {
                                    method: 'POST',
                                    body: data,
                                    headers: {
                                        'content-type': 'multipart/form-data',
                                        token: this.props.navigation.state.params.token
                                    }
                                }).then(response => response)
                                    .then(response => {
                                        console.log(response);
                                    })  
                                    .catch(error => {
                                        console.log(error);
                                    });
                            }}
                            />
                            )
                        })}
                    </ScrollView>
                </ImageBackground>
            </SafeAreaView>
        )
    }
}
