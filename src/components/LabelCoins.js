import { Text, View, Image } from 'react-native'
import React from 'react'

const LabelCoins = ({ coins }) => {
    return (
        <View style={{
            alignItems: 'center'
        }}>
            <Image
                source={require('../assets/imgs/lbl_coinsBackground.png')}
                style={{
                    width: 100,
                    height: 100
                }} />
            <View style={{
                justifyContent: 'center',
                height: 100,
                position: 'absolute',
            }}>
                <Text style={{
                    color: '#fff',
                    fontSize: 28,
                    fontWeight: 'bold',
                    textAlign: 'center'
                }}>
                    {coins}
                </Text>
            </View>
            <Image
                source={require('../assets/imgs/lbl_coinsCollection.png')}
                style={{
                    marginTop: 12
                }} />
        </View>
    )
}

export default LabelCoins