import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useState, useEffect } from 'react'
import { Alert, SafeAreaView, ScrollView } from 'react-native'
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
import { nickNameValidator, idValidator } from '@/utils/validator'
const { editUserProfile } = authRequest
type ProfieScreenProp = NativeStackScreenProps<ProfileStackParamList, 'EditProfileScreen'>

interface ImageData {
  uri: string | undefined
}
const EditProfileScreen = ({ navigation }: ProfieScreenProp) => {
  const setUserAtom = useSetRecoilState(userStatesAtom)
  const { user, accessToken } = useRecoilValue(userStatesAtom)

  const [formData, setFormData] = useState({
    name: { value: user?.name || '', error: '' },
    email: { value: user?.email || '', error: '' },
  })
  const [isBtnDisabled, setIsBtnDisabled] = useState(false)
  const { email, name } = formData

  useEffect(() => {})

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
    const { data, status } = await editUserProfile(user?.id as string, userData)

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

          {/* <FlexDirectionWrapper height={100}>
            <TextInputComp
              labelText="비밀번호"
              placeholder="비밀번호"
              onChangeText={() => handleSave}
              validate=""
              fullWidth
            />
          </FlexDirectionWrapper>
          <FlexDirectionWrapper height={100}>
            <TextInputComp
              labelText="비밀번호 확인"
              placeholder="비밀번호 확인"
              onChangeText={() => handleSave}
              validate=""
              fullWidth
            />
          </FlexDirectionWrapper> */}
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
        </FlexDirectionWrapper>
      </ScrollView>
    </SafeAreaView>
  )
}

export default EditProfileScreen
