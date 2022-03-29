import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Dimensions,
    Image,
    TouchableOpacity,
    Keyboard
} from 'react-native'
import React from 'react'
import { BackgroundForm } from '../components'
import { useEffect, useState } from 'react/cjs/react.development'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, StylesGlobal } from '../ultils'
import { isPersonName, isPhoneNumber } from '../ultils/Functions'

const SignupScreen = ({ navigation, route }) => {

    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [fullname, setFullname] = useState('');
    const [isAcceptRule, setIsAcceptRule] = useState(false);

    const onPressViewRule = () => {
        navigation.navigate('Rules');
    }

    const onPressSigup = () => {
        // code

        navigation.navigate('OTP');
    }

    const onPressLogin = () => {
        navigation.navigate('Login');
    }

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true); // or some other action
            },
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false); // or some other action
            },
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <BackgroundForm titleShow={true} />
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
                    fontSize: 26,
                    marginBottom: 10
                }}>
                    ĐĂNG KÝ
                </Text>

                <TextInput
                    style={StylesGlobal.input}
                    placeholder='Số điện thoại'
                    keyboardType='number-pad'
                    onChangeText={text => setPhoneNumber(text)} />

                <TextInput
                    style={StylesGlobal.input}
                    placeholder='Tên người dùng'
                    autoComplete='name'
                    autoCapitalize='words'
                    onChangeText={text => setFullname(text)} />

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: 5
                        }}
                        activeOpacity={1}
                        onPress={() => setIsAcceptRule(!isAcceptRule)} >
                        {
                            isAcceptRule ?
                                <Image style={{
                                    width: 20,
                                    height: 20
                                }}
                                    source={require('../assets/imgs/checkbox_checked.png')} />
                                :
                                <Image style={{
                                    width: 20,
                                    height: 20
                                }}
                                    source={require('../assets/imgs/checkbox_unchecked.png')} />
                        }
                        <Text style={{
                            color: '#fff',
                            fontSize: 12.5,
                            marginStart: 4
                        }}>Tôi đã đọc và đồng ý với</Text>
                        <TouchableOpacity
                            activeOpacity={.8}
                            onPress={onPressViewRule} >
                            <Text style={{
                                fontWeight: 'bold',
                                color: Colors.kYellowColor,
                                fontSize: 12.5
                            }}>
                                {' thể lệ chương trình '}
                            </Text>
                        </TouchableOpacity>
                        <Text style={{
                            color: '#fff',
                            fontSize: 12.5
                        }}>
                            Pepsi Tết.
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: isKeyboardVisible ? height * .27 : height * .43
                }}>
                    <TouchableOpacity
                        activeOpacity={.8}
                        onPress={onPressSigup}
                        disabled={!(isPhoneNumber(phoneNumber) && isPersonName(fullname) && isAcceptRule)} >
                        {
                            isPhoneNumber(phoneNumber) && isPersonName(fullname) && isAcceptRule ?
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
                        activeOpacity={.8}
                        onPress={onPressLogin} >
                        <Image
                            source={require('../assets/imgs/btn_login.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView >
    )
}

export default SignupScreen

const styles = StyleSheet.create({})