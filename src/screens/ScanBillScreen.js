import {
    StyleSheet,
    TouchableOpacity,
    View,
    Dimensions,
    Image,
    StatusBar,
    Modal,
    Text
} from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components';
import Colors from '../ultils/Colors'
import * as ImagePicker from 'react-native-image-picker';
import { QRreader } from 'react-native-qr-decode-image-camera';
import { PermissionsAndroid } from 'react-native';

const ScanBillScreen = ({ navigation, route }) => {

    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;

    const [billImage, setBillImage] = useState(require('../assets/imgs/bill.png'));
    const [modalErrorShow, setModalErrorShow] = useState(false);
    const [modalSuccessShow, setModalSuccessShow] = useState(false);
    const [count, setCount] = useState(0);

    useEffect(() => {
        // takePicture();
    }, [])

    const takePicture = async () => {
        await requestCameraPermission();
        const options = {
            maxWidth: 2000,
            maxHeight: 2000,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.launchCamera(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                console.log(response);
                const path = { uri: response.assets[0].uri };
                setBillImage(path);
                if (count % 2 == 0) {
                    setModalErrorShow(true)
                    setModalSuccessShow(false);
                } else {
                    setModalErrorShow(false)
                    setModalSuccessShow(true);
                }
                setCount(count + 1);
            }
        });
    }

    const validateQRCode = () => {
        takePicture();
    }

    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "App Camera Permission",
                    message: "App needs access to your camera ",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Camera permission given");
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    }
    const ModalError = () => {
        return (
            <Modal
                transparent
                visible={modalErrorShow}
                statusBarTranslucent
                animationType={'slide'}>
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,.6)',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Image
                        source={require('../assets/imgs/popup_wrong_qr_code.png')}
                        style={{
                            position: 'absolute',
                            width: 232 * 1.2,
                            height: 146 * 1.2,
                        }} />
                    <TouchableOpacity
                        activeOpacity={.6}
                        onPress={takePicture}>
                        <Image
                            source={require('../assets/imgs/btn_reScan.png')}
                            style={{
                                width: 140 * 1.2,
                                height: 40 * 1.2,
                                marginTop: 80
                            }} />
                    </TouchableOpacity>
                </View>
            </Modal>
        )
    }

    const ModalSuccess = ({ playCount }) => {
        return (
            <Modal
                transparent
                visible={modalSuccessShow}
                statusBarTranslucent
                animationType={'slide'}>
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,.6)',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Image
                        source={require('../assets/imgs/popup_success_qr.png')}
                        style={{
                            position: 'absolute',
                            width: 260,
                            height: 360
                        }} />
                    <Image
                        source={require('../assets/imgs/ic_gift_popup_success.png')}
                        style={{
                            position: 'absolute',
                            top: height * .238,
                            width: 189,
                            height: 93
                        }} />
                    <TouchableOpacity
                        activeOpacity={.6}
                        onPress={() => setModalSuccessShow(false)}
                        style={{
                            position: 'absolute',
                            top: height * .315,
                            left: width * .75
                        }}>
                        <Image
                            source={require('../assets/imgs/btn_close_modal.png')}
                            style={{
                                width: 24,
                                height: 24,
                            }} />
                    </TouchableOpacity>

                    <View style={{
                        position: 'absolute',
                        top: height * .58,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontSize: 16,
                            color: '#333',
                            marginBottom: 10
                        }}>
                            {'B???n ??ang c?? '}
                            <Text style={{
                                fontSize: 19,
                                fontWeight: 'bold',
                                color: Colors.kBlue3Color
                            }}>
                                {playCount < 10 ? '0' + playCount : playCount}
                            </Text>
                            {' l?????t ch??i'}
                        </Text>
                        <TouchableOpacity
                            activeOpacity={.6}
                            onPress={takePicture}
                            style={{
                                marginBottom: 10
                            }}>
                            <Image
                                source={require('../assets/imgs/btn_continue_scan.png')}
                                style={{
                                    width: 122,
                                    height: 36,
                                }} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={.6}
                            onPress={() => navigation.replace('Home')}>
                            <Image
                                source={require('../assets/imgs/btn_play_now.png')}
                                style={{
                                    width: 122,
                                    height: 36,
                                }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }

    const Background = () => {
        return <View style={{
            position: 'absolute',
            flex: 1,
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
        }}>
            <Image
                source={require('../assets/imgs/bg_gradient.png')}
                style={{
                    position: 'absolute',
                    flex: 1,
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    resizeMode: 'cover'
                }} />

            <Image
                source={require('../assets/imgs/ic_scanLeft.png')}
                style={{
                    position: 'absolute',
                    flex: 1,
                    top: 0,
                    left: 0,
                    bottom: 0,
                }} />

            <Image
                source={require('../assets/imgs/ic_scanRight.png')}
                style={{
                    position: 'absolute',
                    flex: 1,
                    top: 0,
                    right: 0,
                    bottom: 0,
                }} />

            <Image
                source={require('../assets/imgs/ic_scanRightBottom.png')}
                style={{
                    position: 'absolute',
                    flex: 1,
                    right: 0,
                    bottom: 0,
                }} />

        </View>
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Background />
            <StatusBar translucent backgroundColor={'rgba(0,0,0,0)'} />
            <ModalError />
            <ModalSuccess playCount={8} />
            <Header
                navigation={navigation}
                title={'QU??T M??'}
                isButtonBack
                isButtonLogout />

            <View style={{
                position: 'absolute',
                top: height * .16,
                left: 0,
                right: 0,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Image
                    source={billImage}
                    style={{
                        width: 305,
                        height: 542,
                        resizeMode: 'cover'
                    }} />
            </View>

            <View style={{
                position: 'absolute',
                top: height * .91,
                left: 0,
                right: 0,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <TouchableOpacity activeOpacity={.6} onPress={validateQRCode}>
                    <Image
                        source={require('../assets/imgs/btn_startScan.png')}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default ScanBillScreen

const styles = StyleSheet.create({})