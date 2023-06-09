import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import { Dropdown } from '../../auth/register/components/Dropdown'
import TextInputComp from '../../auth/register/components/TextInputComp'
import * as S from './EditProfileScreen.style'
import CustomButton from '@/common/components/CustomButton'
import CustomText from '@/common/components/CustomText'
import FlexDirectionWrapper from '@/common/components/FlexDirectionWrapper'
import { ProfileStackParamList } from '@/navigations/ProfileStackNav'
type ProfieScreenProp = NativeStackScreenProps<ProfileStackParamList, 'EditProfileScreen'>

const EditProfileScreen = ({ navigation }: ProfieScreenProp) => {
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')

  const [age, setAge] = useState({ year: 0, month: 0, day: 0 })

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
            <S.ProfileImage />
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
              labelText="닉네임"
              placeholder="닉네임"
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
