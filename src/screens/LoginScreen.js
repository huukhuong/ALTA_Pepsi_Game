import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Dimensions,
    Image,
    TouchableOpacity,
} from 'react-native'
import React from 'react'
import { BackgroundForm } from '../components'
import { useEffect, useState } from 'react/cjs/react.development'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StylesGlobal } from '../ultils'
import { isPhoneNumber } from '../ultils/Functions'
import auth from '@react-native-firebase/auth';
import Loader from "react-native-modal-loader";

const LoginScreen = ({ navigation, route }) => {

    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;

    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);

    const onPressSignup = () => {
        navigation.navigate('Signup');
    }

    const onPressLogin = async () => {
        setLoading(true);
        try {
            const confirm = await auth().signInWithPhoneNumber('+84' + phoneNumber);
            navigation.navigate('OTP', { confirm: confirm, phoneNumber: '+84' + phoneNumber });
        } catch (e) {
            console.log(e);
            alert('Không thể xác thực, vui lòng thử lại sau');
        }
        setLoading(false);
    }

    useEffect(() => {
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <BackgroundForm titleShow={true} />
            <Loader loading={loading} />
            <View style={{
                position: 'absolute',
                top: height * .3,
                left: 0,
                right: 0,
                justifyContent: 'center',
                marginHorizontal: 28
            }}>
                <Text style={{
                    textAlign: 'center',
                    color: '#FFF',
                    fontWeight: 'bold',
                    fontSize: 26
                }}>
                    ĐĂNG NHẬP
                </Text>
                <Text style={{
                    color: '#FFF',
                    fontWeight: 'bold',
                    fontSize: 16,
                    marginTop: 14
                }}>
                    Số điện thoại
                </Text>

                <TextInput
                    style={StylesGlobal.input}
                    placeholder='Nhập số điện thoại'
                    keyboardType='number-pad'
                    autoComplete='tel'
                    onChangeText={text => setPhoneNumber(text)} />

                <Image
                    source={require('../assets/imgs/3lon1.png')}
                    style={{
                        marginVertical: 22,
                        alignSelf: 'center'
                    }} />

                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity
                        activeOpacity={.8}
                        disabled={!isPhoneNumber(phoneNumber)}
                        onPress={onPressLogin} >
                        {
                            isPhoneNumber(phoneNumber) ?
                                <Image
                                    source={require('../assets/imgs/btn_getOTP_active.png')} />
                                :
                                <Image
                                    source={require('../assets/imgs/btn_getOTP_disabled.png')} />
                        }
                    </TouchableOpacity>

                    <Text style={{
                        color: '#fff',
                        fontSize: 16,
                        marginBottom: 8
                    }}>
                        Hoặc
                    </Text>

                    <TouchableOpacity
                        onPress={onPressSignup}
                        activeOpacity={.8}>
                        <Image
                            source={require('../assets/imgs/btn_signup.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({})