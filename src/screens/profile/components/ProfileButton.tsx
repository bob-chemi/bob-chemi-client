import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import type { ProfileButtonListType } from '../ProfileScreen'
import CustomButton from '@/common/components/CustomButton'
import CustomText from '@/common/components/CustomText'
import FlexDirectionWrapper from '@/common/components/FlexDirectionWrapper'
import theme from '@/common/style/theme'
import { ProfileStackParamList } from '@/navigations/ProfileStackNav'
interface ProfileButtonProps {
  buttonProps: ProfileButtonListType
}
type ProfieScreenProp = NativeStackNavigationProp<ProfileStackParamList, 'ProfileScreen'>

const ProfileButton = ({ buttonProps }: ProfileButtonProps) => {
  const navigation = useNavigation<ProfieScreenProp>()
  return (
    <CustomButton
      variant="gray200"
      fullWidth
      height={80}
      borderRadius={20}
      flexDirection="row"
      justifyContent="space-between"
      mb={10}
      onPress={() => buttonProps.path && navigation.navigate(buttonProps.path)}
    >
      <FlexDirectionWrapper alignItems="center" pl={20}>
        <Icon
          name={buttonProps.iconName}
          size={18}
          style={{ backgroundColor: '#fff', borderRadius: 50, padding: 10, marginRight: 10 }}
          color={theme.colors.primary}
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
