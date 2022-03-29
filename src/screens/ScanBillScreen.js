import {
    StyleSheet,
    TouchableOpacity,
    View,
    Dimensions,
    Image,
    StatusBar
} from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components';

const ScanBillScreen = ({ navigation, route }) => {

    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;

    const [billImage, setBillImage] = useState(require('../assets/imgs/bill.png'));

    useEffect(() => {
        takePicture();
    }, [])

    const takePicture = () => {
        
    }

    const validateQRCode = async () => {

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
            <Header
                navigation={navigation}
                title={'QUÉT MÃ'}
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
                    <Image source={require('../assets/imgs/btn_startScan.png')} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default ScanBillScreen

const styles = StyleSheet.create({})