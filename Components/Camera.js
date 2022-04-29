import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { NavigationActions } from 'react-navigation';

import { Container, Content, Header, Item, Icon, Input, Button } from 'native-base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

class CameraComponent extends Component {

    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' })
        const { roll } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({ hasCameraRollPermission: roll === 'granted' })
    }

    render() {
        const { hasCameraPermission } = this.state
        if (hasCameraPermission === null) {
            return <View />
        }
        else if (hasCameraPermission === false) {
            return <Text> No access to camera</Text>
        }
        else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera style={{ flex: 1, justifyContent: 'space-between' }} type={this.state.type} ref={ref => { this.camera = ref; }} >

                        <Header searchBar rounded
                            style={{
                                position: 'absolute', backgroundColor: 'transparent',
                                left: 0, top: 0, right: 0, zIndex: 100, alignItems: 'center'
                            }}
                        >
                            <View style={{ flexDirection: 'row', flex: 4 }}>
                                <Icon name="logo-snapchat" style={{ color: 'white' }} />
                                <Item style={{ backgroundColor: 'transparent' }}>
                                    <Icon name="ios-search" style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}></Icon>


                                </Item>
                            </View>

                            <View style={{ flexDirection: 'row', flex: 2, justifyContent: 'space-around' }}>
                                <Icon name="ios-flash" style={{ color: 'white', fontWeight: 'bold' }} />
                                <Icon
                                    onPress={() => {
                                        this.setState({
                                            type: this.state.type === Camera.Constants.Type.back ?
                                                Camera.Constants.Type.front :
                                                Camera.Constants.Type.back
                                        })
                                    }}
                                    name="ios-reverse-camera" style={{ color: 'white', fontWeight: 'bold' }} />
                            </View>
                        </Header>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginBottom: 15, alignItems: 'flex-end' }}>
                            <MaterialCommunityIcons name="message-reply"
                                style={{ color: 'white', fontSize: 36 }}
                                onPress={
                                    () => {
                                        const navigateAction = NavigationActions.navigate({
                                            routeName: 'Message',
                                            params: { token: this.props.navigation.state.params.token }
                                        });
                                        this.props.navigation.dispatch(navigateAction);
                                    }
                                }></MaterialCommunityIcons>

                            <View style={{ alignItems: 'center' }}>
                                <MaterialCommunityIcons name="circle-outline"
                                    onPress={this.takePicture}
                                    style={{ color: 'white', fontSize: 100 }}
                                ></MaterialCommunityIcons>
                                <Icon name="ios-images" style={{ color: 'white', fontSize: 36 }} />
                            </View>
                            <MaterialCommunityIcons name="google-circles-communities"
                                style={{ color: 'white', fontSize: 36 }}
                            ></MaterialCommunityIcons>

                        </View>
                    </Camera>
                </View>
            )
        }
    }

    takePicture = async () => {
        let photo = await this.camera.takePictureAsync({ base64: true })
        const navigateAction = NavigationActions.navigate({
            routeName: 'List',
            params: { img: photo, token: this.props.navigation.state.params.token }
        });
        this.props.navigation.dispatch(navigateAction);
    }
}
export default CameraComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});