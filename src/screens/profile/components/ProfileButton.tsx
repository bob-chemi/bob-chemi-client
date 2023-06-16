import { CompositeNavigationProp, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import type { ProfileButtonListType } from '../ProfileScreen'
import CustomButton from '@/common/components/CustomButton'
import CustomText from '@/common/components/CustomText'
import FlexDirectionWrapper from '@/common/components/FlexDirectionWrapper'
import theme from '@/common/style/theme'
import { ProfileStackParamList } from '@/navigations/ProfileStackNav'
import { RootNativeStackParamList } from '@/navigations/RootNavigation'
interface ProfileButtonProps {
  buttonProps: ProfileButtonListType
}
type ProfieScreenProp = CompositeNavigationProp<
  NativeStackNavigationProp<ProfileStackParamList, 'ProfileScreen'>,
  NativeStackNavigationProp<RootNativeStackParamList, 'Stack'>
>

const ProfileButton = ({ buttonProps }: ProfileButtonProps) => {
  const navigation = useNavigation<ProfieScreenProp>()
  console.log(navigation)
  return (
    <CustomButton
      variant="gray200"
      fullWidth
      height={80}
      borderRadius={20}
      flexDirection="row"
      justifyContent="space-between"
      mb={10}
      onPress={() =>
        buttonProps.path !== 'Stack'
          ? buttonProps.path && navigation.navigate(buttonProps.path)
          : buttonProps.path && navigation.navigate('Stack')
      }
    >
      <FlexDirectionWrapper alignItems="center" pl={20}>
        <Icon
          name={buttonProps.iconName}
          size={18}
          style={{ backgroundColor: '#fff', borderRadius: 50, padding: 10, marginRight: 10 }}
          color={theme.colors[buttonProps.iconColor]}
        />
        <CustomText variant="gray500" fontWeight={600}>
          {buttonProps.buttonTxt}
        </CustomText>
      </FlexDirectionWrapper>
      <FlexDirectionWrapper pr={20}>
        <Icon name="right" size={20} />
      </FlexDirectionWrapper>
    </CustomButton>
  )
}

export default ProfileButton
