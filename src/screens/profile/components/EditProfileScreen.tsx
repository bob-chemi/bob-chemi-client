import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { Alert, Modal, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { ImagePickerResponse, launchCamera, launchImageLibrary, ImageLibraryOptions } from 'react-native-image-picker'
import Icon from 'react-native-vector-icons/Entypo'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import TextInputComp from '../../auth/register/components/TextInputComp'
import * as S from './EditProfileScreen.style'
import { authRequest } from '@/api/authRequest'
import CustomButton from '@/common/components/CustomButton'
import CustomText from '@/common/components/CustomText'
import FlexDirectionWrapper from '@/common/components/FlexDirectionWrapper'
import { ProfileStackParamList } from '@/navigations/ProfileStackNav'
import { userStatesAtom } from '@/recoil/atoms/userStatesAtom'
import { nickNameValidator, idValidator, passwordValidator, confirmPwValidator } from '@/utils/validator'
const { editUserProfile } = authRequest

type ProfieScreenProp = NativeStackScreenProps<ProfileStackParamList, 'EditProfileScreen'>

interface ImageData {
  uri: string | undefined
}

const EditProfileScreen = ({ navigation }: ProfieScreenProp) => {
  const [isBtnDisabled, setIsBtnDisabled] = useState(false)
  const [editPwBtnDisalbed, setEditPwDisabled] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const setUserAtom = useSetRecoilState(userStatesAtom)
  const { user, accessToken } = useRecoilValue(userStatesAtom)
  const [formData, setFormData] = useState({
    name: { value: user?.name || '', error: '' },
    email: { value: user?.email || '', error: '' },
    password: { value: '', error: '' },
    confirmPassword: { value: '', error: '' },
  })
  const { email, name, password, confirmPassword } = formData

  /**
   * 프로필 이미지
   */
  const [imageData, setImageData] = useState<ImageData>({ uri: undefined })

  const handleSelectImage = () => {
    const options = {
      title: '이미지 첨부',
      message: '이미지를 가져올 방법을 선택해주세요',
      buttons: [
        {
          text: '앨범에서 가져오기',
          onPress: () => selectFromAlbum(),
          style: 'default' as const,
        },
        {
          text: '사진 찍기',
          onPress: () => selectFromCamera(),
          style: 'default' as const,
        },
        {
          text: '취소',
          style: 'cancel' as const,
        },
      ],
    }
    Alert.alert(options.title, options.message, options.buttons)
  }
  const selectFromCamera = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
    }

    launchCamera(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.errorCode) {
        console.log('ImagePicker Error:', response.errorCode, response.errorMessage)
      } else if (response.assets && response.assets.length > 0) {
        const imageData: ImageData = { uri: response.assets[0].uri }
        setImageData(imageData)
      }
    })
  }
  const selectFromAlbum = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
    }

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.errorCode) {
        console.log('ImagePicker Error:', response.errorCode, response.errorMessage)
      } else if (response.assets && response.assets.length > 0) {
        const imageData: ImageData = { uri: 'data:image/jpeg;base64' + response.assets[0].uri }
        setImageData(imageData)
      }
    })
  }

  /*
   * 유저 정보 수정
   */
  const nameError = nickNameValidator(name.value as string)
  const emailError = idValidator(email.value as string)
  const userProfileFieldEndEditing = () => {
    if (emailError || nameError) {
      setFormData({
        ...formData,
        email: { ...email, error: emailError },
        name: { ...name, error: nameError },
      })
      setIsBtnDisabled(true)
    } else {
      setIsBtnDisabled(false)
    }
  }
  const handleOnChangeText = (inputText: string, field: keyof typeof formData) => {
    setFormData({ ...formData, [field]: { value: inputText, error: '' } })
  }

  const onSaveProfile = async () => {
    const userData = { email: email.value, name: name.value }
    console.log(user)
    const { data, status } = await editUserProfile(user?.id as string, userData)
    console.log(data)
    if (status === 200) {
      setUserAtom({ accessToken, user: data })
      navigation.navigate('ProfileScreen')
    }
  }

  /**
   * 비밀번호 수정
   */
  const passwordError = passwordValidator(password.value)
  const confirmPwError = confirmPwValidator(password.value, confirmPassword.value)

  useEffect(() => {
    if (passwordError || confirmPwError) {
      setFormData({
        ...formData,
        password: { ...password, error: passwordError },
        confirmPassword: { ...confirmPassword, error: confirmPwError },
      })
      setEditPwDisabled(true)
    } else {
      setEditPwDisabled(false)
    }
  }, [confirmPassword.value, password.value])

  const onSaveChangePassword = async () => {
    const userData = { password: password.value }
    const { data, status } = await editUserProfile(user?.id as string, userData)
    console.log(data)
    if (status === 200) {
      setUserAtom({ accessToken, user: data })
      navigation.navigate('ProfileScreen')
    }
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView>
        <FlexDirectionWrapper
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          pl={24}
          pr={24}
          backgroundColor="white"
          flex={1}
          pt={24}
          pb={24}
        >
          <FlexDirectionWrapper alignItems="center">
            <S.ProfileImage>{imageData.uri && <S.Img source={{ uri: imageData.uri }} />}</S.ProfileImage>
            <S.EditIconButton aria-label="사진선택" onPress={() => handleSelectImage()}>
              <Icon name="edit" size={25}></Icon>
            </S.EditIconButton>
          </FlexDirectionWrapper>
          <FlexDirectionWrapper height={100}>
            <TextInputComp
              value={email.value}
              labelText="이메일"
              placeholder="이메일"
              onChangeText={email => handleOnChangeText(email, 'email')}
              onEndEditing={() => userProfileFieldEndEditing()}
              validate={email.error}
              fullWidth
            />
          </FlexDirectionWrapper>
          <FlexDirectionWrapper height={100}>
            <TextInputComp
              value={name.value}
              labelText="이름"
              placeholder="이름"
              onChangeText={name => handleOnChangeText(name, 'name')}
              onEndEditing={() => userProfileFieldEndEditing()}
              validate={name.error}
              fullWidth
            />
          </FlexDirectionWrapper>

          <S.ImageArea>
            <CustomButton
              variant="gray300"
              width={170}
              height={40}
              borderRadius={10}
              onPress={() => navigation.goBack()}
            >
              <CustomText variant="white">취소</CustomText>
            </CustomButton>
            <CustomButton
              variant="primary"
              width={170}
              height={40}
              borderRadius={10}
              disabled={isBtnDisabled}
              onPress={onSaveProfile}
            >
              <CustomText variant="white">저장</CustomText>
            </CustomButton>
          </S.ImageArea>
          <S.ImageArea>
            <CustomButton
              variant="primary"
              fullWidth
              height={40}
              borderRadius={10}
              onPress={() => setModalVisible(true)}
            >
              <CustomText variant="white">비밀번호 수정</CustomText>
            </CustomButton>
          </S.ImageArea>
        </FlexDirectionWrapper>
      </ScrollView>
      <Modal animationType="slide" transparent={true} visible={modalVisible} style={{ flex: 1 }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <CustomText variant="primary">비밀번호 수정</CustomText>
            <View>
              <FlexDirectionWrapper height={100}>
                <TextInputComp
                  value={password.value}
                  secureTextEntry
                  labelText="비밀번호"
                  placeholder="비밀번호"
                  onChangeText={password => handleOnChangeText(password, 'password')}
                  validate={password.error}
                  fullWidth
                />
              </FlexDirectionWrapper>
              <FlexDirectionWrapper height={100}>
                <TextInputComp
                  value={confirmPassword.value}
                  secureTextEntry
                  labelText="비밀번호 확인"
                  placeholder="비밀번호 확인"
                  onChangeText={confirmPw => handleOnChangeText(confirmPw, 'confirmPassword')}
                  validate={confirmPassword.error}
                  fullWidth
                />
              </FlexDirectionWrapper>
            </View>
            <S.ImageArea>
              <CustomButton
                variant="gray300"
                width={170}
                height={40}
                borderRadius={10}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <CustomText variant="white">취소</CustomText>
              </CustomButton>
              <CustomButton
                variant="primary"
                width={170}
                height={40}
                borderRadius={10}
                disabled={editPwBtnDisalbed}
                onPress={onSaveChangePassword}
              >
                <CustomText variant="white">저장</CustomText>
              </CustomButton>
            </S.ImageArea>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

export default EditProfileScreen

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    height: '100%',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
})
