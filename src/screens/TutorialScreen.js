import {
    StyleSheet,
    View,
    StatusBar,
    Image,
    Dimensions,
    ScrollView,
    Text
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackgroundForm, Header } from '../components';
import { useEffect, useState } from 'react/cjs/react.development';
import firestore from '@react-native-firebase/firestore';

const TutorialScreen = ({ navigation, route }) => {

    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;

    const [content, setContent] = useState(['Đang tải dữ liệu']);

    useEffect(() => {
        firestore()
            .collection('Host')
            .doc('Rules')
            .get()
            .then(data => {
                setContent(data._data.rules);
            })
            .catch(e => console.log(e))
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <BackgroundForm titleShow={false} />
            <SafeAreaView style={{ flex: 1 }}>
                <Header
                    title={'Hướng dẫn'}
                    isButtonBack
                    isButtonLogout
                    navigation={navigation}
                    route={route} />
                <ScrollView style={{ flex: 1, paddingHorizontal: 34, marginTop: 32 }}>
                    <Image style={styles.image} source={require('../assets/imgs/lon1.png')} />
                    <Text style={styles.content}>
                        <Text style={styles.contentTitle}>Bước 1: </Text>
                        <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius in pulvinar feugiat rutrum libero volutpat.</Text>
                    </Text>

                    <Image style={styles.image} source={require('../assets/imgs/lon2.png')} />
                    <Text style={styles.content}>
                        <Text style={styles.contentTitle}>Bước 2: </Text>
                        <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius in pulvinar feugiat rutrum libero volutpat.</Text>
                    </Text>

                    <Image style={styles.image} source={require('../assets/imgs/lon3.png')} />
                    <Text style={styles.content}>
                        <Text style={styles.contentTitle}>Bước 3: </Text>
                        <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius in pulvinar feugiat rutrum libero volutpat.</Text>
                    </Text>
                </ScrollView>
            </SafeAreaView>

        </View>
    )
}

export default TutorialScreen

const styles = StyleSheet.create({
    content: {
        textAlign: 'center',
        color: '#FFF',
        paddingVertical: 10,
        fontSize: 17
    },
    contentTitle: {
        fontWeight: 'bold'
    },
    image: {
        marginTop: 10,
        borderRadius: 10,
        width: Dimensions.get('window').width * .8,
        resizeMode: 'cover',
        alignSelf: 'center'
    }
})