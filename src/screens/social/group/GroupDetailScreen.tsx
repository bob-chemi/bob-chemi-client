import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native'
import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import { ImageSourcePropType, ScrollView } from 'react-native'
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
        <Icon name="chevron-left" size={28} onPress={() => navigation.navigate('Tab', { screen: 'Social', params: { tab: 'group' } })} />
      ),
    })
  }, [navigation])

  const imageSource: ImageSourcePropType = groupData.status == 'PUBLIC' ? require('@assets/images/group_public.png') : require('@assets/images/group_private.png');
  // <S.GroupDetailImage source={imageSource}></S.GroupDetailImage>*/} {/*[TODO] 수정 필요 2023.06.18 by 김주현

  return ( //[TODO] SubTitleText에 user nickname 추가 필요, img 추가 필요 2023.06.18 by 김주현
    <S.Container>
      <S.TitleArea>
        <S.TitleText>{groupData.title}</S.TitleText>
        <S.SubTitleText>
          {groupData.createdAt}
        </S.SubTitleText>
      </S.TitleArea>
      <S.GroupDetailArea>
        <S.GroupDetailImage source={imageSource}></S.GroupDetailImage>
        <S.ChipSetArea>
          <S.Chip>
            <Icon name="account" color={theme.colors.white} size={13}></Icon>
            {`${groupData.groupPeopleLimit}명`}
          </S.Chip>
          <S.Chip>{groupData.groupLocation}</S.Chip>
          <S.Chip>{`${groupData.groupHour}:${groupData.groupMin}`}</S.Chip>
        </S.ChipSetArea>
        <S.ContextArea>
          <ScrollView>
            <S.ContextText>{groupData.description}</S.ContextText>
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
