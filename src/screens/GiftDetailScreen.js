import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput
} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Header } from '../components'
import Colors from '../ultils/Colors'
import LabelCoins from '../components/LabelCoins'
import Icon from 'react-native-vector-icons/FontAwesome5'

const GiftDetailScreen = ({ navigation, route }) => {

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const [tabType, setTabType] = useState(0);

  const [myCoins, setMyCoins] = useState(700);
  const [modalInfomationShow, setModalInfomationShow] = useState(false);
  const [modalSuccessfullyShow, setModalSuccessfullyShow] = useState(false);

  const [giftSelected, setGiftSelected] = useState('');
  const [fullname, setFullname] = useState('Trần Hữu Khương');
  const [phoneNumber, setPhoneNumber] = useState('0786506577');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');

  const [errFullname, setErrFullname] = useState(false);
  const [errPhoneNumber, setErrPhoneNumber] = useState(false);
  const [errAddress, setErrAddress] = useState(false);

  const onPressGetExchange = (item) => {
    setGiftSelected(item);
    setModalInfomationShow(true);
    console.log(item);
  }

  const onPressConfirm = (item) => {
    // Reset error alert
    setErrFullname(false);
    setErrPhoneNumber(false);
    setErrAddress(false);
    // Validate form
    let validForm = true;
    if (fullname == '') {
      setErrFullname(true);
      validForm = false;
    }
    if (phoneNumber == '') {
      setErrPhoneNumber(true);
      validForm = false;
    }
    if (address == '') {
      setErrAddress(true);
      validForm = false;
    }
    if (validForm) {
      setModalInfomationShow(false);
      setModalSuccessfullyShow(true);
    }
  }


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

  const listCollection = [
    {
      name: 'Pepsi Bucket Hat',
      qty: 1,
      image: require('../assets/imgs/pepsi_hat.png'),
      status: true
    },
    {
      name: 'Pepsi Jacket',
      qty: 2,
      image: require('../assets/imgs/pepsi_jacket.png'),
      status: false
    },
    {
      name: 'Pepsi Tote Bag',
      qty: 2,
      image: require('../assets/imgs/pepsi_bag.png'),
      status: true
    },
    {
      name: 'Pepsi Tumbler',
      qty: 3,
      image: require('../assets/imgs/pepsi_tumbler.png'),
      status: false
    }
  ];

  // const listCollection = [];

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
              }}
              onPress={() => onPressGetExchange(item)}>
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

  const MyCollection = ({ item }) => {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 10,
        marginVertical: 10,
      }}>
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
            <Image source={require('../assets/imgs/gift_item_tag.png')} />
            <Text style={{
              position: 'absolute',
              paddingTop: 4,
              paddingStart: 8,
              fontWeight: 'bold',
              fontSize: 18,
              color: '#fff'
            }}>
              {item.qty}
            </Text>
          </View>
        </View>
        <View style={{
          width: 158,
          height: 233,
          borderRadius: 12,
          backgroundColor: '#fff',
          overflow: 'hidden',
        }}>

          <Image
            source={item.image}
            style={{
              width: 158,
              height: 170,
              resizeMode: 'contain',
            }}
          />

          <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Image
              style={{
                position: 'absolute',
                resizeMode: 'stretch',
                height: 60,
                bottom: 0
              }}
              source={require('../assets/imgs/bg_golden_gradient.png')}
            />

            <Text style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 14,
              marginTop: 4,
              color: Colors.kBlue3Color
            }}>
              {item.name}
            </Text>
            <Text style={{
              alignSelf: 'center',
              fontWeight: 'bold',
              color: Colors.kBlue3Color
            }}>
              {'Trạng thái: '}
              <Text style={{
                color: item.status ? Colors.kSuccessColor : Colors.kRedPepsiColor
              }}>
                {item.status ? 'Đã nhận' : 'Chưa nhận'}
              </Text>
            </Text>
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
        listCollection.length != 0 ?
          <FlatList
            style={{
              paddingHorizontal: 24,
            }}
            data={listCollection}
            numColumns={2}
            renderItem={({ item }) => <MyCollection item={item} />}
            keyExtractor={item => item.name}
          /> :
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

      <Modal
        animationType='slide'
        transparent
        statusBarTranslucent
        visible={modalInfomationShow}>

        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          alignItems: 'center',
          justifyContent: 'center'
        }}>

          <View style={{
            width: 335,
            height: 580,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Image
              source={require('../assets/imgs/bg_modalInputInfomation.png')}
              style={{
                position: 'absolute',
                width: 335,
                height: 580
              }} />
            <TouchableOpacity
              activeOpacity={.6}
              style={{
                position: 'absolute',
                top: 8,
                right: 8
              }}
              onPress={() => setModalInfomationShow(false)}>
              <Image
                source={require('../assets/imgs/btn_close_modal.png')}
                style={{
                  width: 24,
                  height: 24,
                }} />
            </TouchableOpacity>

            <View style={{
              flex: 1,
              width: '100%',
              alignItems: 'flex-start',
              paddingHorizontal: 18
            }}>
              <Text style={{
                color: Colors.kBlue3Color,
                fontWeight: 'bold',
                fontSize: 20,
                marginTop: 22,
                alignSelf: 'center'
              }}>
                THÔNG TIN NHẬN QUÀ
              </Text>

              <Text style={{
                color: Colors.kBlue3Color,
                fontWeight: 'bold',
                fontSize: 17,
                marginTop: 18,
                marginBottom: 10
              }}>
                {'Quà của bạn: '}
                <Text style={{
                  color: Colors.kRedPepsiColor
                }}>
                  {giftSelected.name}
                </Text>
              </Text>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>
                  Họ và tên
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <TextInput
                    style={[styles.formInput, errFullname ? styles.errInput : null]}
                    placeholder={'Nhập họ tên người nhận'}
                    value={fullname}
                    onChangeText={text => setFullname(text)} />
                </View>
                <Text style={styles.errAlert}>
                  {
                    errFullname ?
                      'Vui lòng nhập họ tên của bạn'
                      : null
                  }
                </Text>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>
                  Số điện thoại
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <TextInput
                    style={[styles.formInput, errPhoneNumber ? styles.errInput : null]}
                    placeholder={'Nhập số điện thoại'}
                    keyboardType='number-pad'
                    value={phoneNumber}
                    onChangeText={text => setPhoneNumber(text)} />
                </View>
                <Text style={styles.errAlert}>
                  {
                    errPhoneNumber ?
                      'Vui lòng nhập số điện thoại của bạn'
                      : null
                  }
                </Text>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>
                  Địa chỉ
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <TextInput
                    style={[styles.formInput, { textAlignVertical: 'top' }, errAddress ? styles.errInput : null]}
                    numberOfLines={3}
                    multiline
                    placeholder={'Nhập địa chỉ của bạn'}
                    value={address}
                    onChangeText={text => setAddress(text)} />
                </View>
                <Text style={styles.errAlert}>
                  {
                    errAddress ?
                      'Vui lòng nhập địa chỉ của bạn'
                      : ''
                  }
                </Text>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>
                  Ghi chú
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <TextInput
                    style={[styles.formInput, { textAlignVertical: 'top' }]}
                    numberOfLines={3}
                    multiline
                    placeholder={'Nhập ghi chú (nếu có)'}
                    value={description}
                    onChangeText={text => setDescription(text)} />
                </View>
              </View>

              <TouchableOpacity
                activeOpacity={.6}
                style={{
                  alignSelf: 'center',
                  marginTop: 35
                }}
                onPress={() => onPressConfirm(giftSelected)}>
                <Image
                  source={require('../assets/imgs/btn_confirm_size_s.png')}
                  style={{
                    width: 122,
                    height: 36
                  }} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        statusBarTranslucent
        transparent
        animationType='slide'
        visible={modalSuccessfullyShow}>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
          backgroundColor: 'rgba(0,0,0,.5)',
        }}>
          <Image source={require('../assets/imgs/popup_successfully.png')}
            style={{
              width: 280,
              height: 107,
              alignSelf: 'center',
              marginTop: 50
            }} />
          <TouchableOpacity
            activeOpacity={.6}
            onPress={() => setModalSuccessfullyShow(false)}>
            <View style={{
              marginTop: 50,
              alignSelf: 'center',
              marginEnd: 3,
              backgroundColor: 'rgba(255,255,255,.3)',
              width: 24,
              height: 24,
              borderRadius: 24,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: '#fff'
            }}>
              <Icon name='times' size={14} color='#ffffff' />
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView >
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
  },
  formGroup: {
    // marginVertical: 2
  },
  formLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.kBlue3Color,
    marginBottom: 4
  },
  formInput: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderColor: '#fff',
    borderWidth: 1.5
  },
  errInput: {
    borderColor: Colors.kRedPepsiColor
  },
  errAlert: {
    color: Colors.kRedPepsiColor,
    marginStart: 4,
    marginTop: 2
  }
})