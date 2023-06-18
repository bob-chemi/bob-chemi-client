import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { Alert, SafeAreaView, ScrollView } from 'react-native'
import { ImagePickerResponse, launchCamera, launchImageLibrary, ImageLibraryOptions } from 'react-native-image-picker'
import Icon from 'react-native-vector-icons/Entypo'
import TextInputComp from '../../auth/register/components/TextInputComp'
import * as S from './EditProfileScreen.style'
import CustomButton from '@/common/components/CustomButton'
import CustomText from '@/common/components/CustomText'
import FlexDirectionWrapper from '@/common/components/FlexDirectionWrapper'
import { ProfileStackParamList } from '@/navigations/ProfileStackNav'
import { nickNameValidator, passwordValidator, confirmPwValidator } from '@/utils/validator'

type ProfieScreenProp = NativeStackScreenProps<ProfileStackParamList, 'EditProfileScreen'>

interface ImageData {
  uri: string | undefined
}
const EditProfileScreen = ({ navigation }: ProfieScreenProp) => {
  const [formData, setFormData] = useState({
    nickname: { value: '', error: '' },
    password: { value: '', error: '' },
    confirmPassword: { value: '', error: '' },
  })

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

  const handleSave = () => {
    // onSave(nickname, password, age)
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
              labelText="닉네임"
              placeholder="닉네임"
              onChangeText={() => handleSave}
              validate=""
              fullWidth
            />
          </FlexDirectionWrapper>
          <FlexDirectionWrapper height={100}>
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
            <CustomButton variant="primary" width={170} height={40} borderRadius={10}>
              <CustomText variant="white">저장</CustomText>
            </CustomButton>
          </S.ImageArea>
        </FlexDirectionWrapper>
      </ScrollView>
    </SafeAreaView>
  )
}

export default EditProfileScreen
