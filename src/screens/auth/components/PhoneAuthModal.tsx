import React from 'react'
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native'
import styled from 'styled-components/native'
import { SCREEN_WIDTH } from '@/utils/getScreenSize'

interface PhoneAuthModalProp {
  modalVisible: boolean
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}
const PhoneAuthModal = ({ modalVisible, setModalVisible }: PhoneAuthModalProp) => {
  return (
    <ModalContainer
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.')
        setModalVisible(!modalVisible)
      }}
    >
      <HeaderContainer>
        <Text style={styles.modalText}>Hello World!</Text>
      </HeaderContainer>
      <CenterModalView>
        <View style={styles.modalView}>
          <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable>
        </View>
      </CenterModalView>
    </ModalContainer>
  )
}

export default PhoneAuthModal

const HeaderContainer = styled.View`
  flex: 1;
  background-color: #725454;
  justify-content: center;
  align-items: center;
`
const ModalContainer = styled.Modal`
  flex: 1;
  background-color: #fff;
  justify-content: center;
  align-items: center;
`
const CenterModalView = styled.View`
  flex: 3;
  justify-content: center;
  align-items: center;
  background-color: #ff5555;
`
const styles = StyleSheet.create({
  centeredView: {
    // flex: 1,
    // width:${SCREEN_WIDTH}
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
    // margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    // padding: 35,
    alignItems: 'center',

    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})
