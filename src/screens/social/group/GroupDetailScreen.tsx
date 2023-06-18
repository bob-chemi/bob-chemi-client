import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native'
import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import { ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import * as S from '../group/GroupScreen.style'
import theme from '@/common/style/theme'
import { TabParamList } from '@/navigations/BottomTabs'
import { RootNativeStackParamList } from '@/navigations/RootNavigation'
import { StackParamList } from '@/navigations/StackNav'

type GroupDetailRouteProp = RouteProp<StackParamList, 'GroupDetailScreen'>

type GroupDetailProps = {
  route: GroupDetailRouteProp
}

type GroupNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootNativeStackParamList, 'Stack'>,
  BottomTabNavigationProp<TabParamList>
>

const GroupDetailScreen: React.FC<GroupDetailProps> = ({ route }) => {
  const groupData = route.params.group
  const navigation = useNavigation<GroupNavigationProp>()
  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      headerTitle: ' ',
      headerTitleContainerStyle: { justifyContent: 'center', alignContent: 'center' },
      headerLeft: () => (
        <Icon name="chevron-left" size={28} onPress={() => navigation.navigate('Tab', { screen: 'Social' })} />
      ),
    })
  }, [navigation])

  return (
    <S.Container>
      <S.TitleArea>
        <S.TitleText>{groupData.title}</S.TitleText>
        <S.SubTitleText>
          {groupData.createdAt} {groupData.createid}
        </S.SubTitleText>
      </S.TitleArea>
      <S.GroupDetailArea>
        <S.GroupDetailImage source={groupData.imgsource}></S.GroupDetailImage>
        <S.ChipSetArea>
          <S.Chip>
            <Icon name="account" color={theme.colors.white} size={13}></Icon>
            {`${groupData.people}명`}
          </S.Chip>
          <S.Chip>{groupData.location}</S.Chip>
          <S.Chip>{groupData.time}</S.Chip>
        </S.ChipSetArea>
        <S.ContextArea>
          <ScrollView>
            <S.ContextText>{groupData.context}</S.ContextText>
          </ScrollView>
        </S.ContextArea>
        <S.Btn style={{ alignSelf: 'center' }}>
          <S.BtnText>참여하기</S.BtnText>
        </S.Btn>
      </S.GroupDetailArea>
    </S.Container>
  )
}

export default GroupDetailScreen
