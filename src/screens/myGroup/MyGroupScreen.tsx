import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import styled from 'styled-components'
import CustomText from '@/common/components/CustomText'
import FlexDirectionWrapper from '@/common/components/FlexDirectionWrapper'
import theme from '@/common/style/theme'
const MyGroupScreen = () => {
  const navigation = useNavigation()
  return (
    <ScrollView style={{ paddingHorizontal: 24 }}>
      {groupList.map(group => (
        <TouchableOpacity key={group.title}>
          <GroupFlexDirectionWrapper flexDirection="column" pt={15}>
            <TitleCustomText fontSize={20} fontWeight={400}>
              {group.title}
            </TitleCustomText>
            <FlexDirectionWrapper justifyContent="space-between" flexDirection="row">
              <FlexDirectionWrapper flexDirection="row">
                <GroupCustomText>{group.title}</GroupCustomText>
                <GroupCustomText>{group.numberPeople}</GroupCustomText>
                <GroupCustomText>{group.time.toLocaleDateString()}</GroupCustomText>
              </FlexDirectionWrapper>
              <FlexDirectionWrapper>
                <Icon name={group.icon} size={20} />
              </FlexDirectionWrapper>
            </FlexDirectionWrapper>
          </GroupFlexDirectionWrapper>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

export default MyGroupScreen

const GroupFlexDirectionWrapper = styled(FlexDirectionWrapper)`
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.gray300};
`
const TitleCustomText = styled(CustomText)`
  margin-bottom: 10px;
`
const GroupCustomText = styled(CustomText)`
  padding: 2px 5px;
  background-color: ${theme.colors.gray200};
  border-radius: 2px;
  margin-bottom: 10px;
`

const groupList = [
  { title: '소모임1', location: '종로', numberPeople: '6명', time: new Date(), icon: 'message1' },
  { title: '소모임2', location: '종로', numberPeople: '6명', time: new Date(), icon: 'message1' },
  { title: '소모임3', location: '종로', numberPeople: '6명', time: new Date(), icon: 'message1' },
]
