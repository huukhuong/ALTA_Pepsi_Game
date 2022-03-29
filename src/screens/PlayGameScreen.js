import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    PanResponder,
    Animated
} from 'react-native'
import React, { useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackgroundPlay, Header } from '../components';
import { Colors } from '../ultils';

const PlayGameScreen = ({ navigation, route }) => {

    const playType = route.params.playType;
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;

    const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                pan.setOffset({
                    x: pan.x._value,
                    y: pan.y._value
                });
            },
            onPanResponderMove: (event, gestureState) => {
                const bottom = -60;
                const top = -140;
                const y = pan.y._value;
                if(y < top) {
                    navigation.replace('Congratulation');
                    return;
                }
                if (y > bottom) {
                    pan.setOffset({
                        x: 0,
                        y: bottom
                    });
                }
                Animated.event([
                    null,
                    { dy: pan.y },
                ],
                    { useNativeDriver: false }
                )(event, gestureState);
            },
            onPanResponderRelease: (event, gestureState) => {
                pan.flattenOffset();
            }
        })
    ).current;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <BackgroundPlay />
            <Header
                navigation={navigation}
                title={'VUỐT LÊN ĐỂ CHƠI'}
                isButtonBack
                isButtonLogout />
            <Text style={{
                color: '#fff',
                alignSelf: 'center',
                position: 'absolute',
                top: height * .11
            }}>
                {'Bạn còn '}
                <Text style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: Colors.kYellowColor
                }}>
                    3
                </Text>
                {' lượt chơi '}
                {playType}
            </Text>

            <Animated.View
                style={{
                    transform: [{ translateX: pan.x }, { translateY: pan.y }],
                    position: 'absolute',
                    bottom: -60,
                    right: 0,
                    left: 0,
                    alignItems: 'center'
                }}
                {...panResponder.panHandlers}
            >
                <Image
                    source={require('../assets/imgs/ic_lionFace.png')} />
            </Animated.View>
        </SafeAreaView>
    )
}

export default PlayGameScreen

const styles = StyleSheet.create({})