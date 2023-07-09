import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native'
import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import { Alert, ImageSourcePropType, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TabParamList } from '@/navigations/BottomTabs'
import { RootNativeStackParamList } from '@/navigations/RootNavigation'
import { StackParamList } from '@/navigations/StackNav'
import { SetFormattedDate, SetFormattedTwoDigitNumber } from '@/utils/formattedNum'
import { useRecoilValue } from 'recoil';
import { userStatesAtom } from '@/recoil/atoms/userStatesAtom'
import { foodieRequest } from '@/api/foodieRequest'
import * as S from './FoodieScreen.style'
import theme from '@/common/style/theme'

type FoodieDetailRouteProp = RouteProp<StackParamList, 'FoodieDetailScreen'>

type FoodieDetailProps = {
  route: FoodieDetailRouteProp
}

type GroupNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootNativeStackParamList, 'Stack'>,
  BottomTabNavigationProp<TabParamList>
>

const FoodieDetailScreen: React.FC<FoodieDetailProps> = ({ route }) => {
  const boardData = route.params.board
  const user = useRecoilValue(userStatesAtom);
  const isMyPost = boardData.user.id === user.user.id ? true : false;
  const navigation = useNavigation<GroupNavigationProp>()
  const stackNavigation = useNavigation<NativeStackNavigationProp<StackParamList>>()
  const { deleteFoodie } = foodieRequest

  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      headerTitle: ' ',
      headerTitleContainerStyle: { justifyContent: 'center', alignContent: 'center' },
      headerLeft: () => (
        <Icon name="chevron-left" size={28} onPress={() => navigation.navigate('Tab', { screen: 'Social', params: { tab: 'foodie' } })} />
      ),
    })
  }, [navigation])

  const date = SetFormattedDate(boardData.creadeAt);

  const handleModify = () => {
    stackNavigation.navigate('PostFoodieScreen', { screenType: 'Modify', boardData: boardData });
  }
  const handleDelete = () => {
    Alert.alert(
      '삭제 확인',
      '정말로 삭제하시겠습니까?',
      [
        { text: "취소", style: "cancel" },
        { text: "삭제", style: "destructive", onPress: DeleteFoodie }
      ]
    )
  }

  const DeleteFoodie = async () => {
    const response = await deleteFoodie(boardData.id, user.accessToken);
    console.log(response);
    navigation.navigate('Tab', { screen: 'Social', params: { tab: 'foodie' } });
  }

  return (
    <S.DetailContainer>
      <S.TitleArea>
        <S.TitleText>{boardData.title}</S.TitleText>
        <S.SubTitleText>
          {`${date.year}-${SetFormattedTwoDigitNumber(date.month)}-${SetFormattedTwoDigitNumber(date.day)} ${SetFormattedTwoDigitNumber(date.hour)}:${SetFormattedTwoDigitNumber(date.minute)}:${SetFormattedTwoDigitNumber(date.second)} | ${boardData.user.nickname ? boardData.user.nickname : boardData.user.name}`}
        </S.SubTitleText>
        {isMyPost ? (
          <S.IconBtnArea>
            <Icon name="pencil" size={20} onPress={() => handleModify()} color={theme.colors.primary} />
            <Icon name="delete" size={20} onPress={() => handleDelete()} color={theme.colors.primary} />
          </S.IconBtnArea>
        ) : (null)
        }
      </S.TitleArea>
      <S.BoardDetailArea>
        <S.ContextArea>
          <ScrollView>
            <S.ContextText>{boardData.content}</S.ContextText>
          </ScrollView>
        </S.ContextArea>
      </S.BoardDetailArea>
    </S.DetailContainer>
  );
}

export default FoodieDetailScreen
