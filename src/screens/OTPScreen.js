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
import { useEffect, useRef, useState } from 'react/cjs/react.development'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, StylesGlobal } from '../ultils'

const OTPScreen = ({ navigation, route }) => {

    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;

    const { confirm, phoneNumber } = route.params;

    const [otpCode, setOtpCode] = useState([null, null, null, null, null, null]);
    const [otpCorrect, setOtpCorrect] = useState(true);
    const [isBackspace, setIsBackspace] = useState(false);
    const [isEmptyCode, setIsEmptyCode] = useState(true);

    const otp1 = useRef();
    const otp2 = useRef();
    const otp3 = useRef();
    const otp4 = useRef();
    const otp5 = useRef();
    const otp6 = useRef();

    const nextOtp = (text, ref, index) => {
        if (!isBackspace) {
            (
                ref === otp1 ? otp2 :
                    ref === otp2 ? otp3 :
                        ref === otp3 ? otp4 :
                            ref === otp4 ? otp5 : otp6
            ).current.focus();
        } else {
            (
                ref === otp6 ? otp5 :
                    ref === otp5 ? otp4 :
                        ref === otp4 ? otp3 :
                            ref === otp3 ? otp2
                                : otp1
            ).current.focus();
            if (ref === otp1) {
                setOtpCode([null, null, null, null, null, null]);
                return;
            }
        }
        let tmp = [...otpCode];
        tmp[index] = parseInt(text);
        setOtpCode(tmp);
        let otp = '';
        tmp.map(item => {
            otp += item;
        });
        setIsEmptyCode(isNaN(otp));
    }

    const onPressResendOTP = () => {
        setOtpCorrect(true);
        // to resend otp
    }

    const onPressConfirm = async () => {
        // code
        let otp = '';
        otpCode.map(item => otp += item);

        try {
            await confirm.confirm(otp);
        } catch (e) {
            console.log(e);
        }

        // navigation.navigate('Home');
    }

    useEffect(() => {
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <BackgroundForm titleShow={true} />
            <View style={{
                position: 'absolute',
                top: height * .35,
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
                    Xác minh OTP
                </Text>
                <Text style={{
                    color: '#FFF',
                    fontSize: 14,
                    marginTop: 8,
                    textAlign: 'center'
                }}>
                    {
                        otpCorrect ?
                            'Nhập mã OTP vừa được gửi về điện thoại của bạn' :
                            'Mã OTP không đúng, vui lòng nhập lại'
                    }
                </Text>

                <View style={{
                    marginVertical: 30,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {
                        otpCode.map((item, index) => {
                            return <TextInput
                                style={[styles.otp, !otpCorrect ? styles.otpError : null]}
                                key={index}
                                placeholder='-'
                                ref={
                                    index == 0 ? otp1 :
                                        index == 1 ? otp2 :
                                            index == 2 ? otp3 :
                                                index == 3 ? otp4 :
                                                    index == 4 ? otp5 : otp6
                                }
                                keyboardType='number-pad'
                                caretHidden={false}
                                maxLength={1}
                                onChangeText={text =>
                                    nextOtp(text,
                                        index == 0 ? otp1 :
                                            index == 1 ? otp2 :
                                                index == 2 ? otp3 :
                                                    index == 3 ? otp4 :
                                                        index == 4 ? otp5 : otp6,
                                        index
                                    )}
                                onKeyPress={({ nativeEvent }) => {
                                    nativeEvent.key === 'Backspace' ? setIsBackspace(true) : setIsBackspace(false)
                                }} />
                        })
                    }
                </View>

                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity
                        activeOpacity={.8}
                        disabled={isEmptyCode}
                        onPress={onPressConfirm}>
                        {
                            !isEmptyCode ?
                                <Image
                                    source={require('../assets/imgs/btn_confirm_active.png')} />
                                :
                                <Image
                                    source={require('../assets/imgs/btn_confirm_disabled.png')} />
                        }
                    </TouchableOpacity>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            color: '#fff',
                            fontSize: 14,
                        }}>
                            {'Bạn chưa nhận được mã?'}
                        </Text>
                        <TouchableOpacity
                            activeOpacity={.5}
                            onPress={onPressResendOTP}>
                            <Text style={{
                                color: Colors.kYellowColor,
                                fontSize: 14,
                                paddingVertical: 10,
                                paddingHorizontal: 5,
                                fontWeight: 'bold'
                            }}>
                                Gửi lại mã
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default OTPScreen

const styles = StyleSheet.create({
    otp: {
        backgroundColor: '#fff',
        width: 50,
        height: 50,
        marginHorizontal: 5,
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },
    otpError: {
        borderColor: 'red',
        borderWidth: 2
    }
})