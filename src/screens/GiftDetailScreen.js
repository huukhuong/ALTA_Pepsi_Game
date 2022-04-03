import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Dimensions,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Header } from '../components'
import Colors from '../ultils/Colors'
import Icon from 'react-native-vector-icons/FontAwesome5';
import LabelCoins from '../components/LabelCoins'
import { isRequired } from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedColorPropType'

const GiftDetailScreen = ({ navigation, route }) => {

    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;

    const [myCoins, setMyCoins] = useState(700);

    const listGift = [
        {
            name: 'Pepsi Bucket Hat',
            qty: 600,
            image: require('../assets/imgs/pepsi_hat.png'),
            price: 80
        },
        {
            name: 'Pepsi Jacket',
            qty: 10,
            image: require('../assets/imgs/pepsi_jacket.png'),
            price: 300
        },
        {
            name: 'Pepsi Tote Bag',
            qty: 800,
            image: require('../assets/imgs/pepsi_bag.png'),
            price: 80
        },
        {
            name: 'Pepsi Tumbler',
            qty: 500,
            image: require('../assets/imgs/pepsi_tumbler.png'),
            price: 300
        },
        {
            name: 'Airpod case (Black Pink)',
            qty: 20,
            image: require('../assets/imgs/airpod.png'),
            price: 150
        },
        {
            name: 'Electronic lunch bo',
            qty: 5,
            image: require('../assets/imgs/electronic_lun_bo.png'),
            price: 800
        },
        {
            name: 'Portable Speaker',
            qty: 3,
            image: require('../assets/imgs/portable_speaker.png'),
            price: 1000
        }
    ];
    const [tabType, setTabType] = useState(0);

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
                source={require('../assets/imgs/ic_backgroundExchangeLeft.png')} />

            <Image
                source={require('../assets/imgs/ic_backgroundExchangeRight.png')}
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0
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

    const GiftItem = ({ item }) => {
        const isDisabled = item.price > myCoins;
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                marginHorizontal: 10,
                marginVertical: 10,
            }}>
                <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 1,
                    backgroundColor: isDisabled ? 'rgba(172, 172, 172, .5)' : 'transparent',
                    width: 158,
                    height: 170,
                    borderRadius: 12,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0
                }} />
                <View style={{
                    width: 158,
                }}>
                    <View style={{
                        position: 'absolute',
                        top: 10,
                        right: -4,
                        zIndex: 2000,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Image source={
                            isDisabled ? require('../assets/imgs/gift_item_tag_disabled.png') : require('../assets/imgs/gift_item_tag.png')
                        } />
                        <Text style={{
                            position: 'absolute',
                            paddingTop: 4,
                            paddingStart: 8,
                            fontWeight: 'bold',
                            fontSize: 18,
                            color: '#fff'
                        }}>
                            {item.price}
                        </Text>
                    </View>
                </View>
                <View style={{
                    width: 158,
                    height: 263,
                    borderRadius: 12,
                    backgroundColor: '#fff',
                    overflow: 'hidden',
                }}>

                    <Image
                        source={item.image}
                        style={{
                            width: 158,
                            height: 170,
                            resizeMode: 'contain'
                        }}
                    />

                    <View style={{
                        flex: 1,
                        backgroundColor: isDisabled ? '#ACACAC' : Colors.kRedPepsiColor
                    }}>
                        <Text style={{
                            textAlign: 'center',
                            color: isDisabled ? '#fff' : Colors.kYellowColor,
                            fontWeight: 'bold',
                            fontSize: 14,
                            marginTop: 4
                        }}>
                            {item.name}
                        </Text>
                        <Text style={{
                            textAlign: 'center',
                            color: '#fff',
                            fontSize: 12,
                            marginBottom: 6
                        }}>
                            Còn lại: {item.qty}
                        </Text>

                        <TouchableOpacity
                            disabled={isDisabled}
                            activeOpacity={.6}
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                zIndex: 10
                            }}>
                            <Image
                                source={
                                    isDisabled ? require('../assets/imgs/btn_getExchange_disabled.png') : require('../assets/imgs/btn_getExchange.png')
                                }
                                style={{
                                    width: 108,
                                    height: 32
                                }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Background />
            <StatusBar translucent backgroundColor={'rgba(0,0,0,0)'} />
            <Header
                navigation={navigation}
                title={'Chi tiết quà tặng'}
                isButtonBack
                isButtonLogout />

            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 20,
                marginHorizontal: 50,
                borderRadius: 6,
                overflow: 'hidden'
            }}>
                <TouchableOpacity
                    style={[styles.tabButton, {
                        backgroundColor: tabType === 0 ? Colors.kRedPepsiColor : '#fff'
                    }]}
                    activeOpacity={.9}
                    onPress={() => setTabType(0)}>
                    <Text style={[styles.tabTitle, {
                        color: tabType === 0 ? '#fff' : Colors.kRedPepsiColor
                    }]}>
                        Đổi quà
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tabButton, {
                        backgroundColor: tabType === 1 ? Colors.kRedPepsiColor : '#fff'
                    }]}
                    activeOpacity={.9}
                    onPress={() => setTabType(1)}>
                    <Text style={[styles.tabTitle, {
                        color: tabType === 1 ? '#fff' : Colors.kRedPepsiColor
                    }]}>
                        Quà của tôi
                    </Text>
                </TouchableOpacity>
            </View>

            {tabType == 0 ?
                <FlatList
                    style={{
                        paddingHorizontal: 24,
                    }}
                    data={listGift}
                    numColumns={2}
                    renderItem={({ item }) => <GiftItem item={item} />}
                    keyExtractor={item => item.name}
                    ListHeaderComponent={<LabelCoins coins={myCoins} />}
                />
                :
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 200
                }}>
                    <Image
                        source={require('../assets/imgs/ic_empty_box.png')}
                        style={{
                            width: 148,
                            height: 116
                        }} />
                    <Text style={{
                        color: '#fff',
                        textAlign: 'center',
                        marginTop: 20
                    }}>
                        {'Kho quà còn trống!\n'}
                        {'Hãy dùng coins của bạn để đổi quà'}
                    </Text>
                </View>
            }

        </SafeAreaView>
    )
}

export default GiftDetailScreen

const styles = StyleSheet.create({
    tabButton: {
        flex: 1,
        alignItems: 'center',
        height: 40,
        justifyContent: 'center'
    },
    tabTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    }
})