import { Image, View, StatusBar, Dimensions, Text } from 'react-native';
import React from 'react';

const BackgroundForm = ({ titleShow }) => {

    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;

    return (
        <View
            style={{
                position: 'absolute',
                flex: 1,
                top: 0,
                left: 0,
                bottom: 0,
                right: 0
            }}>
            <StatusBar translucent backgroundColor={'transparent'} />
            <Image
                source={require('../assets/imgs/bg_gradient.png')}
                style={{
                    position: 'absolute',
                    flex: 1,
                    resizeMode: 'cover',
                    zIndex: -10
                }}
            />

            <Image
                source={require('../assets/imgs/ic_topLeft.png')}
                style={{
                    zIndex: -9,
                    position: 'absolute',
                    top: -26,
                    left: -105
                }} />

            <Image
                source={require('../assets/imgs/ic_topRight.png')}
                style={{
                    zIndex: -9,
                    position: 'absolute',
                    top: -52,
                    right: -95
                }} />

            <Image
                source={require('../assets/imgs/flower.png')}
                style={{
                    zIndex: -9,
                    position: 'absolute',
                    top: height * .23,
                    left: -17
                }} />

            <Image
                source={require('../assets/imgs/flower.png')}
                style={{
                    zIndex: -9,
                    position: 'absolute',
                    top: height * .585,
                    right: -20
                }} />

            <Image
                source={require('../assets/imgs/flower.png')}
                style={{
                    zIndex: -9,
                    position: 'absolute',
                    top: height * .66,
                    left: 0
                }} />

            <Image
                source={require('../assets/imgs/ic_bottomLeft.png')}
                style={{
                    zIndex: -9,
                    position: 'absolute',
                    top: height * .82,
                    left: -68,
                }} />

            <Image
                source={require('../assets/imgs/ic_bottomRight.png')}
                style={{
                    zIndex: -9,
                    position: 'absolute',
                    top: height * .78,
                    right: -179,
                }} />

            {titleShow ? <View style={{
                position: 'absolute',
                top: height * .15,
                left: 0,
                right: 0,
                alignItems: 'center',
            }}>
                <Text style={{
                    color: '#fff',
                    fontSize: 18
                }}>
                    Hey, mừng bạn đến với
                </Text>
                <Text style={{
                    color: '#fff',
                    fontSize: 30,
                    fontWeight: 'bold',
                    marginTop: 5
                }}>
                    Pepsi Tết
                </Text>
            </View> : null}
        </View>
    )
}

export default BackgroundForm
