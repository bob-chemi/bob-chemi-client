import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native'
import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import { Alert, ImageSourcePropType, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import * as S from './GroupScreen.style'
import theme from '@/common/style/theme'
import { TabParamList } from '@/navigations/BottomTabs'
import { RootNativeStackParamList } from '@/navigations/RootNavigation'
import { StackParamList } from '@/navigations/StackNav'
import { SetFormattedDate, SetFormattedTwoDigitNumber } from '@/utils/formattedNum'
import { useRecoilValue } from 'recoil';
import { userStatesAtom } from '@/recoil/atoms/userStatesAtom'
import { groupRequest } from '@/api/groupRequest'

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
  const user = useRecoilValue(userStatesAtom);
  const isMyPost = groupData.owner?.id === user.user?.id ? true : false;
  const navigation = useNavigation<GroupNavigationProp>()
  const stackNavigation = useNavigation<NativeStackNavigationProp<StackParamList>>()
  const { deleteGroup, joinGroupRequest } = groupRequest

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

  const date = SetFormattedDate(groupData.createdAt);
  const imageSource: ImageSourcePropType = groupData.status == 'PUBLIC' ? require('@assets/images/group_public.png') : require('@assets/images/group_private.png');

  const handleModify = () => {
    stackNavigation.navigate('PostGroupScreen', { screenType: 'Modify', groupData: groupData });
  }
  const handleDelete = () => {
    Alert.alert(
      '삭제 확인',
      '정말로 삭제하시겠습니까?',
      [
        { text: "취소", style: "cancel" },
        { text: "삭제", style: "destructive", onPress: DeleteGroup }
      ]
    )
  }

  const DeleteGroup = async () => {
    const response = await deleteGroup(groupData.groupId);
    console.log(response);
    navigation.navigate('Tab', { screen: 'Social', params: { tab: 'group' } });
  }

  const handleJoin = async () => {
    if (user.user) {
      const response = await joinGroupRequest(user.user?.email, groupData.groupId);
      if (response) {
        Alert.alert(
          '가입 신청',
          '가입이 신청 되었습니다.',
          [
            { text: "확인", style: "default" }
          ]
        )
        navigation.navigate('Tab', { screen: 'Social', params: { tab: 'group' } });
      }
      console.log(response);
    }
  }
  // <S.GroupDetailImage source={imageSource}></S.GroupDetailImage>*/} {/*[TODO] 수정 필요 2023.06.18 by 김주현

  return ( //[TODO] img 추가 필요 2023.06.18 by 김주현
    <S.Container>
      <S.TitleArea>
        <S.TitleText>{groupData.title}</S.TitleText>
        <S.SubTitleText>
          {`${date.year}-${SetFormattedTwoDigitNumber(date.month)}-${SetFormattedTwoDigitNumber(date.day)} ${SetFormattedTwoDigitNumber(date.hour)}:${SetFormattedTwoDigitNumber(date.minute)}:${SetFormattedTwoDigitNumber(date.second)} | ${groupData.owner?.nickname ? groupData.owner?.nickname : groupData.owner?.name}`}
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
          <S.Chip>{`${SetFormattedTwoDigitNumber(groupData.groupHour)}:${SetFormattedTwoDigitNumber(groupData.groupMin)}`}</S.Chip>
        </S.ChipSetArea>
        <S.ContextArea>
          <ScrollView>
            <S.ContextText>{groupData.description}</S.ContextText>
          </ScrollView>
        </S.ContextArea>
        {isMyPost ? (
          <S.BetweenBtnArea>
            <S.BetweenBtn onPress={handleModify}>
              <S.BtnText>수정하기</S.BtnText>
            </S.BetweenBtn>
            <S.BetweenBtn onPress={handleDelete}>
              <S.BtnText>삭제하기</S.BtnText>
            </S.BetweenBtn>
          </S.BetweenBtnArea>
        ) :
          (
            <S.Btn style={{ alignSelf: 'center' }} onPress={handleJoin}>
              <S.BtnText>참여하기</S.BtnText>
            </S.Btn>
          )
        }
      </S.GroupDetailArea>
    </S.Container>
  )
}

export default GroupDetailScreen
